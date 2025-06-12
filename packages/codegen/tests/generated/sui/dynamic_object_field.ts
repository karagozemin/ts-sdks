// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function Wrapper<Name extends BcsType<any>>(...typeParameters: [Name]) {
	return bcs.struct('Wrapper', {
		name: typeParameters[0],
	});
}
export function init(packageAddress: string) {
	function add<Name extends BcsType<any>, Value extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Name>, RawTransactionArgument<Value>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`, `${options.typeArguments[1]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'dynamic_object_field',
				function: 'add',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function borrow<Name extends BcsType<any>, Value extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Name>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'dynamic_object_field',
				function: 'borrow',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function borrow_mut<Name extends BcsType<any>, Value extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Name>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'dynamic_object_field',
				function: 'borrow_mut',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function remove<Name extends BcsType<any>, Value extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Name>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'dynamic_object_field',
				function: 'remove',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function exists_<Name extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Name>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'dynamic_object_field',
				function: 'exists_',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function exists_with_type<Name extends BcsType<any>, Value extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Name>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'dynamic_object_field',
				function: 'exists_with_type',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function id<Name extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Name>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'dynamic_object_field',
				function: 'id',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	return { add, borrow, borrow_mut, remove, exists_, exists_with_type, id };
}
