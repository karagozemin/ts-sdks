// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import * as table from './table.js';
export function TableVec() {
	return bcs.struct('TableVec', {
		contents: table.Table(),
	});
}
export function init(packageAddress: string) {
	function empty(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'table_vec',
				function: 'empty',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function singleton<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'table_vec',
				function: 'singleton',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function length(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'table_vec',
				function: 'length',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function is_empty(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'table_vec',
				function: 'is_empty',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function borrow(options: {
		arguments: [RawTransactionArgument<number | bigint>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'table_vec',
				function: 'borrow',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function push_back<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'table_vec',
				function: 'push_back',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function borrow_mut(options: {
		arguments: [RawTransactionArgument<number | bigint>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'table_vec',
				function: 'borrow_mut',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function pop_back(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'table_vec',
				function: 'pop_back',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function destroy_empty(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'table_vec',
				function: 'destroy_empty',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function drop(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'table_vec',
				function: 'drop',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function swap(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<number | bigint>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['u64', 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'table_vec',
				function: 'swap',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function swap_remove(options: {
		arguments: [RawTransactionArgument<number | bigint>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'table_vec',
				function: 'swap_remove',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	return {
		empty,
		singleton,
		length,
		is_empty,
		borrow,
		push_back,
		borrow_mut,
		pop_back,
		destroy_empty,
		drop,
		swap,
		swap_remove,
	};
}
