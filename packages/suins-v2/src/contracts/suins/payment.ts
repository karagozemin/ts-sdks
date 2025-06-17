// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { BcsType } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments } from '../utils/index.js';
import type { RawTransactionArgument } from '../utils/index.js';
import * as domain from './domain.js';
import * as vec_map from './deps/sui/vec_map.js';
import * as type_name from './deps/std/type_name.js';
export function RequestData() {
	return bcs.struct('RequestData', {
		version: bcs.u8(),
		domain: domain.Domain(),
		years: bcs.u8(),
		base_amount: bcs.u64(),
		discounts_applied: vec_map.VecMap(bcs.string(), bcs.u64()),
		metadata: vec_map.VecMap(bcs.string(), bcs.string()),
	});
}
export function TransactionEvent() {
	return bcs.struct('TransactionEvent', {
		app: type_name.TypeName(),
		domain: domain.Domain(),
		years: bcs.u8(),
		request_data_version: bcs.u8(),
		base_amount: bcs.u64(),
		discounts_applied: vec_map.VecMap(bcs.string(), bcs.u64()),
		metadata: vec_map.VecMap(bcs.string(), bcs.string()),
		is_renewal: bcs.bool(),
		currency: type_name.TypeName(),
		currency_amount: bcs.u64(),
	});
}
export function PaymentIntent() {
	return bcs.enum('PaymentIntent', {
		Registration: RequestData(),
		Renewal: RequestData(),
	});
}
export function Receipt() {
	return bcs.enum('Receipt', {
		Registration: bcs.tuple([domain.Domain(), bcs.u8(), bcs.u8()]),
		Renewal: bcs.tuple([domain.Domain(), bcs.u8(), bcs.u8()]),
	});
}
export function init(packageAddress: string) {
	function apply_percentage_discount<A extends BcsType<any>>(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<A>,
			RawTransactionArgument<string>,
			RawTransactionArgument<number>,
			RawTransactionArgument<boolean>,
		];
		typeArguments: [string];
	}) {
		const argumentsTypes = [
			`${packageAddress}::payment::PaymentIntent`,
			`${packageAddress}::suins::SuiNS`,
			`${options.typeArguments[0]}`,
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
			'u8',
			'bool',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'payment',
				function: 'apply_percentage_discount',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function finalize_payment<A extends BcsType<any>>(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<A>,
		];
		typeArguments: [string, string];
	}) {
		const argumentsTypes = [
			`${packageAddress}::payment::PaymentIntent`,
			`${packageAddress}::suins::SuiNS`,
			`${options.typeArguments[0]}`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'payment',
				function: 'finalize_payment',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function init_registration(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::SuiNS`,
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'payment',
				function: 'init_registration',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function init_renewal(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<number>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::SuiNS`,
			`${packageAddress}::suins_registration::SuinsRegistration`,
			'u8',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'payment',
				function: 'init_renewal',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function register(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::payment::Receipt`,
			`${packageAddress}::suins::SuiNS`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'payment',
				function: 'register',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function renew(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddress}::payment::Receipt`,
			`${packageAddress}::suins::SuiNS`,
			`${packageAddress}::suins_registration::SuinsRegistration`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'payment',
				function: 'renew',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function request_data(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::payment::PaymentIntent`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'payment',
				function: 'request_data',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function years(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::payment::RequestData`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'payment',
				function: 'years',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function base_amount(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::payment::RequestData`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'payment',
				function: 'base_amount',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function domain(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::payment::RequestData`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'payment',
				function: 'domain',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function discount_applied(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::payment::RequestData`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'payment',
				function: 'discount_applied',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function discounts_applied(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::payment::RequestData`] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'payment',
				function: 'discounts_applied',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function calculate_total_after_discount(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number>];
	}) {
		const argumentsTypes = [`${packageAddress}::payment::RequestData`, 'u8'] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'payment',
				function: 'calculate_total_after_discount',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		apply_percentage_discount,
		finalize_payment,
		init_registration,
		init_renewal,
		register,
		renew,
		request_data,
		years,
		base_amount,
		domain,
		discount_applied,
		discounts_applied,
		calculate_total_after_discount,
	};
}
