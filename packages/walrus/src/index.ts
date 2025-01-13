// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { createClient } from '@hey-api/client-fetch';
import type { BcsType, InferBcsType } from '@mysten/bcs';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { BlobEncoder } from '@mysten/walrus-wasm';

import { client, healthInfo } from './client/index.js';
import { StakingInnerV1 } from './contracts/walrus/staking_inner.js';
import { StakingPool } from './contracts/walrus/staking_pool.js';
import { Staking } from './contracts/walrus/staking.js';
import { SystemStateInnerV1 } from './contracts/walrus/system_state_inner.js';
import { init, System } from './contracts/walrus/system.js';

const systemContract = init({
	walrus: '9f992cc2430a1f442ca7a5ca7638169f5d5c00e0ebc3977a65e9ac6e497fe5ef',
	wal: '0x9f992cc2430a1f442ca7a5ca7638169f5d5c00e0ebc3977a65e9ac6e497fe5ef',
});

const systemObjectId = '0x50b84b68eb9da4c6d904a929f43638481c09c03be6274b8569778fe085c1590d';
const stakingObjectId = '0x37c0e4d7b36a2f64d51bba262a1791f844cfd88f31379f1b7c04244061d43914';

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
	const systemObject = await loadObject(systemObjectId, System());
	const systemStateInner = await loadFieldObject(
		systemObjectId,
		{
			type: 'u64',
			value: systemObject.version,
		},
		SystemStateInnerV1(),
	);
	const stakingObject = await loadObject(stakingObjectId, Staking());
	const stakingStateInner = await loadFieldObject(
		stakingObjectId,
		{
			type: 'u64',
			value: stakingObject.version,
		},
		StakingInnerV1(),
	);

	console.log(systemStateInner.committee.members);

	const nodes = await loadObjects(
		systemStateInner.committee.members.map((member) => member.node_id),
		StakingPool(),
	);

	const nodeAddresses = nodes.map((node) => node.node_info.network_address);
	const clients = nodeAddresses.map((address) => {
		const nodeClient = createClient();

		nodeClient.setConfig({
			baseUrl: `https://${address}`,
		});

		return nodeClient;
	});
	const file = new TextEncoder().encode('Hello, world!');
	const blobEncoder = new BlobEncoder(systemStateInner.committee.n_shards);

	const [encoded, metadata] = blobEncoder.encode_with_metadata(file) as [
		EncodedFile,
		EncodedMetadata,
	];

	console.dir(metadata, { depth: null });

	const res = await healthInfo({});

	console.log(res.data?.success);
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
