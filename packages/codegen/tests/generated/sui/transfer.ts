// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function Receiving() {
	return bcs.struct('Receiving', {
		id: bcs.Address,
		version: bcs.u64(),
	});
}
export function init(packageAddress: string) {
	function transfer<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<T>, RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`, 'address'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer',
				function: 'transfer',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function public_transfer<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<T>, RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`, 'address'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer',
				function: 'public_transfer',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function freeze_object<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<T>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer',
				function: 'freeze_object',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function public_freeze_object<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<T>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer',
				function: 'public_freeze_object',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function share_object<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<T>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer',
				function: 'share_object',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function public_share_object<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<T>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer',
				function: 'public_share_object',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function receive(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer',
				function: 'receive',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function public_receive(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer',
				function: 'public_receive',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function receiving_object_id(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer',
				function: 'receiving_object_id',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	return {
		transfer,
		public_transfer,
		freeze_object,
		public_freeze_object,
		share_object,
		public_share_object,
		receive,
		public_receive,
		receiving_object_id,
	};
}
