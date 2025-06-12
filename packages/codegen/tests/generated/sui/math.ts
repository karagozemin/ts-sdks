// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function init(packageAddress: string) {
	function max(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = ['u64', 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'math',
				function: 'max',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function min(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = ['u64', 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'math',
				function: 'min',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function diff(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = ['u64', 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'math',
				function: 'diff',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function pow(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<number>];
	}) {
		const argumentsTypes = ['u64', 'u8'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'math',
				function: 'pow',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function sqrt(options: { arguments: [RawTransactionArgument<number | bigint>] }) {
		const argumentsTypes = ['u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'math',
				function: 'sqrt',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function sqrt_u128(options: { arguments: [RawTransactionArgument<number | bigint>] }) {
		const argumentsTypes = ['u128'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'math',
				function: 'sqrt_u128',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function divide_and_round_up(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = ['u64', 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'math',
				function: 'divide_and_round_up',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { max, min, diff, pow, sqrt, sqrt_u128, divide_and_round_up };
}
