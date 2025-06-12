// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function UQ64_64() {
	return bcs.struct('UQ64_64', {
		pos0: bcs.u128(),
	});
}
export function init(packageAddress: string) {
	function from_quotient(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = ['u128', 'u128'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'uq64_64',
				function: 'from_quotient',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function from_int(options: { arguments: [RawTransactionArgument<number | bigint>] }) {
		const argumentsTypes = ['u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'uq64_64',
				function: 'from_int',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function add(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::uq64_64::UQ64_64`,
			`${packageAddress}::uq64_64::UQ64_64`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'uq64_64',
				function: 'add',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function sub(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::uq64_64::UQ64_64`,
			`${packageAddress}::uq64_64::UQ64_64`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'uq64_64',
				function: 'sub',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function mul(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::uq64_64::UQ64_64`,
			`${packageAddress}::uq64_64::UQ64_64`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'uq64_64',
				function: 'mul',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function div(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::uq64_64::UQ64_64`,
			`${packageAddress}::uq64_64::UQ64_64`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'uq64_64',
				function: 'div',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function to_int(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::uq64_64::UQ64_64`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'uq64_64',
				function: 'to_int',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function int_mul(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = ['u128', `${packageAddress}::uq64_64::UQ64_64`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'uq64_64',
				function: 'int_mul',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function int_div(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = ['u128', `${packageAddress}::uq64_64::UQ64_64`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'uq64_64',
				function: 'int_div',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function le(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::uq64_64::UQ64_64`,
			`${packageAddress}::uq64_64::UQ64_64`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'uq64_64',
				function: 'le',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function lt(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::uq64_64::UQ64_64`,
			`${packageAddress}::uq64_64::UQ64_64`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'uq64_64',
				function: 'lt',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function ge(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::uq64_64::UQ64_64`,
			`${packageAddress}::uq64_64::UQ64_64`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'uq64_64',
				function: 'ge',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function gt(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::uq64_64::UQ64_64`,
			`${packageAddress}::uq64_64::UQ64_64`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'uq64_64',
				function: 'gt',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function to_raw(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::uq64_64::UQ64_64`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'uq64_64',
				function: 'to_raw',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function from_raw(options: { arguments: [RawTransactionArgument<number | bigint>] }) {
		const argumentsTypes = ['u128'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'uq64_64',
				function: 'from_raw',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		from_quotient,
		from_int,
		add,
		sub,
		mul,
		div,
		to_int,
		int_mul,
		int_div,
		le,
		lt,
		ge,
		gt,
		to_raw,
		from_raw,
	};
}
