// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function init(packageAddress: string) {
	function hash_to_input(options: { arguments: [RawTransactionArgument<number[]>] }) {
		const argumentsTypes = ['vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vdf',
				function: 'hash_to_input',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function vdf_verify(options: {
		arguments: [
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number | bigint>,
		];
	}) {
		const argumentsTypes = ['vector<u8>', 'vector<u8>', 'vector<u8>', 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vdf',
				function: 'vdf_verify',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { hash_to_input, vdf_verify };
}
