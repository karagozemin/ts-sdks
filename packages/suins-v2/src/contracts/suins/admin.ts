// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments } from '../utils/index.js';
import type { RawTransactionArgument } from '../utils/index.js';
export function Admin() {
	return bcs.struct('Admin', {
		dummy_field: bcs.bool(),
	});
}
export function init(packageAddress: string) {
	function authorize(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::AdminCap`,
			`${packageAddress}::suins::SuiNS`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'admin',
				function: 'authorize',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function reserve_domain(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<number>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::AdminCap`,
			`${packageAddress}::suins::SuiNS`,
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
			'u8',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'admin',
				function: 'reserve_domain',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { authorize, reserve_domain };
}
