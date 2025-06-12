// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function init(packageAddress: string) {
	function hmac_sha3_256(options: {
		arguments: [RawTransactionArgument<number[]>, RawTransactionArgument<number[]>];
	}) {
		const argumentsTypes = ['vector<u8>', 'vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'hmac',
				function: 'hmac_sha3_256',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { hmac_sha3_256 };
}
