// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function SUI() {
	return bcs.struct('SUI', {
		dummy_field: bcs.bool(),
	});
}
export function init(packageAddress: string) {
	function transfer(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = ['address'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'sui',
				function: 'transfer',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { transfer };
}
