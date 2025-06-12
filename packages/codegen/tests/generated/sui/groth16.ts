// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function Curve() {
	return bcs.struct('Curve', {
		id: bcs.u8(),
	});
}
export function PreparedVerifyingKey() {
	return bcs.struct('PreparedVerifyingKey', {
		vk_gamma_abc_g1_bytes: bcs.vector(bcs.u8()),
		alpha_g1_beta_g2_bytes: bcs.vector(bcs.u8()),
		gamma_g2_neg_pc_bytes: bcs.vector(bcs.u8()),
		delta_g2_neg_pc_bytes: bcs.vector(bcs.u8()),
	});
}
export function PublicProofInputs() {
	return bcs.struct('PublicProofInputs', {
		bytes: bcs.vector(bcs.u8()),
	});
}
export function ProofPoints() {
	return bcs.struct('ProofPoints', {
		bytes: bcs.vector(bcs.u8()),
	});
}
export function init(packageAddress: string) {
	function bls12381(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'groth16',
				function: 'bls12381',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function bn254(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'groth16',
				function: 'bn254',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function pvk_from_bytes(options: {
		arguments: [
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
		];
	}) {
		const argumentsTypes = ['vector<u8>', 'vector<u8>', 'vector<u8>', 'vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'groth16',
				function: 'pvk_from_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function pvk_to_bytes(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'groth16',
				function: 'pvk_to_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function public_proof_inputs_from_bytes(options: {
		arguments: [RawTransactionArgument<number[]>];
	}) {
		const argumentsTypes = ['vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'groth16',
				function: 'public_proof_inputs_from_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function proof_points_from_bytes(options: { arguments: [RawTransactionArgument<number[]>] }) {
		const argumentsTypes = ['vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'groth16',
				function: 'proof_points_from_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function prepare_verifying_key(options: { arguments: [RawTransactionArgument<number[]>] }) {
		const argumentsTypes = ['vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'groth16',
				function: 'prepare_verifying_key',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function verify_groth16_proof(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'groth16',
				function: 'verify_groth16_proof',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		bls12381,
		bn254,
		pvk_from_bytes,
		pvk_to_bytes,
		public_proof_inputs_from_bytes,
		proof_points_from_bytes,
		prepare_verifying_key,
		verify_groth16_proof,
	};
}
