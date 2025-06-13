/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function init(packageAddress: string) {
	function bitwise_not(options: { arguments: [RawTransactionArgument<number>] }) {
		const argumentsTypes = ['u32'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u32',
				function: 'bitwise_not',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function max(options: {
		arguments: [RawTransactionArgument<number>, RawTransactionArgument<number>];
	}) {
		const argumentsTypes = ['u32', 'u32'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u32',
				function: 'max',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function min(options: {
		arguments: [RawTransactionArgument<number>, RawTransactionArgument<number>];
	}) {
		const argumentsTypes = ['u32', 'u32'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u32',
				function: 'min',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function diff(options: {
		arguments: [RawTransactionArgument<number>, RawTransactionArgument<number>];
	}) {
		const argumentsTypes = ['u32', 'u32'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u32',
				function: 'diff',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function divide_and_round_up(options: {
		arguments: [RawTransactionArgument<number>, RawTransactionArgument<number>];
	}) {
		const argumentsTypes = ['u32', 'u32'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u32',
				function: 'divide_and_round_up',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function pow(options: {
		arguments: [RawTransactionArgument<number>, RawTransactionArgument<number>];
	}) {
		const argumentsTypes = ['u32', 'u8'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u32',
				function: 'pow',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function sqrt(options: { arguments: [RawTransactionArgument<number>] }) {
		const argumentsTypes = ['u32'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u32',
				function: 'sqrt',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function try_as_u8(options: { arguments: [RawTransactionArgument<number>] }) {
		const argumentsTypes = ['u32'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u32',
				function: 'try_as_u8',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function try_as_u16(options: { arguments: [RawTransactionArgument<number>] }) {
		const argumentsTypes = ['u32'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u32',
				function: 'try_as_u16',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function to_string(options: { arguments: [RawTransactionArgument<number>] }) {
		const argumentsTypes = ['u32'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'u32',
				function: 'to_string',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		bitwise_not,
		max,
		min,
		diff,
		divide_and_round_up,
		pow,
		sqrt,
		try_as_u8,
		try_as_u16,
		to_string,
	};
}
