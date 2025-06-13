/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function TxContext() {
	return bcs.struct('TxContext', {
		sender: bcs.Address,
		tx_hash: bcs.vector(bcs.u8()),
		epoch: bcs.u64(),
		epoch_timestamp_ms: bcs.u64(),
		ids_created: bcs.u64(),
	});
}
export function init(packageAddress: string) {
	function sender(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'tx_context',
				function: 'sender',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function digest(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'tx_context',
				function: 'digest',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function epoch(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'tx_context',
				function: 'epoch',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function epoch_timestamp_ms(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'tx_context',
				function: 'epoch_timestamp_ms',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function fresh_object_address(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'tx_context',
				function: 'fresh_object_address',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { sender, digest, epoch, epoch_timestamp_ms, fresh_object_address };
}
