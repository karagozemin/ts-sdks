// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function init(packageAddress: string) {
	function empty(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vector',
				function: 'empty',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function length<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element[]>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`vector<${options.typeArguments[0]}>`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vector',
				function: 'length',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function borrow<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element[]>, RawTransactionArgument<number | bigint>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`vector<${options.typeArguments[0]}>`, 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vector',
				function: 'borrow',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function push_back<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element[]>, RawTransactionArgument<Element>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`vector<${options.typeArguments[0]}>`, `${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vector',
				function: 'push_back',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function borrow_mut<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element[]>, RawTransactionArgument<number | bigint>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`vector<${options.typeArguments[0]}>`, 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vector',
				function: 'borrow_mut',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function pop_back<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element[]>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`vector<${options.typeArguments[0]}>`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vector',
				function: 'pop_back',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function destroy_empty<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element[]>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`vector<${options.typeArguments[0]}>`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vector',
				function: 'destroy_empty',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function swap<Element extends BcsType<any>>(options: {
		arguments: [
			RawTransactionArgument<Element[]>,
			RawTransactionArgument<number | bigint>,
			RawTransactionArgument<number | bigint>,
		];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`vector<${options.typeArguments[0]}>`, 'u64', 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vector',
				function: 'swap',
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
				module: 'vector',
				function: 'singleton',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function reverse<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element[]>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`vector<${options.typeArguments[0]}>`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vector',
				function: 'reverse',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function append<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element[]>, RawTransactionArgument<Element[]>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`vector<${options.typeArguments[0]}>`,
			`vector<${options.typeArguments[0]}>`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vector',
				function: 'append',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function is_empty<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element[]>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`vector<${options.typeArguments[0]}>`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vector',
				function: 'is_empty',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function contains<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element[]>, RawTransactionArgument<Element>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`vector<${options.typeArguments[0]}>`, `${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vector',
				function: 'contains',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function index_of<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element[]>, RawTransactionArgument<Element>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`vector<${options.typeArguments[0]}>`, `${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vector',
				function: 'index_of',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function remove<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element[]>, RawTransactionArgument<number | bigint>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`vector<${options.typeArguments[0]}>`, 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vector',
				function: 'remove',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function insert<Element extends BcsType<any>>(options: {
		arguments: [
			RawTransactionArgument<Element[]>,
			RawTransactionArgument<Element>,
			RawTransactionArgument<number | bigint>,
		];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`vector<${options.typeArguments[0]}>`,
			`${options.typeArguments[0]}`,
			'u64',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vector',
				function: 'insert',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function swap_remove<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element[]>, RawTransactionArgument<number | bigint>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`vector<${options.typeArguments[0]}>`, 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vector',
				function: 'swap_remove',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function flatten<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<T[][]>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`vector<vector<${options.typeArguments[0]}>>`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vector',
				function: 'flatten',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	return {
		empty,
		length,
		borrow,
		push_back,
		borrow_mut,
		pop_back,
		destroy_empty,
		swap,
		singleton,
		reverse,
		append,
		is_empty,
		contains,
		index_of,
		remove,
		insert,
		swap_remove,
		flatten,
	};
}
