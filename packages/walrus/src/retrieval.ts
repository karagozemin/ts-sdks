// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// import { createClient } from '@hey-api/client-fetch';
import { createClient } from '@hey-api/client-fetch';
import { bcs } from '@mysten/bcs';
import type { BcsType, InferBcsType } from '@mysten/bcs';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { normalizeSuiAddress } from '@mysten/sui/utils';
import { BlobEncoder } from '@mysten/walrus-wasm';

// import { Transaction } from '@mysten/sui/dist/cjs/transactions/Transaction.js';

import { client, getMetadata, getSliver } from './client/index.js';
import type { BlsCommittee } from './contracts/walrus/bls_aggregate.js';
import type { Committee } from './contracts/walrus/committee.js';
import { init } from './contracts/walrus/redstuff.js';
// import { Committee, init } from './contracts/walrus/committee.js';
import { StakingInnerV1 } from './contracts/walrus/staking_inner.js';
import { StakingPool } from './contracts/walrus/staking_pool.js';
import { Staking } from './contracts/walrus/staking.js';
import { SystemStateInnerV1 } from './contracts/walrus/system_state_inner.js';
import { System } from './contracts/walrus/system.js';

// import { StakingInnerV1 } from './contracts/walrus/staking_inner.js';
// import { StakingPool } from './contracts/walrus/staking_pool.js';

// import { Staking } from './contracts/walrus/staking.js';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

client.setConfig({
	baseUrl: 'https://sn01.walrus.testnet.republiccrypto-runtime.com:9185',
});

const stakingObjectId = '0x37c0e4d7b36a2f64d51bba262a1791f844cfd88f31379f1b7c04244061d43914';
const systemObjectId = '0x50b84b68eb9da4c6d904a929f43638481c09c03be6274b8569778fe085c1590d';

const redStuffContract = init({
	walrus: '0x9f992cc2430a1f442ca7a5ca7638169f5d5c00e0ebc3977a65e9ac6e497fe5ef',
});

const suiClient = new SuiClient({
	url: getFullnodeUrl('testnet'),
});

const Node = bcs.enum('Node', {
	Empty: null,
	Digest: bcs.bytes(32),
});

const SliverPairMetadata = bcs.struct('SliverPairMetadata', {
	primary_hash: Node,
	secondary_hash: Node,
});

const EncodingType = bcs.enum('EncodingType', {
	RedStuff: null,
});

export const BlobMetadataV1 = bcs.struct('BlobMetadataV1', {
	encoding_type: EncodingType,
	unencoded_length: bcs.u64(),
	hashes: bcs.vector(SliverPairMetadata),
});

// export const BlobMetadata = bcs.enum('BlobMetadata', {
// 	V1: BlobMetadataV1,
// });

const BlobMetadataWithId = bcs.struct('BlobMetadataWithId<true>', {
	blob_id: bcs.bytes(32),
	// metadata: BlobMetadata,
	metadata: BlobMetadataV1,
});

const Symbols = bcs.struct('Symbols', {
	data: bcs.vector(bcs.u8()),
	symbol_size: bcs.u16(),
});

export const SliverData = bcs.struct('SliverData<T>', {
	symbols: Symbols,
	index: bcs.u16(),
	_sliver_type: bcs.option(bcs.bool()),
});

export const Sliver = bcs.enum('Sliver', {
	Primary: SliverData,
	Secondary: SliverData,
});

client.setConfig({
	baseUrl: 'https://sn01.walrus.testnet.republiccrypto-runtime.com:9185/',
});

async function getBlobMetadata(blobId: string) {
	const blobMetadata = await getMetadata({
		client,
		path: { blob_id: blobId },
	});

	if (blobMetadata.error) return null;

	const arrayBuffer = await blobMetadata.data.arrayBuffer();
	const bcsBytes = new Uint8Array(arrayBuffer);

	return BlobMetadataWithId.parse(bcsBytes);
}

