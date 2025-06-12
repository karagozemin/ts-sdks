// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function init(packageAddress: string) {
	function secp256k1_ecrecover(options: {
		arguments: [
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number>,
		];
	}) {
		const argumentsTypes = ['vector<u8>', 'vector<u8>', 'u8'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ecdsa_k1',
				function: 'secp256k1_ecrecover',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function decompress_pubkey(options: { arguments: [RawTransactionArgument<number[]>] }) {
		const argumentsTypes = ['vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ecdsa_k1',
				function: 'decompress_pubkey',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function secp256k1_verify(options: {
		arguments: [
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number>,
		];
	}) {
		const argumentsTypes = ['vector<u8>', 'vector<u8>', 'vector<u8>', 'u8'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ecdsa_k1',
				function: 'secp256k1_verify',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { secp256k1_ecrecover, decompress_pubkey, secp256k1_verify };
}
