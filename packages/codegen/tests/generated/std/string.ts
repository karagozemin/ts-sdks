/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function String() {
	return bcs.struct('String', {
		bytes: bcs.vector(bcs.u8()),
	});
}
export function init(packageAddress: string) {
	function utf8(options: { arguments: [RawTransactionArgument<number[]>] }) {
		const argumentsTypes = ['vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'string',
				function: 'utf8',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function from_ascii(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::ascii::String`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'string',
				function: 'from_ascii',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function to_ascii(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::string::String`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'string',
				function: 'to_ascii',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function try_utf8(options: { arguments: [RawTransactionArgument<number[]>] }) {
		const argumentsTypes = ['vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'string',
				function: 'try_utf8',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function as_bytes(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::string::String`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'string',
				function: 'as_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function into_bytes(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::string::String`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'string',
				function: 'into_bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function is_empty(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::string::String`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'string',
				function: 'is_empty',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function length(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::string::String`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'string',
				function: 'length',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function append(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::string::String`,
			`${packageAddress}::string::String`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'string',
				function: 'append',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function append_utf8(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number[]>];
	}) {
		const argumentsTypes = [`${packageAddress}::string::String`, 'vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'string',
				function: 'append_utf8',
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
			`${packageAddress}::string::String`,
			'u64',
			`${packageAddress}::string::String`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'string',
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
		const argumentsTypes = [`${packageAddress}::string::String`, 'u64', 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'string',
				function: 'substring',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function index_of(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::string::String`,
			`${packageAddress}::string::String`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'string',
				function: 'index_of',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function bytes(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::string::String`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'string',
				function: 'bytes',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function sub_string(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<number | bigint>,
			RawTransactionArgument<number | bigint>,
		];
	}) {
		const argumentsTypes = [`${packageAddress}::string::String`, 'u64', 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'string',
				function: 'sub_string',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		utf8,
		from_ascii,
		to_ascii,
		try_utf8,
		as_bytes,
		into_bytes,
		is_empty,
		length,
		append,
		append_utf8,
		insert,
		substring,
		index_of,
		bytes,
		sub_string,
	};
}
