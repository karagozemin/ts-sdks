// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import * as object from './object.js';
export function ObjectBag() {
	return bcs.struct('ObjectBag', {
		id: object.UID(),
		size: bcs.u64(),
	});
}
export function init(packageAddress: string) {
	function _new(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object_bag',
				function: 'new',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function add<K extends BcsType<any>, V extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<K>, RawTransactionArgument<V>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`, `${options.typeArguments[1]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object_bag',
				function: 'add',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function borrow<K extends BcsType<any>, V extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<K>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object_bag',
				function: 'borrow',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function borrow_mut<K extends BcsType<any>, V extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<K>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object_bag',
				function: 'borrow_mut',
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
				module: 'object_bag',
				function: 'remove',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function contains<K extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<K>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object_bag',
				function: 'contains',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function contains_with_type<K extends BcsType<any>, V extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<K>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object_bag',
				function: 'contains_with_type',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function length(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object_bag',
				function: 'length',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function is_empty(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object_bag',
				function: 'is_empty',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function destroy_empty(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object_bag',
				function: 'destroy_empty',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function value_id<K extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<K>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object_bag',
				function: 'value_id',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	return {
		_new,
		add,
		borrow,
		borrow_mut,
		remove,
		contains,
		contains_with_type,
		length,
		is_empty,
		destroy_empty,
		value_id,
	};
}
