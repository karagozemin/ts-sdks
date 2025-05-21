// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';

import { WalrusClient } from '../../src/client.js';

import { Bench, nToMs } from 'tinybench';

const client = new SuiClient({
	url: getFullnodeUrl('mainnet'),
	network: 'mainnet',
}).$extend(WalrusClient.experimental_asClientExtension({ network: 'mainnet' }));

const smallBytes = new TextEncoder().encode(`hello world`);

const bigBytes = new TextEncoder().encode(`hello world`.repeat(2000000));

const bench = new Bench({
	name: 'simple benchmark bun',
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	now: () => nToMs(Bun.nanoseconds()),
	iterations: 3,
	setup: (_task, mode) => {
		// Run the garbage collector before warmup at each cycle
		if (mode === 'warmup') {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
			Bun.gc(true);
		}
	},

	time: 5000,
});

const bindings = await client.walrus.wasmBindings();

bench
	.add('encode_blob with large blob', async () => {
		const result = await bindings.encodeBlob(1000, bigBytes);
		console.log(result.blobId);
	})
	.add('encode_blob with small blob', async () => {
		const result = await bindings.encodeBlob(1000, smallBytes);
		console.log(result.blobId);
	});

await bench.run();

console.log(bench.name);
console.table(bench.table());
