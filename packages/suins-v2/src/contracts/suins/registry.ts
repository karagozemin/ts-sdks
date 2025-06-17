// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments } from '../utils/index.js';
import type { RawTransactionArgument } from '../utils/index.js';
import * as table from './deps/sui/table.js';
export function Registry() {
	return bcs.struct('Registry', {
		registry: table.Table(),
		reverse_registry: table.Table(),
	});
}
export function init(packageAddress: string) {
	function _new(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::suins::AdminCap`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'registry',
				function: 'new',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function add_record_ignoring_grace_period(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<number>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddress}::registry::Registry`,
			`${packageAddress}::domain::Domain`,
			'u8',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'registry',
				function: 'add_record_ignoring_grace_period',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function add_record(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<number>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddress}::registry::Registry`,
			`${packageAddress}::domain::Domain`,
			'u8',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'registry',
				function: 'add_record',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function burn_registration_object(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::registry::Registry`,
			`${packageAddress}::suins_registration::SuinsRegistration`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'registry',
				function: 'burn_registration_object',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function wrap_subdomain(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::registry::Registry`,
			`${packageAddress}::suins_registration::SuinsRegistration`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'registry',
				function: 'wrap_subdomain',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function burn_subdomain_object(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::registry::Registry`,
			`${packageAddress}::subdomain_registration::SubDomainRegistration`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'registry',
				function: 'burn_subdomain_object',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function add_leaf_record(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddress}::registry::Registry`,
			`${packageAddress}::domain::Domain`,
			'address',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'registry',
				function: 'add_leaf_record',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function remove_leaf_record(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::registry::Registry`,
			`${packageAddress}::domain::Domain`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'registry',
				function: 'remove_leaf_record',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_target_address(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string | null>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddress}::registry::Registry`,
			`${packageAddress}::domain::Domain`,
			'0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<address>',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'registry',
				function: 'set_target_address',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function unset_reverse_lookup(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [`${packageAddress}::registry::Registry`, 'address'] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'registry',
				function: 'unset_reverse_lookup',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_reverse_lookup(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddress}::registry::Registry`,
			'address',
			`${packageAddress}::domain::Domain`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'registry',
				function: 'set_reverse_lookup',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_expiration_timestamp_ms(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<number | bigint>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddress}::registry::Registry`,
			`${packageAddress}::suins_registration::SuinsRegistration`,
			`${packageAddress}::domain::Domain`,
			'u64',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'registry',
				function: 'set_expiration_timestamp_ms',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_data(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::registry::Registry`,
			`${packageAddress}::domain::Domain`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'registry',
				function: 'set_data',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function has_record(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::registry::Registry`,
			`${packageAddress}::domain::Domain`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'registry',
				function: 'has_record',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function lookup(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::registry::Registry`,
			`${packageAddress}::domain::Domain`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'registry',
				function: 'lookup',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function reverse_lookup(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [`${packageAddress}::registry::Registry`, 'address'] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'registry',
				function: 'reverse_lookup',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function assert_nft_is_authorized(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::registry::Registry`,
			`${packageAddress}::suins_registration::SuinsRegistration`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'registry',
				function: 'assert_nft_is_authorized',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function get_data(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::registry::Registry`,
			`${packageAddress}::domain::Domain`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'registry',
				function: 'get_data',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		_new,
		add_record_ignoring_grace_period,
		add_record,
		burn_registration_object,
		wrap_subdomain,
		burn_subdomain_object,
		add_leaf_record,
		remove_leaf_record,
		set_target_address,
		unset_reverse_lookup,
		set_reverse_lookup,
		set_expiration_timestamp_ms,
		set_data,
		has_record,
		lookup,
		reverse_lookup,
		assert_nft_is_authorized,
		get_data,
	};
}
