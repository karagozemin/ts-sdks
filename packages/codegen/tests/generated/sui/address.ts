/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function init(packageAddress: string) {
	function to_u256(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = ['address'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'address',
				function: 'to_u256',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function from_u256(options: { arguments: [RawTransactionArgument<number | bigint>] }) {
		const argumentsTypes = ['u256'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'address',
				function: 'from_u256',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function from_bytes(options: { arguments: [RawTransactionArgument<number[]>] }) {
		const argumentsTypes = ['vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'address',
				function: 'from_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function to_bytes(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = ['address'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'address',
				function: 'to_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function to_ascii_string(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = ['address'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'address',
				function: 'to_ascii_string',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function to_string(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = ['address'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'address',
				function: 'to_string',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function from_ascii_bytes(options: { arguments: [RawTransactionArgument<number[]>] }) {
		const argumentsTypes = ['vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'address',
				function: 'from_ascii_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function length(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'address',
				function: 'length',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function max(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'address',
				function: 'max',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		to_u256,
		from_u256,
		from_bytes,
		to_bytes,
		to_ascii_string,
		to_string,
		from_ascii_bytes,
		length,
		max,
	};
}
