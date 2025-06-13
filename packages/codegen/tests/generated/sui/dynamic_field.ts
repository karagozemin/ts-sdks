/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import * as object from './object.js';
export function Field<Name extends BcsType<any>, Value extends BcsType<any>>(
	...typeParameters: [Name, Value]
) {
	return bcs.struct('Field', {
		id: object.UID(),
		name: typeParameters[0],
		value: typeParameters[1],
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
				module: 'dynamic_field',
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
				module: 'dynamic_field',
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
				module: 'dynamic_field',
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
				module: 'dynamic_field',
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
				module: 'dynamic_field',
				function: 'exists_',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function remove_if_exists<Name extends BcsType<any>, Value extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Name>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'dynamic_field',
				function: 'remove_if_exists',
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
				module: 'dynamic_field',
				function: 'exists_with_type',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	return { add, borrow, borrow_mut, remove, exists_, remove_if_exists, exists_with_type };
}
