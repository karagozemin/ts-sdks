// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments } from '../utils/index.js';
import type { RawTransactionArgument } from '../utils/index.js';
export function Domain() {
	return bcs.struct('Domain', {
		labels: bcs.vector(bcs.string()),
	});
}
export function init(packageAddress: string) {
	function _new(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'domain',
				function: 'new',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function to_string(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::domain::Domain`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'domain',
				function: 'to_string',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function label(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = [`${packageAddress}::domain::Domain`, 'u64'] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'domain',
				function: 'label',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function tld(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::domain::Domain`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'domain',
				function: 'tld',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function sld(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::domain::Domain`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'domain',
				function: 'sld',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function number_of_levels(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::domain::Domain`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'domain',
				function: 'number_of_levels',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function is_subdomain(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::domain::Domain`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'domain',
				function: 'is_subdomain',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function parent(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::domain::Domain`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'domain',
				function: 'parent',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function is_parent_of(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::domain::Domain`,
			`${packageAddress}::domain::Domain`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'domain',
				function: 'is_parent_of',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { _new, to_string, label, tld, sld, number_of_levels, is_subdomain, parent, is_parent_of };
}
