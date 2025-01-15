// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs, toBase64 } from '@mysten/bcs';
import type { BcsType, InferBcsType } from '@mysten/bcs';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { getFaucetHost, requestSuiFromFaucetV0 } from '@mysten/sui/faucet';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { coinWithBalance, Transaction } from '@mysten/sui/transactions';
import { MIST_PER_SUI } from '@mysten/sui/utils';
import { BlobEncoder } from '@mysten/walrus-wasm';

import { client } from './client/index.js';
import { StakingPool } from './contracts/walrus/staking_pool.js';
import { SystemStateInnerV1 } from './contracts/walrus/system_state_inner.js';
import { init, System } from './contracts/walrus/system.js';
import { BlobMetadataV1 } from './utils/bcs.js';
import { storageUnitsFromSize } from './utils/index.js';

const walrusPackageId = '0x9f992cc2430a1f442ca7a5ca7638169f5d5c00e0ebc3977a65e9ac6e497fe5ef';
const systemContract = init({
	walrus: walrusPackageId,
	wal: walrusPackageId,
});

const exchangeId = '0x0e60a946a527902c90bbc71240435728cd6dc26b9e8debc69f09b71671c3029b';
const systemObjectId = '0x50b84b68eb9da4c6d904a929f43638481c09c03be6274b8569778fe085c1590d';

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
	const systemObject = await loadObject(systemObjectId, System());
	const systemState = await loadFieldObject(
		systemObjectId,
		{
			type: 'u64',
			value: systemObject.version,
		},
		SystemStateInnerV1(),
	);

	const tx = new Transaction();
	const file = new TextEncoder().encode('Hello, world!');

	const blobEncoder = new BlobEncoder(systemState.committee.n_shards);
	const [_encoded, metadata, rootHash, metadataBytes] = blobEncoder.encode_with_metadata(file) as [
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

	console.log(toBase64(new Uint8Array(blobMetadata)) === toBase64(new Uint8Array(metadataBytes)));

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

	const nodes = await loadObjects(
		systemState.committee.members.map((member) => member.node_id),
		StakingPool(),
	);

	const nodeAddresses = nodes.map((node) => node.node_info.network_address);

	const blobId = bcs
		.u256()
		.serialize(bcs.u256().parse(new Uint8Array(metadata.blob_id)))
		.toBase64()
		.replace(/=*$/, '')
		.replaceAll('+', '-')
		.replaceAll('/', '_');

	for (const address of nodeAddresses) {
		const res = await fetch(`https://${address}/v1/blobs/${blobId}/metadata`, {
			body: new Blob([new Uint8Array(metadataBytes)]),
			method: 'PUT',
			headers: {
				'Content-Type': 'application/octet-stream',
			},
		});

		console.log(res.status, await res.text());
	}

	// console.log(encoded);

	// const file = new TextEncoder().encode('Hello, world!');

	// console.dir(metadata, { depth: null });

	// const res = await healthInfo({});

	// console.log(res.data?.success);
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
	// const objectResponse = await suiClient.getOwnedObjects({
	// 	owner,
	// 	filter: {
	// 		StructType: `${walrusPackageId}::walrus::Storage`,
	// 	},
	// 	options: {
	// 		showBcs: true,
	// 	},
	// });

	// const existingStorage = objectResponse.data
	// 	.map((obj) => {
	// 		if (obj.data?.bcs?.dataType !== 'moveObject') {
	// 			throw new Error('expected object');
	// 		}

	// 		return Storage().fromBase64(obj.data.bcs.bcsBytes);
	// 	})
	// 	.filter((storage) => storage.end_epoch === endEpoch && storage.start_epoch <= startEpoch);

	if (startEpoch >= endEpoch) {
		throw new Error('start epoch must be less than end epoch');
	}

	return (tx: Transaction) => {
		// const combined = existingStorage.length > 0 ? existingStorage[0] : null;
		// const combinedRef = combined ? tx.object(combined.id.id) : null;

		// if (combinedRef) {
		// 	let sizeSum = BigInt(combined!.storage_size);
		// 	for (let i = 1; i < existingStorage.length && sizeSum < BigInt(encodedSize); i++) {
		// 		sizeSum += BigInt(existingStorage[i].storage_size);

		// 		const existingRef = tx.object(existingStorage[i].id.id);

		// 		const ref =
		// 			existingStorage[i].start_epoch === startEpoch
		// 				? existingRef
		// 				: tx.add(
		// 						storageContract.split_by_epoch({
		// 							arguments: [existingRef, startEpoch],
		// 						}),
		// 					);

		// 		if (sizeSum < BigInt(encodedSize)) {
		// 			tx.add(
		// 				storageContract.fuse_amount({
		// 					arguments: [combinedRef, ref],
		// 				}),
		// 			);
		// 		}
		// 	}

		// 	if (sizeSum < BigInt(encodedSize)) {
		// 		tx.add(
		// 			storageContract.fuse_amount({
		// 				arguments: [
		// 					combinedRef,
		// 					systemContract.reserve_space({
		// 						arguments: [
		// 							systemObject.id.id,
		// 							BigInt(encodedSize) - sizeSum,
		// 							endEpoch - startEpoch,
		// 							coinWithBalance({
		// 								balance:
		// 									BigInt(storageUnitsFromSize(encodedSize - Number(sizeSum))) *
		// 									BigInt(systemState.storage_price_per_unit_size),
		// 								type: `${walrusPackageId}::wal::WAL`,
		// 							}),
		// 						],
		// 					}),
		// 				],
		// 			}),
		// 		);
		// 	}

		// 	return combinedRef;
		// }

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
