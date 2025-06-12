// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import * as object from './object.js';
import * as balance from './balance.js';
import * as vec_map from './vec_map.js';
import * as vec_set from './vec_set.js';
import * as type_name from '../std/type_name.js';
export function Token() {
	return bcs.struct('Token', {
		id: object.UID(),
		balance: balance.Balance(),
	});
}
export function TokenPolicyCap() {
	return bcs.struct('TokenPolicyCap', {
		id: object.UID(),
		for: bcs.Address,
	});
}
export function TokenPolicy() {
	return bcs.struct('TokenPolicy', {
		id: object.UID(),
		spent_balance: balance.Balance(),
		rules: vec_map.VecMap(bcs.string(), vec_set.VecSet(type_name.TypeName())),
	});
}
export function ActionRequest() {
	return bcs.struct('ActionRequest', {
		name: bcs.string(),
		amount: bcs.u64(),
		sender: bcs.Address,
		recipient: bcs.option(bcs.Address),
		spent_balance: bcs.option(balance.Balance()),
		approvals: vec_set.VecSet(type_name.TypeName()),
	});
}
export function RuleKey() {
	return bcs.struct('RuleKey', {
		is_protected: bcs.bool(),
	});
}
export function TokenPolicyCreated() {
	return bcs.struct('TokenPolicyCreated', {
		id: bcs.Address,
		is_mutable: bcs.bool(),
	});
}
export function init(packageAddress: string) {
	function new_policy(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'new_policy',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function share_policy(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'share_policy',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function transfer(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['address'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'transfer',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function spend(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'spend',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function to_coin(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'to_coin',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function from_coin(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'from_coin',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function join(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
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
				module: 'token',
				function: 'split',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function zero(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
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
				module: 'token',
				function: 'destroy_zero',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function keep(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'keep',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function new_request(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<number | bigint>,
			RawTransactionArgument<string | null>,
			RawTransactionArgument<string | null>,
		];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
			'u64',
			'0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<address>',
			`0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<${packageAddress}::balance::Balance<${options.typeArguments[0]}>>`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'new_request',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function confirm_request(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'confirm_request',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function confirm_request_mut(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'confirm_request_mut',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function confirm_with_policy_cap(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'confirm_with_policy_cap',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function confirm_with_treasury_cap(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'confirm_with_treasury_cap',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function add_approval<T extends BcsType<any>, W extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<W>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[1]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'add_approval',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function add_rule_config<
		T extends BcsType<any>,
		Rule extends BcsType<any>,
		Config extends BcsType<any>,
	>(options: {
		arguments: [RawTransactionArgument<Rule>, RawTransactionArgument<Config>];
		typeArguments: [string, string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[1]}`, `${options.typeArguments[2]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'add_rule_config',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function rule_config<
		T extends BcsType<any>,
		Rule extends BcsType<any>,
		Config extends BcsType<any>,
	>(options: {
		arguments: [RawTransactionArgument<Rule>];
		typeArguments: [string, string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[1]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'rule_config',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function rule_config_mut<
		T extends BcsType<any>,
		Rule extends BcsType<any>,
		Config extends BcsType<any>,
	>(options: {
		arguments: [RawTransactionArgument<Rule>];
		typeArguments: [string, string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[1]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'rule_config_mut',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function remove_rule_config(options: { arguments: []; typeArguments: [string, string, string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'remove_rule_config',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function has_rule_config(options: { arguments: []; typeArguments: [string, string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'has_rule_config',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function has_rule_config_with_type(options: {
		arguments: [];
		typeArguments: [string, string, string];
	}) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'has_rule_config_with_type',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function allow(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'allow',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function disallow(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'disallow',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function add_rule_for_action(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'add_rule_for_action',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function remove_rule_for_action(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'remove_rule_for_action',
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
				module: 'token',
				function: 'mint',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function burn(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'burn',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function flush(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'flush',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function is_allowed(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'is_allowed',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function rules(options: {
		arguments: [RawTransactionArgument<string>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'rules',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function spent_balance(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'spent_balance',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function value(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'value',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function transfer_action(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'transfer_action',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function spend_action(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'spend_action',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function to_coin_action(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'to_coin_action',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function from_coin_action(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'from_coin_action',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function action(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'action',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function amount(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'amount',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function sender(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'sender',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function recipient(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'recipient',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function approvals(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'approvals',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function spent(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'token',
				function: 'spent',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	return {
		new_policy,
		share_policy,
		transfer,
		spend,
		to_coin,
		from_coin,
		join,
		split,
		zero,
		destroy_zero,
		keep,
		new_request,
		confirm_request,
		confirm_request_mut,
		confirm_with_policy_cap,
		confirm_with_treasury_cap,
		add_approval,
		add_rule_config,
		rule_config,
		rule_config_mut,
		remove_rule_config,
		has_rule_config,
		has_rule_config_with_type,
		allow,
		disallow,
		add_rule_for_action,
		remove_rule_for_action,
		mint,
		burn,
		flush,
		is_allowed,
		rules,
		spent_balance,
		value,
		transfer_action,
		spend_action,
		to_coin_action,
		from_coin_action,
		action,
		amount,
		sender,
		recipient,
		approvals,
		spent,
	};
}
