// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function PCREntry() {
	return bcs.struct('PCREntry', {
		index: bcs.u8(),
		value: bcs.vector(bcs.u8()),
	});
}
export function NitroAttestationDocument() {
	return bcs.struct('NitroAttestationDocument', {
		module_id: bcs.vector(bcs.u8()),
		timestamp: bcs.u64(),
		digest: bcs.vector(bcs.u8()),
		pcrs: bcs.vector(PCREntry()),
		public_key: bcs.option(bcs.vector(bcs.u8())),
		user_data: bcs.option(bcs.vector(bcs.u8())),
		nonce: bcs.option(bcs.vector(bcs.u8())),
	});
}
export function init(packageAddress: string) {
	function module_id(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'nitro_attestation',
				function: 'module_id',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function timestamp(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'nitro_attestation',
				function: 'timestamp',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function digest(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'nitro_attestation',
				function: 'digest',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function pcrs(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'nitro_attestation',
				function: 'pcrs',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function public_key(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'nitro_attestation',
				function: 'public_key',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function user_data(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'nitro_attestation',
				function: 'user_data',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function nonce(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'nitro_attestation',
				function: 'nonce',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function index(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'nitro_attestation',
				function: 'index',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function value(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'nitro_attestation',
				function: 'value',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { module_id, timestamp, digest, pcrs, public_key, user_data, nonce, index, value };
}
