// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import * as object from './object.js';
export function Publisher() {
	return bcs.struct('Publisher', {
		id: object.UID(),
		package: bcs.string(),
		module_name: bcs.string(),
	});
}
export function UpgradeCap() {
	return bcs.struct('UpgradeCap', {
		id: object.UID(),
		package: bcs.Address,
		version: bcs.u64(),
		policy: bcs.u8(),
	});
}
export function UpgradeTicket() {
	return bcs.struct('UpgradeTicket', {
		cap: bcs.Address,
		package: bcs.Address,
		policy: bcs.u8(),
		digest: bcs.vector(bcs.u8()),
	});
}
export function UpgradeReceipt() {
	return bcs.struct('UpgradeReceipt', {
		cap: bcs.Address,
		package: bcs.Address,
	});
}
export function init(packageAddress: string) {
	function claim<OTW extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<OTW>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'claim',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function claim_and_keep<OTW extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<OTW>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'claim_and_keep',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function burn_publisher(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'burn_publisher',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function from_package(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'from_package',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function from_module(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'from_module',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function published_module(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'published_module',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function published_package(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'published_package',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function upgrade_package(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'upgrade_package',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function version(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'version',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function upgrade_policy(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'upgrade_policy',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function ticket_package(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'ticket_package',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function ticket_policy(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'ticket_policy',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function receipt_cap(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'receipt_cap',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function receipt_package(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'receipt_package',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function ticket_digest(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'ticket_digest',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function compatible_policy(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'compatible_policy',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function additive_policy(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'additive_policy',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function dep_only_policy(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'dep_only_policy',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function only_additive_upgrades(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'only_additive_upgrades',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function only_dep_upgrades(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'only_dep_upgrades',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function make_immutable(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'make_immutable',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function authorize_upgrade(options: {
		arguments: [RawTransactionArgument<number>, RawTransactionArgument<number[]>];
	}) {
		const argumentsTypes = ['u8', 'vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'authorize_upgrade',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function commit_upgrade(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'package',
				function: 'commit_upgrade',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		claim,
		claim_and_keep,
		burn_publisher,
		from_package,
		from_module,
		published_module,
		published_package,
		upgrade_package,
		version,
		upgrade_policy,
		ticket_package,
		ticket_policy,
		receipt_cap,
		receipt_package,
		ticket_digest,
		compatible_policy,
		additive_policy,
		dep_only_policy,
		only_additive_upgrades,
		only_dep_upgrades,
		make_immutable,
		authorize_upgrade,
		commit_upgrade,
	};
}
