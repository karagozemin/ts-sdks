// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import * as object from './object.js';
import * as balance from './balance.js';
import * as url from './url.js';
export function Coin() {
	return bcs.struct('Coin', {
		id: object.UID(),
		balance: balance.Balance(),
	});
}
export function CoinMetadata() {
	return bcs.struct('CoinMetadata', {
		id: object.UID(),
		decimals: bcs.u8(),
		name: bcs.string(),
		symbol: bcs.string(),
		description: bcs.string(),
		icon_url: bcs.option(url.Url()),
	});
}
export function RegulatedCoinMetadata() {
	return bcs.struct('RegulatedCoinMetadata', {
		id: object.UID(),
		coin_metadata_object: bcs.Address,
		deny_cap_object: bcs.Address,
	});
}
export function TreasuryCap() {
	return bcs.struct('TreasuryCap', {
		id: object.UID(),
		total_supply: balance.Supply(),
	});
}
export function DenyCapV2() {
	return bcs.struct('DenyCapV2', {
		id: object.UID(),
		allow_global_pause: bcs.bool(),
	});
}
export function CurrencyCreated() {
	return bcs.struct('CurrencyCreated', {
		decimals: bcs.u8(),
	});
}
export function DenyCap() {
	return bcs.struct('DenyCap', {
		id: object.UID(),
	});
}
export function init(packageAddress: string) {
	function total_supply(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'total_supply',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function treasury_into_supply(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'treasury_into_supply',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function supply_immut(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'supply_immut',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function supply_mut(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'supply_mut',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function value(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'value',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function balance(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'balance',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function balance_mut(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'balance_mut',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function from_balance(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'from_balance',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function into_balance(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'into_balance',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function take(options: {
		arguments: [RawTransactionArgument<number | bigint>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'take',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function put(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'put',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function join(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'join',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function split(options: {
		arguments: [RawTransactionArgument<number | bigint>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'split',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function divide_into_n(options: {
		arguments: [RawTransactionArgument<number | bigint>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'divide_into_n',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function zero(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'zero',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function destroy_zero(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'destroy_zero',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function create_currency<T extends BcsType<any>>(options: {
		arguments: [
			RawTransactionArgument<T>,
			RawTransactionArgument<number>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<string | null>,
		];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`${options.typeArguments[0]}`,
			'u8',
			'vector<u8>',
			'vector<u8>',
			'vector<u8>',
			`0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<${packageAddress}::url::Url>`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'create_currency',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function create_regulated_currency_v2<T extends BcsType<any>>(options: {
		arguments: [
			RawTransactionArgument<T>,
			RawTransactionArgument<number>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<string | null>,
			RawTransactionArgument<boolean>,
		];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`${options.typeArguments[0]}`,
			'u8',
			'vector<u8>',
			'vector<u8>',
			'vector<u8>',
			`0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<${packageAddress}::url::Url>`,
			'bool',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'create_regulated_currency_v2',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function migrate_regulated_currency_to_v2(options: {
		arguments: [RawTransactionArgument<boolean>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['bool'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'migrate_regulated_currency_to_v2',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function mint(options: {
		arguments: [RawTransactionArgument<number | bigint>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'mint',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function mint_balance(options: {
		arguments: [RawTransactionArgument<number | bigint>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'mint_balance',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function burn(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'burn',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function deny_list_v2_add(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['address'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'deny_list_v2_add',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function deny_list_v2_remove(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['address'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'deny_list_v2_remove',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function deny_list_v2_contains_current_epoch(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['address'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'deny_list_v2_contains_current_epoch',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function deny_list_v2_contains_next_epoch(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['address'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'deny_list_v2_contains_next_epoch',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function deny_list_v2_enable_global_pause(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'deny_list_v2_enable_global_pause',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function deny_list_v2_disable_global_pause(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'deny_list_v2_disable_global_pause',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function deny_list_v2_is_global_pause_enabled_current_epoch(options: {
		arguments: [];
		typeArguments: [string];
	}) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'deny_list_v2_is_global_pause_enabled_current_epoch',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function deny_list_v2_is_global_pause_enabled_next_epoch(options: {
		arguments: [];
		typeArguments: [string];
	}) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'deny_list_v2_is_global_pause_enabled_next_epoch',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function mint_and_transfer(options: {
		arguments: [RawTransactionArgument<number | bigint>, RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['u64', 'address'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'mint_and_transfer',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function update_name(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'update_name',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function update_symbol(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			'0x0000000000000000000000000000000000000000000000000000000000000001::ascii::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'update_symbol',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function update_description(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'update_description',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function update_icon_url(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			'0x0000000000000000000000000000000000000000000000000000000000000001::ascii::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'update_icon_url',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function get_decimals(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'get_decimals',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function get_name(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'get_name',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function get_symbol(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'get_symbol',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function get_description(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'get_description',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function get_icon_url(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'get_icon_url',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function supply(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'supply',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function create_regulated_currency<T extends BcsType<any>>(options: {
		arguments: [
			RawTransactionArgument<T>,
			RawTransactionArgument<number>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<string | null>,
		];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`${options.typeArguments[0]}`,
			'u8',
			'vector<u8>',
			'vector<u8>',
			'vector<u8>',
			`0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<${packageAddress}::url::Url>`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'create_regulated_currency',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function deny_list_add(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['address'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'deny_list_add',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function deny_list_remove(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['address'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'deny_list_remove',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function deny_list_contains(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['address'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'coin',
				function: 'deny_list_contains',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	return {
		total_supply,
		treasury_into_supply,
		supply_immut,
		supply_mut,
		value,
		balance,
		balance_mut,
		from_balance,
		into_balance,
		take,
		put,
		join,
		split,
		divide_into_n,
		zero,
		destroy_zero,
		create_currency,
		create_regulated_currency_v2,
		migrate_regulated_currency_to_v2,
		mint,
		mint_balance,
		burn,
		deny_list_v2_add,
		deny_list_v2_remove,
		deny_list_v2_contains_current_epoch,
		deny_list_v2_contains_next_epoch,
		deny_list_v2_enable_global_pause,
		deny_list_v2_disable_global_pause,
		deny_list_v2_is_global_pause_enabled_current_epoch,
		deny_list_v2_is_global_pause_enabled_next_epoch,
		mint_and_transfer,
		update_name,
		update_symbol,
		update_description,
		update_icon_url,
		get_decimals,
		get_name,
		get_symbol,
		get_description,
		get_icon_url,
		supply,
		create_regulated_currency,
		deny_list_add,
		deny_list_remove,
		deny_list_contains,
	};
}
