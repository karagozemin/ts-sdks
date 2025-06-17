// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments } from '../utils/index.js';
import type { RawTransactionArgument } from '../utils/index.js';
import * as vec_set from './deps/sui/vec_set.js';
import * as vec_map from './deps/sui/vec_map.js';
export function CoreConfig() {
	return bcs.struct('CoreConfig', {
		public_key: bcs.vector(bcs.u8()),
		min_label_length: bcs.u8(),
		max_label_length: bcs.u8(),
		valid_tlds: vec_set.VecSet(bcs.string()),
		payments_version: bcs.u8(),
		max_years: bcs.u8(),
		extra: vec_map.VecMap(bcs.string(), bcs.string()),
	});
}
export function init(packageAddress: string) {
	function _new(options: {
		arguments: [
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number>,
			RawTransactionArgument<number>,
			RawTransactionArgument<number>,
			RawTransactionArgument<number>,
			RawTransactionArgument<string[]>,
		];
	}) {
		const argumentsTypes = [
			'vector<u8>',
			'u8',
			'u8',
			'u8',
			'u8',
			'vector<0x0000000000000000000000000000000000000000000000000000000000000001::string::String>',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'core_config',
				function: 'new',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function public_key(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::core_config::CoreConfig`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'core_config',
				function: 'public_key',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function min_label_length(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::core_config::CoreConfig`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'core_config',
				function: 'min_label_length',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function max_label_length(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::core_config::CoreConfig`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'core_config',
				function: 'max_label_length',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function is_valid_tld(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::core_config::CoreConfig`,
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'core_config',
				function: 'is_valid_tld',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function payments_version(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::core_config::CoreConfig`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'core_config',
				function: 'payments_version',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function max_years(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::core_config::CoreConfig`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'core_config',
				function: 'max_years',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		_new,
		public_key,
		min_label_length,
		max_label_length,
		is_valid_tld,
		payments_version,
		max_years,
	};
}
