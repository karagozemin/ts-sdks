/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function FixedPoint32() {
	return bcs.struct('FixedPoint32', {
		value: bcs.u64(),
	});
}
export function init(packageAddress: string) {
	function multiply_u64(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = ['u64', `${packageAddress}::fixed_point32::FixedPoint32`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'fixed_point32',
				function: 'multiply_u64',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function divide_u64(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = ['u64', `${packageAddress}::fixed_point32::FixedPoint32`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'fixed_point32',
				function: 'divide_u64',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function create_from_rational(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = ['u64', 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'fixed_point32',
				function: 'create_from_rational',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function create_from_raw_value(options: {
		arguments: [RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = ['u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'fixed_point32',
				function: 'create_from_raw_value',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function get_raw_value(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::fixed_point32::FixedPoint32`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'fixed_point32',
				function: 'get_raw_value',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function is_zero(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::fixed_point32::FixedPoint32`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'fixed_point32',
				function: 'is_zero',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		multiply_u64,
		divide_u64,
		create_from_rational,
		create_from_raw_value,
		get_raw_value,
		is_zero,
	};
}
