// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments } from '../utils/index.js';
import type { RawTransactionArgument } from '../utils/index.js';
export function Config() {
	return bcs.struct('Config', {
		public_key: bcs.vector(bcs.u8()),
		three_char_price: bcs.u64(),
		four_char_price: bcs.u64(),
		five_plus_char_price: bcs.u64(),
	});
}
export function init(packageAddress: string) {
	function _new(options: {
		arguments: [
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number | bigint>,
			RawTransactionArgument<number | bigint>,
			RawTransactionArgument<number | bigint>,
		];
	}) {
		const argumentsTypes = ['vector<u8>', 'u64', 'u64', 'u64'] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'config',
				function: 'new',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_public_key(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number[]>];
	}) {
		const argumentsTypes = [`${packageAddress}::config::Config`, 'vector<u8>'] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'config',
				function: 'set_public_key',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_three_char_price(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = [`${packageAddress}::config::Config`, 'u64'] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'config',
				function: 'set_three_char_price',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_four_char_price(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = [`${packageAddress}::config::Config`, 'u64'] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'config',
				function: 'set_four_char_price',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_five_plus_char_price(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = [`${packageAddress}::config::Config`, 'u64'] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'config',
				function: 'set_five_plus_char_price',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function calculate_price(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<number>,
			RawTransactionArgument<number>,
		];
	}) {
		const argumentsTypes = [`${packageAddress}::config::Config`, 'u8', 'u8'] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'config',
				function: 'calculate_price',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function public_key(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::config::Config`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'config',
				function: 'public_key',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function three_char_price(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::config::Config`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'config',
				function: 'three_char_price',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function four_char_price(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::config::Config`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'config',
				function: 'four_char_price',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function five_plus_char_price(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::config::Config`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'config',
				function: 'five_plus_char_price',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function assert_valid_user_registerable_domain(options: {
		arguments: [RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [`${packageAddress}::domain::Domain`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'config',
				function: 'assert_valid_user_registerable_domain',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		_new,
		set_public_key,
		set_three_char_price,
		set_four_char_price,
		set_five_plus_char_price,
		calculate_price,
		public_key,
		three_char_price,
		four_char_price,
		five_plus_char_price,
		assert_valid_user_registerable_domain,
	};
}
