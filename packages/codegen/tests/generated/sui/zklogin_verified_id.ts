// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import * as object from './object.js';
export function VerifiedID() {
	return bcs.struct('VerifiedID', {
		id: object.UID(),
		owner: bcs.Address,
		key_claim_name: bcs.string(),
		key_claim_value: bcs.string(),
		issuer: bcs.string(),
		audience: bcs.string(),
	});
}
export function init(packageAddress: string) {
	function owner(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'zklogin_verified_id',
				function: 'owner',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function key_claim_name(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'zklogin_verified_id',
				function: 'key_claim_name',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function key_claim_value(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'zklogin_verified_id',
				function: 'key_claim_value',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function issuer(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'zklogin_verified_id',
				function: 'issuer',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function audience(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'zklogin_verified_id',
				function: 'audience',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function _delete(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'zklogin_verified_id',
				function: 'delete',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function verify_zklogin_id(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<number | bigint>,
		];
	}) {
		const argumentsTypes = [
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
			'u256',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'zklogin_verified_id',
				function: 'verify_zklogin_id',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function check_zklogin_id(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<number | bigint>,
		];
	}) {
		const argumentsTypes = [
			'address',
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
			'u256',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'zklogin_verified_id',
				function: 'check_zklogin_id',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		owner,
		key_claim_name,
		key_claim_value,
		issuer,
		audience,
		_delete,
		verify_zklogin_id,
		check_zklogin_id,
	};
}
