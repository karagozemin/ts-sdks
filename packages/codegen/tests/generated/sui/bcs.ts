/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function BCS() {
	return bcs.struct('BCS', {
		bytes: bcs.vector(bcs.u8()),
	});
}
export function init(packageAddress: string) {
	function to_bytes<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<T>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'to_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function _new(options: { arguments: [RawTransactionArgument<number[]>] }) {
		const argumentsTypes = ['vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'new',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function into_remainder_bytes(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'into_remainder_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_address(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_address',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_bool(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_bool',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_u8(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_u8',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_u16(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_u16',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_u32(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_u32',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_u64(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_u64',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_u128(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_u128',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_u256(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_u256',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_vec_length(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_vec_length',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_vec_address(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_vec_address',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_vec_bool(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_vec_bool',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_vec_u8(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_vec_u8',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_vec_vec_u8(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_vec_vec_u8',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_vec_u16(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_vec_u16',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_vec_u32(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_vec_u32',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_vec_u64(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_vec_u64',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_vec_u128(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_vec_u128',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_vec_u256(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_vec_u256',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_enum_tag(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_enum_tag',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_option_address(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_option_address',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_option_bool(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_option_bool',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_option_u8(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_option_u8',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_option_u16(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_option_u16',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_option_u32(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_option_u32',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_option_u64(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_option_u64',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_option_u128(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_option_u128',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function peel_option_u256(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bcs',
				function: 'peel_option_u256',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		to_bytes,
		_new,
		into_remainder_bytes,
		peel_address,
		peel_bool,
		peel_u8,
		peel_u16,
		peel_u32,
		peel_u64,
		peel_u128,
		peel_u256,
		peel_vec_length,
		peel_vec_address,
		peel_vec_bool,
		peel_vec_u8,
		peel_vec_vec_u8,
		peel_vec_u16,
		peel_vec_u32,
		peel_vec_u64,
		peel_vec_u128,
		peel_vec_u256,
		peel_enum_tag,
		peel_option_address,
		peel_option_bool,
		peel_option_u8,
		peel_option_u16,
		peel_option_u32,
		peel_option_u64,
		peel_option_u128,
		peel_option_u256,
	};
}
