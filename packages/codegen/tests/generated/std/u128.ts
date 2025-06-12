// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function init(packageAddress: string) {
	function bitwise_not(options: { arguments: [RawTransactionArgument<number | bigint>] }) {
		const argumentsTypes = ['u128'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u128',
				function: 'bitwise_not',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function max(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = ['u128', 'u128'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u128',
				function: 'max',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function min(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = ['u128', 'u128'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u128',
				function: 'min',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function diff(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = ['u128', 'u128'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u128',
				function: 'diff',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function divide_and_round_up(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = ['u128', 'u128'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u128',
				function: 'divide_and_round_up',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function pow(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<number>];
	}) {
		const argumentsTypes = ['u128', 'u8'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u128',
				function: 'pow',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function sqrt(options: { arguments: [RawTransactionArgument<number | bigint>] }) {
		const argumentsTypes = ['u128'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u128',
				function: 'sqrt',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function try_as_u8(options: { arguments: [RawTransactionArgument<number | bigint>] }) {
		const argumentsTypes = ['u128'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u128',
				function: 'try_as_u8',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function try_as_u16(options: { arguments: [RawTransactionArgument<number | bigint>] }) {
		const argumentsTypes = ['u128'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u128',
				function: 'try_as_u16',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function try_as_u32(options: { arguments: [RawTransactionArgument<number | bigint>] }) {
		const argumentsTypes = ['u128'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u128',
				function: 'try_as_u32',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function try_as_u64(options: { arguments: [RawTransactionArgument<number | bigint>] }) {
		const argumentsTypes = ['u128'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u128',
				function: 'try_as_u64',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function to_string(options: { arguments: [RawTransactionArgument<number | bigint>] }) {
		const argumentsTypes = ['u128'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u128',
				function: 'to_string',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		bitwise_not,
		max,
		min,
		diff,
		divide_and_round_up,
		pow,
		sqrt,
		try_as_u8,
		try_as_u16,
		try_as_u32,
		try_as_u64,
		to_string,
	};
}
