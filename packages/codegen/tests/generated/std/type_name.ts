// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function TypeName() {
	return bcs.struct('TypeName', {
		name: bcs.string(),
	});
}
export function init(packageAddress: string) {
	function get(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'type_name',
				function: 'get',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function get_with_original_ids(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'type_name',
				function: 'get_with_original_ids',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function is_primitive(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::type_name::TypeName`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'type_name',
				function: 'is_primitive',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function borrow_string(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::type_name::TypeName`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'type_name',
				function: 'borrow_string',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function get_address(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::type_name::TypeName`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'type_name',
				function: 'get_address',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function get_module(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::type_name::TypeName`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'type_name',
				function: 'get_module',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function into_string(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::type_name::TypeName`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'type_name',
				function: 'into_string',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		get,
		get_with_original_ids,
		is_primitive,
		borrow_string,
		get_address,
		get_module,
		into_string,
	};
}
