// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function Scalar() {
	return bcs.struct('Scalar', {
		dummy_field: bcs.bool(),
	});
}
export function G1() {
	return bcs.struct('G1', {
		dummy_field: bcs.bool(),
	});
}
export function G2() {
	return bcs.struct('G2', {
		dummy_field: bcs.bool(),
	});
}
export function GT() {
	return bcs.struct('GT', {
		dummy_field: bcs.bool(),
	});
}
export function UncompressedG1() {
	return bcs.struct('UncompressedG1', {
		dummy_field: bcs.bool(),
	});
}
export function init(packageAddress: string) {
	function bls12381_min_sig_verify(options: {
		arguments: [
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
		];
	}) {
		const argumentsTypes = ['vector<u8>', 'vector<u8>', 'vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'bls12381_min_sig_verify',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function bls12381_min_pk_verify(options: {
		arguments: [
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
		];
	}) {
		const argumentsTypes = ['vector<u8>', 'vector<u8>', 'vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'bls12381_min_pk_verify',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function scalar_from_bytes(options: { arguments: [RawTransactionArgument<number[]>] }) {
		const argumentsTypes = ['vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'scalar_from_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function scalar_from_u64(options: { arguments: [RawTransactionArgument<number | bigint>] }) {
		const argumentsTypes = ['u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'scalar_from_u64',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function scalar_zero(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'scalar_zero',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function scalar_one(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'scalar_one',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function scalar_add(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'scalar_add',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function scalar_sub(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'scalar_sub',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function scalar_mul(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'scalar_mul',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function scalar_div(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'scalar_div',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function scalar_neg(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'scalar_neg',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function scalar_inv(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'scalar_inv',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function g1_from_bytes(options: { arguments: [RawTransactionArgument<number[]>] }) {
		const argumentsTypes = ['vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'g1_from_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function g1_identity(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'g1_identity',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function g1_generator(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'g1_generator',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function g1_add(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'g1_add',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function g1_sub(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'g1_sub',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function g1_mul(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'g1_mul',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function g1_div(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'g1_div',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function g1_neg(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'g1_neg',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function hash_to_g1(options: { arguments: [RawTransactionArgument<number[]>] }) {
		const argumentsTypes = ['vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'hash_to_g1',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function g1_multi_scalar_multiplication(options: {
		arguments: [RawTransactionArgument<string[]>, RawTransactionArgument<string[]>];
	}) {
		const argumentsTypes = [
			`vector<${packageAddress}::group_ops::Element<${packageAddress}::bls12381::Scalar>>`,
			`vector<${packageAddress}::group_ops::Element<${packageAddress}::bls12381::G1>>`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'g1_multi_scalar_multiplication',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function g1_to_uncompressed_g1(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'g1_to_uncompressed_g1',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function g2_from_bytes(options: { arguments: [RawTransactionArgument<number[]>] }) {
		const argumentsTypes = ['vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'g2_from_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function g2_identity(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'g2_identity',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function g2_generator(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'g2_generator',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function g2_add(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'g2_add',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function g2_sub(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'g2_sub',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function g2_mul(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'g2_mul',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function g2_div(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'g2_div',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function g2_neg(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'g2_neg',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function hash_to_g2(options: { arguments: [RawTransactionArgument<number[]>] }) {
		const argumentsTypes = ['vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'hash_to_g2',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function g2_multi_scalar_multiplication(options: {
		arguments: [RawTransactionArgument<string[]>, RawTransactionArgument<string[]>];
	}) {
		const argumentsTypes = [
			`vector<${packageAddress}::group_ops::Element<${packageAddress}::bls12381::Scalar>>`,
			`vector<${packageAddress}::group_ops::Element<${packageAddress}::bls12381::G2>>`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'g2_multi_scalar_multiplication',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function gt_identity(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'gt_identity',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function gt_generator(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'gt_generator',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function gt_add(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'gt_add',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function gt_sub(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'gt_sub',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function gt_mul(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'gt_mul',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function gt_div(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'gt_div',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function gt_neg(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'gt_neg',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function pairing(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'pairing',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function uncompressed_g1_to_g1(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'uncompressed_g1_to_g1',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function uncompressed_g1_sum(options: { arguments: [RawTransactionArgument<string[]>] }) {
		const argumentsTypes = [
			`vector<${packageAddress}::group_ops::Element<${packageAddress}::bls12381::UncompressedG1>>`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'bls12381',
				function: 'uncompressed_g1_sum',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		bls12381_min_sig_verify,
		bls12381_min_pk_verify,
		scalar_from_bytes,
		scalar_from_u64,
		scalar_zero,
		scalar_one,
		scalar_add,
		scalar_sub,
		scalar_mul,
		scalar_div,
		scalar_neg,
		scalar_inv,
		g1_from_bytes,
		g1_identity,
		g1_generator,
		g1_add,
		g1_sub,
		g1_mul,
		g1_div,
		g1_neg,
		hash_to_g1,
		g1_multi_scalar_multiplication,
		g1_to_uncompressed_g1,
		g2_from_bytes,
		g2_identity,
		g2_generator,
		g2_add,
		g2_sub,
		g2_mul,
		g2_div,
		g2_neg,
		hash_to_g2,
		g2_multi_scalar_multiplication,
		gt_identity,
		gt_generator,
		gt_add,
		gt_sub,
		gt_mul,
		gt_div,
		gt_neg,
		pairing,
		uncompressed_g1_to_g1,
		uncompressed_g1_sum,
	};
}
