// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments } from '../utils/index.js';
import type { RawTransactionArgument } from '../utils/index.js';
import * as vec_map from './deps/sui/vec_map.js';
export function NameRecord() {
	return bcs.struct('NameRecord', {
		nft_id: bcs.Address,
		expiration_timestamp_ms: bcs.u64(),
		target_address: bcs.option(bcs.Address),
		data: vec_map.VecMap(bcs.string(), bcs.string()),
	});
}
export function init(packageAddress: string) {
	function _new(options: { arguments: [RawTransactionArgument<number | bigint>] }) {
		const argumentsTypes = ['u64'] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'name_record',
				function: 'new',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function new_leaf(options: { arguments: [RawTransactionArgument<string | null>] }) {
		const argumentsTypes = [
			'0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<address>',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'name_record',
				function: 'new_leaf',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_data(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::name_record::NameRecord`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'name_record',
				function: 'set_data',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_target_address(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string | null>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::name_record::NameRecord`,
			'0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<address>',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'name_record',
				function: 'set_target_address',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_expiration_timestamp_ms(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = [`${packageAddress}::name_record::NameRecord`, 'u64'] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'name_record',
				function: 'set_expiration_timestamp_ms',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function has_expired(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::name_record::NameRecord`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'name_record',
				function: 'has_expired',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function has_expired_past_grace_period(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::name_record::NameRecord`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'name_record',
				function: 'has_expired_past_grace_period',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function is_leaf_record(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::name_record::NameRecord`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'name_record',
				function: 'is_leaf_record',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function data(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::name_record::NameRecord`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'name_record',
				function: 'data',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function target_address(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::name_record::NameRecord`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'name_record',
				function: 'target_address',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function nft_id(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::name_record::NameRecord`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'name_record',
				function: 'nft_id',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function expiration_timestamp_ms(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::name_record::NameRecord`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'name_record',
				function: 'expiration_timestamp_ms',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		_new,
		new_leaf,
		set_data,
		set_target_address,
		set_expiration_timestamp_ms,
		has_expired,
		has_expired_past_grace_period,
		is_leaf_record,
		data,
		target_address,
		nft_id,
		expiration_timestamp_ms,
	};
}
