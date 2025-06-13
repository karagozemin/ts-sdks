/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function init(packageAddress: string) {
	function secp256r1_ecrecover(options: {
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
				module: 'ecdsa_r1',
				function: 'secp256r1_ecrecover',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function secp256r1_verify(options: {
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
				module: 'ecdsa_r1',
				function: 'secp256r1_verify',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { secp256r1_ecrecover, secp256r1_verify };
}
