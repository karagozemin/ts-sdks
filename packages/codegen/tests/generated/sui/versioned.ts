/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import * as object from './object.js';
export function Versioned() {
	return bcs.struct('Versioned', {
		id: object.UID(),
		version: bcs.u64(),
	});
}
export function VersionChangeCap() {
	return bcs.struct('VersionChangeCap', {
		versioned_id: bcs.Address,
		old_version: bcs.u64(),
	});
}
export function init(packageAddress: string) {
	function create<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<T>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['u64', `${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'versioned',
				function: 'create',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function version(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'versioned',
				function: 'version',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function load_value(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'versioned',
				function: 'load_value',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function load_value_mut(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'versioned',
				function: 'load_value_mut',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function remove_value_for_upgrade(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'versioned',
				function: 'remove_value_for_upgrade',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function upgrade<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<T>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['u64', `${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'versioned',
				function: 'upgrade',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function destroy(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'versioned',
				function: 'destroy',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	return {
		create,
		version,
		load_value,
		load_value_mut,
		remove_value_for_upgrade,
		upgrade,
		destroy,
	};
}