// todo: optimize async control flow
export async function retrieveBlob(blobId: string) {
	// const certifiedEpoch = await getCertifiedEpoch(blobId, stakingState);
	// if (!certifiedEpoch) {
	// 	// blob not found or client behind
	// 	return null;
	// }

	// const readCommittee = getReadCommittee(certifiedEpoch, stakingState);
	// const storageNodeClients = await getStorageNodeClients(readCommittee);

	// Do we need to verify this or is it already verified?
	// VerifiedBlobMetadataWithId::new_verified_unchecked
	const blobMetadata = await getBlobMetadata(blobId);
	if (!blobMetadata) {
		console.log('wut');
		return null;
	}

	const systemState = await getSystemState();
	const stakingState = await getStakingState();

	const numShards = systemState.committee.n_shards;
	const storageNodes = await getStorageNodes(systemState.committee);
	const shardIndicesByNodeId = getShardIndicesByNodeId(stakingState.committee);

	const primarySourceSymbols = await getPrimarySourceSymbols(numShards);

	// calculate this using the unencoded_length and primary source symbols + other data
	// wasm bindings? re-implement?
	const concurrencyLimit = 100;

	const taskPool = new TaskPool<Awaited<ReturnType<typeof getSliver>>>(concurrencyLimit);
	const sliverResponses: Awaited<ReturnType<typeof getSliver>>[] = [];

	for (const storageNode of storageNodes) {
		const shardIndices = shardIndicesByNodeId.get(storageNode.node_info.node_id) ?? [];

		for (const shardIndex of shardIndices) {
			const nodeClient = createClient({
				baseUrl: `https://${storageNode.node_info.network_address}/`,
			});
			const sliverPairIndex = toPairIndex(shardIndex, blobMetadata.blob_id, numShards);

			if (taskPool.queue.length >= primarySourceSymbols) {
				console.log(`Queued enough jobs to decode ${taskPool.queue.length}`);
				break;
			}
			console.log('queig job', sliverPairIndex, storageNode.node_info.network_address);

			taskPool.runTask(async () => {
				const response = await getSliver({
					client: nodeClient,
					path: {
						blob_id: blobId,
						sliver_pair_index: sliverPairIndex,
						sliver_type: 'primary',
					},
				});

				sliverResponses.push(response);
				return response;
			});
		}

		if (taskPool.queue.length >= primarySourceSymbols) {
			console.log(`Queued enough jobs to decode ${taskPool.queue.length}`);
			break;
		}
	}

	await taskPool.awaitAll();

	const slivers = await Promise.all(
		sliverResponses
			.filter((response) => !!response.data)
			.map(async (response) => {
				// fix and do concurrently
				const arrayBuffer = await response.data!.arrayBuffer();
				const bcsBytes = new Uint8Array(arrayBuffer);

				return SliverData.parse(bcsBytes);
			}),
	);

	// TODO: Check 404s and blocked requests

	// Un-intuitive naming - change wasm binding names? :P
	const blobEncoder = new BlobEncoder(numShards);
	const blobSize = BigInt(blobMetadata.metadata.unencoded_length);
	const blobBytes = blobEncoder.decode_primary(blobSize, slivers);

	// TODO: type wrappers for WASM methods ++ fix BCS blob_id to make comparison easier
	const reconstructedBlobMetadata = blobEncoder.compute_metadata(blobBytes);
	if (!verifyReconstructedBlobId(reconstructedBlobMetadata.blob_id, blobMetadata.blob_id)) {
		console.log('inconsistent blob -- try more slivers');
		return null;
	}

	console.log('blobBytes', blobBytes);

	return new Blob([new Uint8Array(blobBytes)]);
}

function verifyReconstructedBlobId(a: unknown[], b: unknown[]) {
	if (a.length !== b.length) return false;

	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) return false;
	}

	return true;
}

(async function main() {
	const blob = await retrieveBlob('cUTGpAG6MixSTbM8-KHvUoK_eGn4bXJP1a8U5cQq9yw');

	// Convert Uint8Array to string using TextDecoder
	const textDecoder = new TextDecoder('utf-8'); // Specify encoding, e.g., "utf-8"
	const resultString = textDecoder.decode(await blob?.arrayBuffer());

	console.log('res', resultString);
})();

