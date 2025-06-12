// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import * as object from './object.js';
export function Clock() {
	return bcs.struct('Clock', {
		id: object.UID(),
		timestamp_ms: bcs.u64(),
	});
}
export function init(packageAddress: string) {
	function timestamp_ms(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'clock',
				function: 'timestamp_ms',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { timestamp_ms };
}
