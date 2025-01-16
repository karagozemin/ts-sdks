// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs, fromBase64 } from '@mysten/bcs';
import type { BcsType, InferBcsType } from '@mysten/bcs';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { getFaucetHost, requestSuiFromFaucetV0 } from '@mysten/sui/faucet';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { coinWithBalance, Transaction } from '@mysten/sui/transactions';
import { MIST_PER_SUI } from '@mysten/sui/utils';
import { BlobEncoder, from_signed_messages_and_indices, MessageType } from '@mysten/walrus-wasm';

import { client } from './client/index.js';
import { StakingInnerV1 } from './contracts/walrus/staking_inner.js';
import { StakingPool } from './contracts/walrus/staking_pool.js';
import { Staking } from './contracts/walrus/staking.js';
import { SystemStateInnerV1 } from './contracts/walrus/system_state_inner.js';
import { init, System } from './contracts/walrus/system.js';
import { BlobMetadataV1, SliverData } from './utils/bcs.js';
import { storageUnitsFromSize, toShardIndex } from './utils/index.js';

const walrusPackageId = '0x9f992cc2430a1f442ca7a5ca7638169f5d5c00e0ebc3977a65e9ac6e497fe5ef';
const systemContract = init({
	walrus: walrusPackageId,
	wal: walrusPackageId,
});

const exchangeId = '0x0e60a946a527902c90bbc71240435728cd6dc26b9e8debc69f09b71671c3029b';
const systemObjectId = '0x50b84b68eb9da4c6d904a929f43638481c09c03be6274b8569778fe085c1590d';
const stakingPoolId = '0x37c0e4d7b36a2f64d51bba262a1791f844cfd88f31379f1b7c04244061d43914';

type EncodedFile = {
	primary: {
		symbols: {
			data: number[];
			symbol_size: number;
		};
		index: number;
	};
	secondary: {
		symbols: {
			data: number[];
			symbol_size: number;
		};
		index: number;
	};
}[];

type EncodedMetadata = {
	blob_id: number[];
	metadata: {
		encoding_type: string;
		unencoded_length: 13;
		hashes: {
			primary_hash: {
				Digest: number[];
			};
			secondary_hash: {
				Digest: number[];
			};
		}[];
	};
};

client.setConfig({
	baseUrl: 'https://mia-tnt-sto-00.walrus-testnet.walrus.space:9185',
});
const suiClient = new SuiClient({
	url: getFullnodeUrl('testnet'),
});

