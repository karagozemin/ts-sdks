/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function ID() {
	return bcs.struct('ID', {
		bytes: bcs.Address,
	});
}
export function UID() {
	return bcs.struct('UID', {
		id: bcs.Address,
	});
}
export function init(packageAddress: string) {
	function id_to_bytes(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object',
				function: 'id_to_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function id_to_address(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object',
				function: 'id_to_address',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function id_from_bytes(options: { arguments: [RawTransactionArgument<number[]>] }) {
		const argumentsTypes = ['vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object',
				function: 'id_from_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function id_from_address(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = ['address'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object',
				function: 'id_from_address',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function uid_as_inner(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object',
				function: 'uid_as_inner',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function uid_to_inner(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object',
				function: 'uid_to_inner',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function uid_to_bytes(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object',
				function: 'uid_to_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function uid_to_address(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object',
				function: 'uid_to_address',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function _new(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object',
				function: 'new',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function _delete(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object',
				function: 'delete',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function id<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<T>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object',
				function: 'id',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function borrow_id<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<T>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object',
				function: 'borrow_id',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function id_bytes<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<T>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object',
				function: 'id_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function id_address<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<T>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'object',
				function: 'id_address',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	return {
		id_to_bytes,
		id_to_address,
		id_from_bytes,
		id_from_address,
		uid_as_inner,
		uid_to_inner,
		uid_to_bytes,
		uid_to_address,
		_new,
		_delete,
		id,
		borrow_id,
		id_bytes,
		id_address,
	};
}
