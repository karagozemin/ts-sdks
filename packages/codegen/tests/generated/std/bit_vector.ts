// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function BitVector() {
	return bcs.struct('BitVector', {
		length: bcs.u64(),
		bit_field: bcs.vector(bcs.bool()),
	});
}
export function init(packageAddress: string) {
	function _new(options: { arguments: [RawTransactionArgument<number | bigint>] }) {
		const argumentsTypes = ['u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bit_vector',
				function: 'new',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = [`${packageAddress}::bit_vector::BitVector`, 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bit_vector',
				function: 'set',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function unset(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = [`${packageAddress}::bit_vector::BitVector`, 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bit_vector',
				function: 'unset',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function shift_left(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = [`${packageAddress}::bit_vector::BitVector`, 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bit_vector',
				function: 'shift_left',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function is_index_set(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = [`${packageAddress}::bit_vector::BitVector`, 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bit_vector',
				function: 'is_index_set',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function length(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::bit_vector::BitVector`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bit_vector',
				function: 'length',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function longest_set_sequence_starting_at(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = [`${packageAddress}::bit_vector::BitVector`, 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bit_vector',
				function: 'longest_set_sequence_starting_at',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { _new, set, unset, shift_left, is_index_set, length, longest_set_sequence_starting_at };
}
