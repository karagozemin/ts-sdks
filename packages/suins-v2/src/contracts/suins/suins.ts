// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { BcsType } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments } from '../utils/index.js';
import type { RawTransactionArgument } from '../utils/index.js';
import * as object from './deps/sui/object.js';
import * as balance from './deps/sui/balance.js';
export function AdminCap() {
	return bcs.struct('AdminCap', {
		id: object.UID(),
	});
}
export function SuiNS() {
	return bcs.struct('SuiNS', {
		id: object.UID(),
		balance: balance.Balance(),
	});
}
export function SUINS() {
	return bcs.struct('SUINS', {
		dummy_field: bcs.bool(),
	});
}
export function ConfigKey() {
	return bcs.struct('ConfigKey', {
		dummy_field: bcs.bool(),
	});
}
export function RegistryKey() {
	return bcs.struct('RegistryKey', {
		dummy_field: bcs.bool(),
	});
}
export function BalanceKey() {
	return bcs.struct('BalanceKey', {
		dummy_field: bcs.bool(),
	});
}
export function AppKey() {
	return bcs.struct('AppKey', {
		dummy_field: bcs.bool(),
	});
}
export function init(packageAddress: string) {
	function withdraw(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::AdminCap`,
			`${packageAddress}::suins::SuiNS`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins',
				function: 'withdraw',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function withdraw_custom(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::SuiNS`,
			`${packageAddress}::suins::AdminCap`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins',
				function: 'withdraw_custom',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function authorize_app(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::AdminCap`,
			`${packageAddress}::suins::SuiNS`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins',
				function: 'authorize_app',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function deauthorize_app(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::AdminCap`,
			`${packageAddress}::suins::SuiNS`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins',
				function: 'deauthorize_app',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function is_app_authorized(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${packageAddress}::suins::SuiNS`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins',
				function: 'is_app_authorized',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function assert_app_is_authorized(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${packageAddress}::suins::SuiNS`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins',
				function: 'assert_app_is_authorized',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function app_add_balance<App extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<App>, RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`${options.typeArguments[0]}`,
			`${packageAddress}::suins::SuiNS`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins',
				function: 'app_add_balance',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function app_add_custom_balance<App extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<App>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::SuiNS`,
			`${options.typeArguments[0]}`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins',
				function: 'app_add_custom_balance',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function app_registry_mut<App extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<App>, RawTransactionArgument<string>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [
			`${options.typeArguments[0]}`,
			`${packageAddress}::suins::SuiNS`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins',
				function: 'app_registry_mut',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function add_config<Config extends BcsType<any>>(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<Config>,
		];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::AdminCap`,
			`${packageAddress}::suins::SuiNS`,
			`${options.typeArguments[0]}`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins',
				function: 'add_config',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function get_config(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${packageAddress}::suins::SuiNS`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins',
				function: 'get_config',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function remove_config(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::AdminCap`,
			`${packageAddress}::suins::SuiNS`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins',
				function: 'remove_config',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function registry(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${packageAddress}::suins::SuiNS`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins',
				function: 'registry',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function add_registry<R extends BcsType<any>>(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<R>,
		];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::AdminCap`,
			`${packageAddress}::suins::SuiNS`,
			`${options.typeArguments[0]}`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins',
				function: 'add_registry',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	return {
		withdraw,
		withdraw_custom,
		authorize_app,
		deauthorize_app,
		is_app_authorized,
		assert_app_is_authorized,
		app_add_balance,
		app_add_custom_balance,
		app_registry_mut,
		add_config,
		get_config,
		remove_config,
		registry,
		add_registry,
	};
}
