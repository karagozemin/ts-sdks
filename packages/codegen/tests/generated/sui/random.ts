/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import * as object from './object.js';
import * as versioned from './versioned.js';
export function Random() {
	return bcs.struct('Random', {
		id: object.UID(),
		inner: versioned.Versioned(),
	});
}
export function RandomInner() {
	return bcs.struct('RandomInner', {
		version: bcs.u64(),
		epoch: bcs.u64(),
		randomness_round: bcs.u64(),
		random_bytes: bcs.vector(bcs.u8()),
	});
}
export function RandomGenerator() {
	return bcs.struct('RandomGenerator', {
		seed: bcs.vector(bcs.u8()),
		counter: bcs.u16(),
		buffer: bcs.vector(bcs.u8()),
	});
}
export function init(packageAddress: string) {
	function new_generator(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'random',
				function: 'new_generator',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function generate_bytes(options: { arguments: [RawTransactionArgument<number>] }) {
		const argumentsTypes = ['u16'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'random',
				function: 'generate_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function generate_u256(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'random',
				function: 'generate_u256',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function generate_u128(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'random',
				function: 'generate_u128',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function generate_u64(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'random',
				function: 'generate_u64',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function generate_u32(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'random',
				function: 'generate_u32',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function generate_u16(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'random',
				function: 'generate_u16',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function generate_u8(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'random',
				function: 'generate_u8',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function generate_bool(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'random',
				function: 'generate_bool',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function generate_u128_in_range(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = ['u128', 'u128'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'random',
				function: 'generate_u128_in_range',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function generate_u64_in_range(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = ['u64', 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'random',
				function: 'generate_u64_in_range',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function generate_u32_in_range(options: {
		arguments: [RawTransactionArgument<number>, RawTransactionArgument<number>];
	}) {
		const argumentsTypes = ['u32', 'u32'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'random',
				function: 'generate_u32_in_range',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function generate_u16_in_range(options: {
		arguments: [RawTransactionArgument<number>, RawTransactionArgument<number>];
	}) {
		const argumentsTypes = ['u16', 'u16'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'random',
				function: 'generate_u16_in_range',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function generate_u8_in_range(options: {
		arguments: [RawTransactionArgument<number>, RawTransactionArgument<number>];
	}) {
		const argumentsTypes = ['u8', 'u8'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'random',
				function: 'generate_u8_in_range',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function shuffle<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<T[]>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`vector<${options.typeArguments[0]}>`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'random',
				function: 'shuffle',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	return {
		new_generator,
		generate_bytes,
		generate_u256,
		generate_u128,
		generate_u64,
		generate_u32,
		generate_u16,
		generate_u8,
		generate_bool,
		generate_u128_in_range,
		generate_u64_in_range,
		generate_u32_in_range,
		generate_u16_in_range,
		generate_u8_in_range,
		shuffle,
	};
}
