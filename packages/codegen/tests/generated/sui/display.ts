/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import * as object from './object.js';
import * as vec_map from './vec_map.js';
export function Display() {
	return bcs.struct('Display', {
		id: object.UID(),
		fields: vec_map.VecMap(bcs.string(), bcs.string()),
		version: bcs.u16(),
	});
}
export function DisplayCreated() {
	return bcs.struct('DisplayCreated', {
		id: bcs.Address,
	});
}
export function VersionUpdated() {
	return bcs.struct('VersionUpdated', {
		id: bcs.Address,
		version: bcs.u16(),
		fields: vec_map.VecMap(bcs.string(), bcs.string()),
	});
}
export function init(packageAddress: string) {
	function _new(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'display',
				function: 'new',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function new_with_fields(options: {
		arguments: [RawTransactionArgument<string[]>, RawTransactionArgument<string[]>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			'vector<0x0000000000000000000000000000000000000000000000000000000000000001::string::String>',
			'vector<0x0000000000000000000000000000000000000000000000000000000000000001::string::String>',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'display',
				function: 'new_with_fields',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function create_and_keep(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'display',
				function: 'create_and_keep',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function update_version(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'display',
				function: 'update_version',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function add(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'display',
				function: 'add',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function add_multiple(options: {
		arguments: [RawTransactionArgument<string[]>, RawTransactionArgument<string[]>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			'vector<0x0000000000000000000000000000000000000000000000000000000000000001::string::String>',
			'vector<0x0000000000000000000000000000000000000000000000000000000000000001::string::String>',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'display',
				function: 'add_multiple',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function edit(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'display',
				function: 'edit',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function remove(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'display',
				function: 'remove',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function is_authorized(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'display',
				function: 'is_authorized',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function version(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'display',
				function: 'version',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function fields(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'display',
				function: 'fields',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	return {
		_new,
		new_with_fields,
		create_and_keep,
		update_version,
		add,
		add_multiple,
		edit,
		remove,
		is_authorized,
		version,
		fields,
	};
}
