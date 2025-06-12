// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function VecMap<K extends BcsType<any>, V extends BcsType<any>>(...typeParameters: [K, V]) {
	return bcs.struct('VecMap', {
		contents: bcs.vector(Entry(typeParameters[0], typeParameters[1])),
	});
}
export function Entry<K extends BcsType<any>, V extends BcsType<any>>(...typeParameters: [K, V]) {
	return bcs.struct('Entry', {
		key: typeParameters[0],
		value: typeParameters[1],
	});
}
export function init(packageAddress: string) {
	function empty(options: { arguments: []; typeArguments: [string, string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vec_map',
				function: 'empty',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function insert<K extends BcsType<any>, V extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<K>, RawTransactionArgument<V>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`, `${options.typeArguments[1]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vec_map',
				function: 'insert',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function remove<K extends BcsType<any>, V extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<K>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vec_map',
				function: 'remove',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function pop(options: { arguments: []; typeArguments: [string, string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vec_map',
				function: 'pop',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function get_mut<K extends BcsType<any>, V extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<K>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vec_map',
				function: 'get_mut',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function get<K extends BcsType<any>, V extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<K>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vec_map',
				function: 'get',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function try_get<K extends BcsType<any>, V extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<K>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vec_map',
				function: 'try_get',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function contains<K extends BcsType<any>, V extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<K>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vec_map',
				function: 'contains',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function size(options: { arguments: []; typeArguments: [string, string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vec_map',
				function: 'size',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function is_empty(options: { arguments: []; typeArguments: [string, string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vec_map',
				function: 'is_empty',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function destroy_empty(options: { arguments: []; typeArguments: [string, string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vec_map',
				function: 'destroy_empty',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function into_keys_values(options: { arguments: []; typeArguments: [string, string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vec_map',
				function: 'into_keys_values',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function from_keys_values<K extends BcsType<any>, V extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<K[]>, RawTransactionArgument<V[]>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [
			`vector<${options.typeArguments[0]}>`,
			`vector<${options.typeArguments[1]}>`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vec_map',
				function: 'from_keys_values',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function keys(options: { arguments: []; typeArguments: [string, string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vec_map',
				function: 'keys',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function get_idx_opt<K extends BcsType<any>, V extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<K>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vec_map',
				function: 'get_idx_opt',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function get_idx<K extends BcsType<any>, V extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<K>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vec_map',
				function: 'get_idx',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function get_entry_by_idx(options: {
		arguments: [RawTransactionArgument<number | bigint>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = ['u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vec_map',
				function: 'get_entry_by_idx',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function get_entry_by_idx_mut(options: {
		arguments: [RawTransactionArgument<number | bigint>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = ['u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vec_map',
				function: 'get_entry_by_idx_mut',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function remove_entry_by_idx(options: {
		arguments: [RawTransactionArgument<number | bigint>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = ['u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'vec_map',
				function: 'remove_entry_by_idx',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	return {
		empty,
		insert,
		remove,
		pop,
		get_mut,
		get,
		try_get,
		contains,
		size,
		is_empty,
		destroy_empty,
		into_keys_values,
		from_keys_values,
		keys,
		get_idx_opt,
		get_idx,
		get_entry_by_idx,
		get_entry_by_idx_mut,
		remove_entry_by_idx,
	};
}
