// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';

import { WalrusClient } from '../../src/client.js';

const client = new SuiClient({
	url: getFullnodeUrl('mainnet'),
	network: 'mainnet',
}).$extend(WalrusClient.experimental_asClientExtension());

export async function retrieveBlob(blobId: string) {
	const blobBytes = await client.walrus.readBlob({ blobId });
	return new Blob([new Uint8Array(blobBytes)]);
}

(async function main() {
	const bytes = new TextEncoder().encode(`hello world`.repeat(400_000));

	console.log(bytes.length);

	console.time();
	const blob = await client.walrus.computeBlobMetadata({ bytes, numShards: 1000 });
	console.timeEnd();

	console.log(blob.blobId);
})();
