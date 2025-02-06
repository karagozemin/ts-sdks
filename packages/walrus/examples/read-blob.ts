// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';

import { WalrusClient } from '../src/client.js';

/** @ts-ignore */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const suiClient = new SuiClient({
	url: getFullnodeUrl('testnet'),
});

const walrusClient = new WalrusClient({
	network: 'testnet',
	suiClient,
});

(async function main() {
	const blob = await walrusClient.readBlob({
		blobId: 'YSzpvdZr80yfG3ihlg-W4vOcth4-pR8O1xD7j2O_XwM',
	});

	// Convert Uint8Array to string using TextDecoder
	const textDecoder = new TextDecoder('utf-8'); // Specify encoding, e.g., "utf-8"
	const resultString = textDecoder.decode(await blob?.arrayBuffer());

	console.log('res', resultString);
})();
