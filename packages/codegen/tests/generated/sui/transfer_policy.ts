// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import * as vec_set from './vec_set.js';
import * as type_name from '../std/type_name.js';
import * as object from './object.js';
import * as balance from './balance.js';
export function TransferRequest() {
	return bcs.struct('TransferRequest', {
		item: bcs.Address,
		paid: bcs.u64(),
		from: bcs.Address,
		receipts: vec_set.VecSet(type_name.TypeName()),
	});
}
export function TransferPolicy() {
	return bcs.struct('TransferPolicy', {
		id: object.UID(),
		balance: balance.Balance(),
		rules: vec_set.VecSet(type_name.TypeName()),
	});
}
export function TransferPolicyCap() {
	return bcs.struct('TransferPolicyCap', {
		id: object.UID(),
		policy_id: bcs.Address,
	});
}
export function TransferPolicyCreated() {
	return bcs.struct('TransferPolicyCreated', {
		id: bcs.Address,
	});
}
export function TransferPolicyDestroyed() {
	return bcs.struct('TransferPolicyDestroyed', {
		id: bcs.Address,
	});
}
export function RuleKey() {
	return bcs.struct('RuleKey', {
		dummy_field: bcs.bool(),
	});
}
export function init(packageAddress: string) {
	function new_request(options: {
		arguments: [RawTransactionArgument<number | bigint>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer_policy',
				function: 'new_request',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function _new(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer_policy',
				function: 'new',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function withdraw(options: {
		arguments: [RawTransactionArgument<number | bigint | null>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			'0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer_policy',
				function: 'withdraw',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function destroy_and_withdraw(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer_policy',
				function: 'destroy_and_withdraw',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function confirm_request(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer_policy',
				function: 'confirm_request',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function add_rule<
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
				module: 'transfer_policy',
				function: 'add_rule',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function get_rule<
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
				module: 'transfer_policy',
				function: 'get_rule',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function add_to_balance<T extends BcsType<any>, Rule extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Rule>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[1]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer_policy',
				function: 'add_to_balance',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function add_receipt<T extends BcsType<any>, Rule extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<Rule>];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [`${options.typeArguments[1]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer_policy',
				function: 'add_receipt',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function has_rule(options: { arguments: []; typeArguments: [string, string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer_policy',
				function: 'has_rule',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function remove_rule(options: { arguments: []; typeArguments: [string, string, string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer_policy',
				function: 'remove_rule',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function uid(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer_policy',
				function: 'uid',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function uid_mut_as_owner(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer_policy',
				function: 'uid_mut_as_owner',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function rules(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer_policy',
				function: 'rules',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function item(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer_policy',
				function: 'item',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function paid(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer_policy',
				function: 'paid',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function _from(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'transfer_policy',
				function: 'from',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	return {
		new_request,
		_new,
		withdraw,
		destroy_and_withdraw,
		confirm_request,
		add_rule,
		get_rule,
		add_to_balance,
		add_receipt,
		has_rule,
		remove_rule,
		uid,
		uid_mut_as_owner,
		rules,
		item,
		paid,
		_from,
	};
}
