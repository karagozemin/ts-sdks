/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function Url() {
	return bcs.struct('Url', {
		url: bcs.string(),
	});
}
export function init(packageAddress: string) {
	function new_unsafe(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			'0x0000000000000000000000000000000000000000000000000000000000000001::ascii::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'url',
				function: 'new_unsafe',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function new_unsafe_from_bytes(options: { arguments: [RawTransactionArgument<number[]>] }) {
		const argumentsTypes = ['vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'url',
				function: 'new_unsafe_from_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function inner_url(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'url',
				function: 'inner_url',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function update(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			'0x0000000000000000000000000000000000000000000000000000000000000001::ascii::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'url',
				function: 'update',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { new_unsafe, new_unsafe_from_bytes, inner_url, update };
}
