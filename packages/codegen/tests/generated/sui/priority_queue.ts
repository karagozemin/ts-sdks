/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function PriorityQueue<T extends BcsType<any>>(...typeParameters: [T]) {
	return bcs.struct('PriorityQueue', {
		entries: bcs.vector(Entry(typeParameters[0])),
	});
}
export function Entry<T extends BcsType<any>>(...typeParameters: [T]) {
	return bcs.struct('Entry', {
		priority: bcs.u64(),
		value: typeParameters[0],
	});
}
export function init(packageAddress: string) {
	function _new(options: {
		arguments: [RawTransactionArgument<string[]>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`vector<${packageAddress}::priority_queue::Entry<${options.typeArguments[0]}>>`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'priority_queue',
				function: 'new',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function pop_max(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'priority_queue',
				function: 'pop_max',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function insert<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<T>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['u64', `${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'priority_queue',
				function: 'insert',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function new_entry<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<T>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['u64', `${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'priority_queue',
				function: 'new_entry',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function create_entries<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<number | bigint[]>, RawTransactionArgument<T[]>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['vector<u64>', `vector<${options.typeArguments[0]}>`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'priority_queue',
				function: 'create_entries',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function priorities(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'priority_queue',
				function: 'priorities',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	return { _new, pop_max, insert, new_entry, create_entries, priorities };
}
