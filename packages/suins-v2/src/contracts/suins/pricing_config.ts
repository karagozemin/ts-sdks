// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments } from '../utils/index.js';
import type { RawTransactionArgument } from '../utils/index.js';
import * as vec_map from './deps/sui/vec_map.js';
export function Range() {
	return bcs.struct('Range', {
		pos0: bcs.u64(),
		pos1: bcs.u64(),
	});
}
export function PricingConfig() {
	return bcs.struct('PricingConfig', {
		pricing: vec_map.VecMap(Range(), bcs.u64()),
	});
}
export function RenewalConfig() {
	return bcs.struct('RenewalConfig', {
		config: PricingConfig(),
	});
}
export function init(packageAddress: string) {
	function calculate_base_price(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::pricing_config::PricingConfig`,
			'u64',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'pricing_config',
				function: 'calculate_base_price',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function _new(options: {
		arguments: [RawTransactionArgument<string[]>, RawTransactionArgument<number | bigint[]>];
	}) {
		const argumentsTypes = [
			`vector<${packageAddress}::pricing_config::Range>`,
			'vector<u64>',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'pricing_config',
				function: 'new',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function is_between_inclusive(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = [`${packageAddress}::pricing_config::Range`, 'u64'] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'pricing_config',
				function: 'is_between_inclusive',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function pricing(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::pricing_config::PricingConfig`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'pricing_config',
				function: 'pricing',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function new_renewal_config(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::pricing_config::PricingConfig`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'pricing_config',
				function: 'new_renewal_config',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function new_range(options: { arguments: [RawTransactionArgument<number | bigint[]>] }) {
		const argumentsTypes = ['vector<u64>'] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'pricing_config',
				function: 'new_range',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function config(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::pricing_config::RenewalConfig`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'pricing_config',
				function: 'config',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		calculate_base_price,
		_new,
		is_between_inclusive,
		pricing,
		new_renewal_config,
		new_range,
		config,
	};
}
