// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function init(packageAddress: string) {
	function keep(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'pay',
				function: 'keep',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function split(options: {
		arguments: [RawTransactionArgument<number | bigint>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'pay',
				function: 'split',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function split_vec(options: {
		arguments: [RawTransactionArgument<number | bigint[]>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['vector<u64>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'pay',
				function: 'split_vec',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function split_and_transfer(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['u64', 'address'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'pay',
				function: 'split_and_transfer',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function divide_and_keep(options: {
		arguments: [RawTransactionArgument<number | bigint>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'pay',
				function: 'divide_and_keep',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function join(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'pay',
				function: 'join',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function join_vec(options: {
		arguments: [RawTransactionArgument<string[]>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`vector<${packageAddress}::coin::Coin<${options.typeArguments[0]}>>`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'pay',
				function: 'join_vec',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function join_vec_and_transfer(options: {
		arguments: [RawTransactionArgument<string[]>, RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`vector<${packageAddress}::coin::Coin<${options.typeArguments[0]}>>`,
			'address',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'pay',
				function: 'join_vec_and_transfer',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	return {
		keep,
		split,
		split_vec,
		split_and_transfer,
		divide_and_keep,
		join,
		join_vec,
		join_vec_and_transfer,
	};
}
