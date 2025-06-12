// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function init(packageAddress: string) {
	function poseidon_bn254(options: { arguments: [RawTransactionArgument<number | bigint[]>] }) {
		const argumentsTypes = ['vector<u256>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'poseidon',
				function: 'poseidon_bn254',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { poseidon_bn254 };
}