// async function getCertifiedEpoch(
// 	blobId: string,
// 	stakingState: InferBcsType<ReturnType<typeof StakingInnerV1>>,
// ) {
// 	const isCommiteeTransitioning = stakingState.epoch_state.$kind === 'EpochChangeSync';
// 	const currentEpoch = stakingState.epoch;

// 	if (!isCommiteeTransitioning) return currentEpoch;

// 	const initialCertifiedEpoch = await getInitialCertifiedEpoch(blobId);
// 	if (!initialCertifiedEpoch) {
// 		// Blob not found
// 		return null;
// 	}

// 	if (initialCertifiedEpoch > currentEpoch) {
// 		// client behind
// 		return null;
// 	}

// 	return initialCertifiedEpoch;
// }

// async function getInitialCertifiedEpoch(blobId: string) {
// 	// Idk wtf the API generator did here, but the function signature needs fixed
// 	// TODO: Retries
// 	// TODO: Do we need to get the status from multiple storage nodes...? I think yes
// 	const blobStatusResponse = await getBlobStatus(
// 		{ client },
// 		{ blob_id: blobId },
// 		{ path: { blob_id: blobId } },
// 	);

// 	const blobStatus = blobStatusResponse.data?.success?.data;
// 	if (!blobStatus || blobStatus === 'nonexistent' || 'invalid' in blobStatus) {
// 		return null;
// 	}

// 	// TODO: why does this return as unknown
// 	if ('permanent' in blobStatus) return blobStatus.permanent.initial_certified_epoch as number;
// 	return blobStatus.deletable.initial_certified_epoch as number;
// }

async function getPrimarySourceSymbols(numShards: number) {
	const transaction = new Transaction();
	transaction.add(redStuffContract.source_symbols_primary({ arguments: [numShards] }));
	const { results } = await suiClient.devInspectTransactionBlock({
		sender: normalizeSuiAddress('0x0'),
		transactionBlock: transaction,
	});

	if (!results || results.length === 0 || !results[0].returnValues) {
		throw Error('uuuuuh');
	}
	return bcs.u16().parse(Uint8Array.from(results[0].returnValues[0][0]));
}

function getShardIndicesByNodeId(committee: InferBcsType<ReturnType<typeof Committee>>) {
	const shardIndicesByNodeId = new Map<string, number[]>();

	for (const node of committee.pos0.contents) {
		if (!shardIndicesByNodeId.has(node.key)) {
			shardIndicesByNodeId.set(node.key, []);
		}
		shardIndicesByNodeId.get(node.key)!.push(...node.value);
	}

	return shardIndicesByNodeId;
}

function rotationOffset(bytes: Uint8Array, modulus: number): number {
	return bytes.reduce((acc, byte) => (acc * 256 + byte) % modulus, 0);
}

function toPairIndex(index: number, blobID: Uint8Array, numShards: number): number {
	return (numShards + index - rotationOffset(blobID, numShards)) % numShards;
}

async function getSystemState() {
	const systemObject = await loadObject(systemObjectId, System());
	return await loadFieldObject(
		systemObjectId,
		{
			type: 'u64',
			value: systemObject.version,
		},
		SystemStateInnerV1(),
	);
}

async function getStakingState() {
	const stakingObject = await loadObject(stakingObjectId, Staking());
	return await loadFieldObject(
		stakingObjectId,
		{
			type: 'u64',
			value: stakingObject.version,
		},
		StakingInnerV1(),
	);
}

async function getStorageNodes(committee: InferBcsType<ReturnType<typeof BlsCommittee>>) {
	return await loadObjects(
		committee.members.map((member) => member.node_id),
		StakingPool(),
	);
}

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

interface Task<T> {
	run: () => Promise<T>;
	promise: PromiseWithResolvers<T>;
}

class TaskPool<T> {
	maxConcurrency: number;
	concurrency = 0;
	queue: Task<T>[] = [];
	onEmpty: (() => void)[] = [];

	constructor(maxConcurrency: number) {
		this.maxConcurrency = maxConcurrency;
	}

	#enqueue(task: Task<T>) {
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

	async runTask(asyncFn: () => Promise<T>) {
		const promise = Promise.withResolvers<T>();

		this.#enqueue({
			run: asyncFn,
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
