// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import type { Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments } from '../utils/index.js';
export function init(packageAddress: string) {
	function sui_tld(options: { arguments: [] }) {
		const argumentsTypes = [] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'constants',
				function: 'sui_tld',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function default_image(options: { arguments: [] }) {
		const argumentsTypes = [] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'constants',
				function: 'default_image',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function mist_per_sui(options: { arguments: [] }) {
		const argumentsTypes = [] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'constants',
				function: 'mist_per_sui',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function min_domain_length(options: { arguments: [] }) {
		const argumentsTypes = [] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'constants',
				function: 'min_domain_length',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function max_domain_length(options: { arguments: [] }) {
		const argumentsTypes = [] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'constants',
				function: 'max_domain_length',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function max_bps(options: { arguments: [] }) {
		const argumentsTypes = [] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'constants',
				function: 'max_bps',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function year_ms(options: { arguments: [] }) {
		const argumentsTypes = [] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'constants',
				function: 'year_ms',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function grace_period_ms(options: { arguments: [] }) {
		const argumentsTypes = [] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'constants',
				function: 'grace_period_ms',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function subdomain_allow_creation_key(options: { arguments: [] }) {
		const argumentsTypes = [] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'constants',
				function: 'subdomain_allow_creation_key',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function subdomain_allow_extension_key(options: { arguments: [] }) {
		const argumentsTypes = [] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'constants',
				function: 'subdomain_allow_extension_key',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function leaf_expiration_timestamp(options: { arguments: [] }) {
		const argumentsTypes = [] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'constants',
				function: 'leaf_expiration_timestamp',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		sui_tld,
		default_image,
		mist_per_sui,
		min_domain_length,
		max_domain_length,
		max_bps,
		year_ms,
		grace_period_ms,
		subdomain_allow_creation_key,
		subdomain_allow_extension_key,
		leaf_expiration_timestamp,
	};
}
