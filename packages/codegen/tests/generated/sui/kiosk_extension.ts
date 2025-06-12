// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import * as bag from './bag.js';
export function Extension() {
	return bcs.struct('Extension', {
		storage: bag.Bag(),
		permissions: bcs.u128(),
		is_enabled: bcs.bool(),
	});
}
export function ExtensionKey() {
	return bcs.struct('ExtensionKey', {
		dummy_field: bcs.bool(),
	});
}
export function init(packageAddress: string) {
	function add<Ext extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Ext>, RawTransactionArgument<number | bigint>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`, 'u128'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk_extension',
				function: 'add',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function disable(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk_extension',
				function: 'disable',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function enable(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk_extension',
				function: 'enable',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function remove(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk_extension',
				function: 'remove',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function storage<Ext extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Ext>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk_extension',
				function: 'storage',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function storage_mut<Ext extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Ext>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk_extension',
				function: 'storage_mut',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function place<Ext extends BcsType<any>, T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Ext>, RawTransactionArgument<T>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`, `${options.typeArguments[1]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk_extension',
				function: 'place',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function lock<Ext extends BcsType<any>, T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Ext>, RawTransactionArgument<T>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`, `${options.typeArguments[1]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk_extension',
				function: 'lock',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function is_installed(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk_extension',
				function: 'is_installed',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function is_enabled(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk_extension',
				function: 'is_enabled',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function can_place(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk_extension',
				function: 'can_place',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function can_lock(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk_extension',
				function: 'can_lock',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	return {
		add,
		disable,
		enable,
		remove,
		storage,
		storage_mut,
		place,
		lock,
		is_installed,
		is_enabled,
		can_place,
		can_lock,
	};
}