async function uploadFile() {
	const keypair = await getFundedKeypair();
	const fetcher = new Fetcher(30);
	const systemObject = await loadObject(systemObjectId, System());
	const systemState = await loadFieldObject(
		systemObjectId,
		{
			type: 'u64',
			value: systemObject.version,
		},
		SystemStateInnerV1(),
	);

	const stakingObject = await loadObject(stakingPoolId, Staking());
	const stakingState = await loadFieldObject(
		stakingObject.id.id,
		{
			type: 'u64',
			value: systemObject.version,
		},
		StakingInnerV1(),
	);

	const tx = new Transaction();
	const file = new TextEncoder().encode('Hello from the TS SDK!!!\n');

	const blobEncoder = new BlobEncoder(systemState.committee.n_shards);
	const [encoded, metadata, rootHash] = blobEncoder.encode_with_metadata(file) as [
		EncodedFile,
		EncodedMetadata,
		{ Digest: number[] },
		number[],
	];

	const blobMetadata = BlobMetadataV1.serialize({
		encoding_type: {
			RedStuff: null,
		},
		unencoded_length: file.length,
		hashes: metadata.metadata.hashes,
	}).toBytes();

	const writeCoin = tx.add(
		coinWithBalance({
			balance:
				BigInt(storageUnitsFromSize(blobEncoder.encoded_length(BigInt(file.length)))) *
				BigInt(systemState.write_price_per_unit_size),
			type: `${walrusPackageId}::wal::WAL`,
		}),
	);

	tx.transferObjects(
		[
			systemContract.register_blob({
				arguments: [
					tx.object(systemObjectId),
					await storageWithSize({
						size: file.length,
						owner: keypair.toSuiAddress(),
						endEpoch: systemState.committee.epoch + 3,
					}),
					BigInt(bcs.u256().parse(new Uint8Array(metadata.blob_id))),
					BigInt(bcs.u256().parse(new Uint8Array(rootHash.Digest))),
					file.length,
					0,
					true,
					writeCoin,
				],
			}),
		],
		keypair.toSuiAddress(),
	);

	tx.moveCall({
		target: '0x2::coin::destroy_zero',
		typeArguments: [`${walrusPackageId}::wal::WAL`],
		arguments: [writeCoin],
	});

	tx.setSender(keypair.toSuiAddress());

	const { digest } = await suiClient.signAndExecuteTransaction({
		transaction: tx,
		signer: keypair,
	});

	const { effects } = await suiClient.waitForTransaction({
		digest,
		options: {
			showEffects: true,
		},
	});

	if (effects?.status.status !== 'success') {
		console.dir(effects, { depth: null });
		throw new Error('Failed to register blob');
	}

	const createdObjectIds = effects?.created?.map((effect) => effect.reference.objectId) ?? [];

	const createdObjects = await suiClient.multiGetObjects({
		ids: createdObjectIds,
		options: {
			showType: true,
		},
	});

	const suiBlobObject = createdObjects.find((object) => object.data?.type?.endsWith('Blob'));

	const nodes = await loadObjects(
		systemState.committee.members.map((member) => member.node_id),
		StakingPool(),
	);

	const blobId = bcs
		.u256()
		.serialize(bcs.u256().parse(new Uint8Array(metadata.blob_id)))
		.toBase64()
		.replace(/=*$/, '')
		.replaceAll('+', '-')
		.replaceAll('/', '_');

	const shardsByNode = new Map<string, number[]>();
	const nodeByShard = new Map<number, string>();

	for (const shard of stakingState.committee.pos0.contents) {
		if (!shardsByNode.has(shard.key)) {
			shardsByNode.set(shard.key, []);
		}

		shardsByNode.get(shard.key)!.push(...shard.value);

		shard.value.forEach((shardIndex) => {
			nodeByShard.set(shardIndex, shard.key);
		});
	}

	const sliversByNode = new Map<
		string,
		{
			primary: (typeof SliverData.$inferInput)[];
			secondary: (typeof SliverData.$inferInput)[];
		}
	>();

	for (const sliver of encoded) {
		const primaryShardIndex = toShardIndex(
			sliver.primary.index,
			new Uint8Array(metadata.blob_id),
			systemState.committee.n_shards,
		);
		const secondaryShardIndex = toShardIndex(
			sliver.secondary.index,
			new Uint8Array(metadata.blob_id),
			systemState.committee.n_shards,
		);

		if (!sliversByNode.has(nodeByShard.get(primaryShardIndex)!)) {
			sliversByNode.set(nodeByShard.get(primaryShardIndex)!, {
				primary: [],
				secondary: [],
			});
		}

		if (!sliversByNode.has(nodeByShard.get(secondaryShardIndex)!)) {
			sliversByNode.set(nodeByShard.get(secondaryShardIndex)!, {
				primary: [],
				secondary: [],
			});
		}

		sliversByNode.get(nodeByShard.get(primaryShardIndex)!)!.primary.push(sliver.primary);
		sliversByNode.get(nodeByShard.get(secondaryShardIndex)!)!.secondary.push(sliver.secondary);
	}

	for (const node of nodes) {
		fetcher
			.fetch(`https://${node.node_info.network_address}/v1/blobs/${blobId}/metadata`, {
				body: new Uint8Array(blobMetadata),
				method: 'PUT',
				headers: {
					'Content-Type': 'application/octet-stream',
				},
			})
			.then(async (res) => {
				console.log(res.status, await res.text());
			})
			.catch((err) => {
				console.error(err);
			});
	}

	await fetcher.awaitAll();

	for (const node of nodes) {
		const { primary, secondary } = sliversByNode.get(node.id.id)!;

		for (const sliver of primary) {
			fetcher
				.fetch(
					`https://${node.node_info.network_address}/v1/blobs/${blobId}/slivers/${sliver.index}/primary`,
					{
						body: SliverData.serialize(sliver).toBytes(),
						method: 'PUT',
						headers: {
							'Content-Type': 'application/octet-stream',
						},
					},
				)
				.then(async (res) => {
					console.log(res.status, await res.text());
				})
				.catch((err) => {
					console.error(err);
				});
		}

		for (const sliver of secondary) {
			fetcher
				.fetch(
					`https://${node.node_info.network_address}/v1/blobs/${blobId}/slivers/${sliver.index}/secondary`,
					{
						body: SliverData.serialize(sliver).toBytes(),
						method: 'PUT',
						headers: {
							'Content-Type': 'application/octet-stream',
						},
					},
				)
				.then(async (res) => {
					console.log(res.status, await res.text());
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}

	console.log('waiting for fetcher to finish');
	await fetcher.awaitAll();

	await console.log('fetcher finished');

	const confirmations = (
		await Promise.all(
			nodes.map(
				async (
					node,
					i,
				): Promise<
					| [
							{
								serializedMessage: string;
								signature: string;
							},
							number,
					  ]
					| null
				> => {
					try {
						const res = await fetcher.fetch(
							`https://${node.node_info.network_address}/v1/blobs/${blobId}/confirmation`,
							{
								method: 'GET',
							},
						);

						const json = (await res.json()) as {
							success: {
								data: {
									signed: {
										serializedMessage: string;
										signature: string;
									};
								};
							};
						};

						return [json.success.data.signed, i];
					} catch (err) {
						console.error(err);
						return null;
					}
				},
			),
		)
	).filter((n) => n !== null);

	const combinedSignatures = from_signed_messages_and_indices(
		MessageType.Confirmation,
		confirmations.map(([confirmation]) => confirmation),
		new Uint16Array(confirmations.map(([_, index]) => index)),
	) as {
		signers: number[];
		serialized_message: number[];
		signature: string;
	};

	console.log(combinedSignatures);

	const certifyTx = new Transaction();

	certifyTx.add(
		systemContract.certify_blob({
			arguments: [
				certifyTx.object(systemObjectId),
				certifyTx.object(suiBlobObject?.data?.objectId!),
				certifyTx.pure.vector('u8', fromBase64(combinedSignatures.signature)),
				certifyTx.pure.vector('u16', [
					// TODO: this changed to a bitmap in the walrus repo
					// ...signersToBitmap(combinedSignatures.signers, systemState.committee.members.length),
					...combinedSignatures.signers,
				]),
				certifyTx.pure.vector('u8', combinedSignatures.serialized_message),
			],
		}),
	);

	const { digest: certifyDigest } = await suiClient.signAndExecuteTransaction({
		transaction: certifyTx,
		signer: keypair,
	});

	const { effects: certifyEffects } = await suiClient.waitForTransaction({
		digest: certifyDigest,
		options: {
			showEffects: true,
		},
	});

	console.dir(certifyEffects, { depth: null });

	console.log(blobId);
}

uploadFile();

async function loadObject<T extends BcsType<any>>(id: string, type: T): Promise<InferBcsType<T>> {
	const objectResponse = await suiClient.getObject({
		id,
		options: {
			showBcs: true,
		},
	});

	if (objectResponse.data?.bcs?.dataType !== 'moveObject') {
		throw new Error('expected object');
	}

	return type.fromBase64(objectResponse.data?.bcs?.bcsBytes);
}

export async function loadFieldObject<T extends BcsType<any>>(
	parent: string,
	name: {
		type: string;
		value: unknown;
	},
	type: T,
): Promise<InferBcsType<T>> {
	const objectResponse = await suiClient.getDynamicFieldObject({
		parentId: parent,
		name,
	});

	return loadObject(objectResponse.data?.objectId!, type);
}

async function loadObjects<T extends BcsType<any>>(
	ids: string[],
	type: T,
): Promise<InferBcsType<T>[]> {
	const objects = await suiClient.multiGetObjects({
		ids,
		options: {
			showBcs: true,
		},
	});

	return objects.map((object) => {
		if (object.data?.bcs?.dataType !== 'moveObject') {
			throw new Error('expected object');
		}

		return type.fromBase64(object.data?.bcs?.bcsBytes);
	});
}

async function getFundedKeypair() {
	const keypair = Ed25519Keypair.fromSecretKey(
		'suiprivkey1qzmcxscyglnl9hnq82crqsuns0q33frkseks5jw0fye3tuh83l7e6ajfhxx',
	);
	console.log(keypair.toSuiAddress());

	const balance = await suiClient.getBalance({
		owner: keypair.toSuiAddress(),
	});

	if (BigInt(balance.totalBalance) < MIST_PER_SUI) {
		await requestSuiFromFaucetV0({
			host: getFaucetHost('testnet'),
			recipient: keypair.toSuiAddress(),
		});
	}

	const walBalance = await suiClient.getBalance({
		owner: keypair.toSuiAddress(),
		coinType: `${walrusPackageId}::wal::WAL`,
	});
	console.log('wal balance:', walBalance.totalBalance);

	if (Number(walBalance.totalBalance) < Number(MIST_PER_SUI) / 2) {
		const tx = new Transaction();

		const wal = tx.moveCall({
			package: walrusPackageId,
			module: 'wal_exchange',
			function: 'exchange_all_for_wal',
			arguments: [
				tx.object(exchangeId),
				coinWithBalance({
					balance: MIST_PER_SUI / 2n,
				}),
			],
		});

		tx.transferObjects([wal], keypair.toSuiAddress());

		const { digest } = await suiClient.signAndExecuteTransaction({
			transaction: tx,
			signer: keypair,
		});

		await suiClient.waitForTransaction({
			digest,
			options: {
				showEvents: true,
			},
		});
	}

	return keypair;
}

async function storageWithSize({
	size,
	owner,
	endEpoch,
}: {
	size: number;
	owner: string;

	endEpoch: number;
}) {
	const systemObject = await loadObject(systemObjectId, System());
	const systemState = await loadFieldObject(
		systemObjectId,
		{
			type: 'u64',
			value: systemObject.version,
		},
		SystemStateInnerV1(),
	);
	const encodedSize = new BlobEncoder(systemState.committee.n_shards).encoded_length(BigInt(size));
	const startEpoch = systemState.committee.epoch;
	const numEpochs = endEpoch - startEpoch;

	if (startEpoch >= endEpoch) {
		throw new Error('start epoch must be less than end epoch');
	}

	return (tx: Transaction) => {
		const coin = tx.add(
			coinWithBalance({
				balance:
					BigInt(storageUnitsFromSize(encodedSize)) *
					BigInt(systemState.storage_price_per_unit_size) *
					BigInt(numEpochs),
				type: `${walrusPackageId}::wal::WAL`,
			}),
		);

		const storage = tx.add(
			systemContract.reserve_space({
				arguments: [systemObject.id.id, encodedSize, endEpoch - startEpoch, coin],
			}),
		);
		tx.moveCall({
			target: '0x2::coin::destroy_zero',
			typeArguments: [`${walrusPackageId}::wal::WAL`],
			arguments: [coin],
		});

		return storage;
	};
}

interface FetcherTask {
	run: () => Promise<Response>;
	promise: PromiseWithResolvers<Response>;
}

class Fetcher {
	maxConcurrency: number;
	concurrency = 0;
	queue: FetcherTask[] = [];
	onEmpty: (() => void)[] = [];

	constructor(maxConcurrency: number) {
		this.maxConcurrency = maxConcurrency;
	}

	#enqueue(task: FetcherTask) {
		this.queue.push(task);
		if (this.concurrency < this.maxConcurrency) {
			this.#runNext();
		}
	}

	#runNext() {
		const task = this.queue.shift();
		if (task) {
			this.concurrency++;
			task
				.run()
				.then(task.promise.resolve, task.promise.reject)
				.finally(() => {
					this.concurrency--;
					this.#runNext();
				});
		} else if (this.concurrency === 0) {
			this.onEmpty.forEach((fn) => fn());
		}
	}

	async fetch(url: string, options: RequestInit) {
		const promise = Promise.withResolvers<Response>();

		this.#enqueue({
			run: async () => fetch(url, options),
			promise,
		});

		return promise.promise;
	}

	async awaitAll() {
		if (this.concurrency > 0) {
			const promise = Promise.withResolvers<void>();
			this.onEmpty.push(() => promise.resolve());
			await promise.promise;
		}
	}
}
