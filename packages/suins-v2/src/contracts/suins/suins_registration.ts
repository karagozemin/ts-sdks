// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments } from '../utils/index.js';
import type { RawTransactionArgument } from '../utils/index.js';
import * as object from './deps/sui/object.js';
import * as domain from './domain.js';
export function SuinsRegistration() {
	return bcs.struct('SuinsRegistration', {
		id: object.UID(),
		domain: domain.Domain(),
		domain_name: bcs.string(),
		expiration_timestamp_ms: bcs.u64(),
		image_url: bcs.string(),
	});
}
export function init(packageAddress: string) {
	function has_expired(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			`${packageAddress}::suins_registration::SuinsRegistration`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins_registration',
				function: 'has_expired',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function has_expired_past_grace_period(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			`${packageAddress}::suins_registration::SuinsRegistration`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins_registration',
				function: 'has_expired_past_grace_period',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function domain(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			`${packageAddress}::suins_registration::SuinsRegistration`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins_registration',
				function: 'domain',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function domain_name(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			`${packageAddress}::suins_registration::SuinsRegistration`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins_registration',
				function: 'domain_name',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function expiration_timestamp_ms(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			`${packageAddress}::suins_registration::SuinsRegistration`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins_registration',
				function: 'expiration_timestamp_ms',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function image_url(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			`${packageAddress}::suins_registration::SuinsRegistration`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins_registration',
				function: 'image_url',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function uid(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			`${packageAddress}::suins_registration::SuinsRegistration`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins_registration',
				function: 'uid',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function uid_mut(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			`${packageAddress}::suins_registration::SuinsRegistration`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'suins_registration',
				function: 'uid_mut',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		has_expired,
		has_expired_past_grace_period,
		domain,
		domain_name,
		expiration_timestamp_ms,
		image_url,
		uid,
		uid_mut,
	};
}
