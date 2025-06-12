// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import * as object from './object.js';
export function VerifiedIssuer() {
	return bcs.struct('VerifiedIssuer', {
		id: object.UID(),
		owner: bcs.Address,
		issuer: bcs.string(),
	});
}
export function init(packageAddress: string) {
	function owner(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'zklogin_verified_issuer',
				function: 'owner',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function issuer(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'zklogin_verified_issuer',
				function: 'issuer',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function _delete(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'zklogin_verified_issuer',
				function: 'delete',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function verify_zklogin_issuer(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			'u256',
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'zklogin_verified_issuer',
				function: 'verify_zklogin_issuer',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function check_zklogin_issuer(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<number | bigint>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			'address',
			'u256',
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'zklogin_verified_issuer',
				function: 'check_zklogin_issuer',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { owner, issuer, _delete, verify_zklogin_issuer, check_zklogin_issuer };
}
