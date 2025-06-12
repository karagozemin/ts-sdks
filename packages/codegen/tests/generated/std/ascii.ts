// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function String() {
	return bcs.struct('String', {
		bytes: bcs.vector(bcs.u8()),
	});
}
export function Char() {
	return bcs.struct('Char', {
		byte: bcs.u8(),
	});
}
export function init(packageAddress: string) {
	function char(options: { arguments: [RawTransactionArgument<number>] }) {
		const argumentsTypes = ['u8'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ascii',
				function: 'char',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function string(options: { arguments: [RawTransactionArgument<number[]>] }) {
		const argumentsTypes = ['vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ascii',
				function: 'string',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function try_string(options: { arguments: [RawTransactionArgument<number[]>] }) {
		const argumentsTypes = ['vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ascii',
				function: 'try_string',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function all_characters_printable(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::ascii::String`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ascii',
				function: 'all_characters_printable',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function push_char(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [`${packageAddress}::ascii::String`, `${packageAddress}::ascii::Char`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ascii',
				function: 'push_char',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function pop_char(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::ascii::String`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ascii',
				function: 'pop_char',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function length(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::ascii::String`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ascii',
				function: 'length',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function append(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [`${packageAddress}::ascii::String`, `${packageAddress}::ascii::String`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ascii',
				function: 'append',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function insert(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<number | bigint>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddress}::ascii::String`,
			'u64',
			`${packageAddress}::ascii::String`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ascii',
				function: 'insert',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function substring(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<number | bigint>,
			RawTransactionArgument<number | bigint>,
		];
	}) {
		const argumentsTypes = [`${packageAddress}::ascii::String`, 'u64', 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ascii',
				function: 'substring',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function as_bytes(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::ascii::String`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ascii',
				function: 'as_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function into_bytes(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::ascii::String`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ascii',
				function: 'into_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function byte(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::ascii::Char`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ascii',
				function: 'byte',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function is_valid_char(options: { arguments: [RawTransactionArgument<number>] }) {
		const argumentsTypes = ['u8'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ascii',
				function: 'is_valid_char',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function is_printable_char(options: { arguments: [RawTransactionArgument<number>] }) {
		const argumentsTypes = ['u8'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ascii',
				function: 'is_printable_char',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function is_empty(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::ascii::String`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ascii',
				function: 'is_empty',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function to_uppercase(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::ascii::String`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ascii',
				function: 'to_uppercase',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function to_lowercase(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::ascii::String`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ascii',
				function: 'to_lowercase',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function index_of(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [`${packageAddress}::ascii::String`, `${packageAddress}::ascii::String`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'ascii',
				function: 'index_of',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		char,
		string,
		try_string,
		all_characters_printable,
		push_char,
		pop_char,
		length,
		append,
		insert,
		substring,
		as_bytes,
		into_bytes,
		byte,
		is_valid_char,
		is_printable_char,
		is_empty,
		to_uppercase,
		to_lowercase,
		index_of,
	};
}
