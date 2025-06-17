// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments } from '../utils/index.js';
import type { RawTransactionArgument } from '../utils/index.js';
export function ControllerV2() {
	return bcs.struct('ControllerV2', {
		dummy_field: bcs.bool(),
	});
}
export function Controller() {
	return bcs.struct('Controller', {
		dummy_field: bcs.bool(),
	});
}
export function init(packageAddress: string) {
	function set_target_address(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string | null>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::SuiNS`,
			`${packageAddress}::suins_registration::SuinsRegistration`,
			'0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<address>',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'controller',
				function: 'set_target_address',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_reverse_lookup(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::SuiNS`,
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'controller',
				function: 'set_reverse_lookup',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function unset_reverse_lookup(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::suins::SuiNS`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'controller',
				function: 'unset_reverse_lookup',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_object_reverse_lookup(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::SuiNS`,
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'controller',
				function: 'set_object_reverse_lookup',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function unset_object_reverse_lookup(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::suins::SuiNS`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'controller',
				function: 'unset_object_reverse_lookup',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_user_data(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::SuiNS`,
			`${packageAddress}::suins_registration::SuinsRegistration`,
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'controller',
				function: 'set_user_data',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function unset_user_data(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::SuiNS`,
			`${packageAddress}::suins_registration::SuinsRegistration`,
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'controller',
				function: 'unset_user_data',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function burn_expired(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::SuiNS`,
			`${packageAddress}::suins_registration::SuinsRegistration`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'controller',
				function: 'burn_expired',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function burn_expired_subname(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::SuiNS`,
			`${packageAddress}::subdomain_registration::SubDomainRegistration`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'controller',
				function: 'burn_expired_subname',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		set_target_address,
		set_reverse_lookup,
		unset_reverse_lookup,
		set_object_reverse_lookup,
		unset_object_reverse_lookup,
		set_user_data,
		unset_user_data,
		burn_expired,
		burn_expired_subname,
	};
}
