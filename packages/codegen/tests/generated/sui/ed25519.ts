// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function init(packageAddress: string) {
	function ed25519_verify(options: {
		arguments: [
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
		];
	}) {
		const argumentsTypes = ['vector<u8>', 'vector<u8>', 'vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ed25519',
				function: 'ed25519_verify',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { ed25519_verify };
}
