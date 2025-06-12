// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function Referent<T extends BcsType<any>>(...typeParameters: [T]) {
	return bcs.struct('Referent', {
		id: bcs.Address,
		value: bcs.option(typeParameters[0]),
	});
}
export function Borrow() {
	return bcs.struct('Borrow', {
		ref: bcs.Address,
		obj: bcs.Address,
	});
}
export function init(packageAddress: string) {
	function _new<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<T>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'borrow',
				function: 'new',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function borrow(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'borrow',
				function: 'borrow',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function put_back<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<T>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'borrow',
				function: 'put_back',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function destroy(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'borrow',
				function: 'destroy',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	return { _new, borrow, put_back, destroy };
}
