// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export function Option<Element extends BcsType<any>>(...typeParameters: [Element]) {
	return bcs.struct('Option', {
		vec: bcs.vector(typeParameters[0]),
	});
}
export function init(packageAddress: string) {
	function none(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'option',
				function: 'none',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function some<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'option',
				function: 'some',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function is_none<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element | null>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${packageAddress}::option::Option<${options.typeArguments[0]}>`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'option',
				function: 'is_none',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function is_some<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element | null>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${packageAddress}::option::Option<${options.typeArguments[0]}>`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'option',
				function: 'is_some',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function contains<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element | null>, RawTransactionArgument<Element>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`${packageAddress}::option::Option<${options.typeArguments[0]}>`,
			`${options.typeArguments[0]}`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'option',
				function: 'contains',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function borrow<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element | null>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${packageAddress}::option::Option<${options.typeArguments[0]}>`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'option',
				function: 'borrow',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function borrow_with_default<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element | null>, RawTransactionArgument<Element>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`${packageAddress}::option::Option<${options.typeArguments[0]}>`,
			`${options.typeArguments[0]}`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'option',
				function: 'borrow_with_default',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function get_with_default<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element | null>, RawTransactionArgument<Element>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`${packageAddress}::option::Option<${options.typeArguments[0]}>`,
			`${options.typeArguments[0]}`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'option',
				function: 'get_with_default',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function fill<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element | null>, RawTransactionArgument<Element>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`${packageAddress}::option::Option<${options.typeArguments[0]}>`,
			`${options.typeArguments[0]}`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'option',
				function: 'fill',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function extract<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element | null>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${packageAddress}::option::Option<${options.typeArguments[0]}>`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'option',
				function: 'extract',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function borrow_mut<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element | null>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${packageAddress}::option::Option<${options.typeArguments[0]}>`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'option',
				function: 'borrow_mut',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function swap<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element | null>, RawTransactionArgument<Element>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`${packageAddress}::option::Option<${options.typeArguments[0]}>`,
			`${options.typeArguments[0]}`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'option',
				function: 'swap',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function swap_or_fill<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element | null>, RawTransactionArgument<Element>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`${packageAddress}::option::Option<${options.typeArguments[0]}>`,
			`${options.typeArguments[0]}`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'option',
				function: 'swap_or_fill',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function destroy_with_default<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element | null>, RawTransactionArgument<Element>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`${packageAddress}::option::Option<${options.typeArguments[0]}>`,
			`${options.typeArguments[0]}`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'option',
				function: 'destroy_with_default',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function destroy_some<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element | null>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${packageAddress}::option::Option<${options.typeArguments[0]}>`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'option',
				function: 'destroy_some',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function destroy_none<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element | null>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${packageAddress}::option::Option<${options.typeArguments[0]}>`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'option',
				function: 'destroy_none',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function to_vec<Element extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Element | null>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${packageAddress}::option::Option<${options.typeArguments[0]}>`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'option',
				function: 'to_vec',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	return {
		none,
		some,
		is_none,
		is_some,
		contains,
		borrow,
		borrow_with_default,
		get_with_default,
		fill,
		extract,
		borrow_mut,
		swap,
		swap_or_fill,
		destroy_with_default,
		destroy_some,
		destroy_none,
		to_vec,
	};
}
