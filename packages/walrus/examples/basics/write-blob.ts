// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Agent, setGlobalDispatcher } from 'undici';

import { WalrusClient } from '../../src/client.js';
import { getFundedKeypair } from '../funded-keypair.js';

// Node connect timeout is 10 seconds, and walrus nodes are SLOW
setGlobalDispatcher(
	new Agent({
		connectTimeout: 60_000,
		connect: { timeout: 60_000 },
	}),
);

/** @ts-ignore */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const suiClient = new SuiClient({
	url: getFullnodeUrl('testnet'),
});

const walrusClient = new WalrusClient({
	network: 'testnet',
	suiClient,
	storageNodeClientOptions: {
		timeout: 60_000,
		fetch: (url, init) => {
			return new Promise((resolve, reject) => {
				// bun hangs even with abort signals
				init?.signal?.addEventListener('abort', (error) => {
					reject(error);
				});

				fetch(
					url as never,
					{
						...init,
						// bun
						// dispatcher: new Agent({ connectTimeout: 60_000, connect: { timeout: 60_000 } }),
						tls: {
							rejectUnauthorized: false,
						},
					} as never,
				).then(resolve, reject);
			});
		},
	},
});

async function uploadFile() {
	const keypair = await getFundedKeypair();

	const file = new TextEncoder().encode('Hello from the TS SDK!!!\n');

	const { blobId } = await walrusClient.writeBlob({
		blob: file,
		deletable: true,
		epochs: 3,
		signer: keypair,
	});

	console.log(blobId);
}

uploadFile().catch(console.error);
