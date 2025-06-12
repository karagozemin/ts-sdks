// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import * as object from './object.js';
import * as balance from './balance.js';
export function Kiosk() {
	return bcs.struct('Kiosk', {
		id: object.UID(),
		profits: balance.Balance(),
		owner: bcs.Address,
		item_count: bcs.u32(),
		allow_extensions: bcs.bool(),
	});
}
export function KioskOwnerCap() {
	return bcs.struct('KioskOwnerCap', {
		id: object.UID(),
		for: bcs.Address,
	});
}
export function PurchaseCap() {
	return bcs.struct('PurchaseCap', {
		id: object.UID(),
		kiosk_id: bcs.Address,
		item_id: bcs.Address,
		min_price: bcs.u64(),
	});
}
export function Borrow() {
	return bcs.struct('Borrow', {
		kiosk_id: bcs.Address,
		item_id: bcs.Address,
	});
}
export function Item() {
	return bcs.struct('Item', {
		id: bcs.Address,
	});
}
export function Listing() {
	return bcs.struct('Listing', {
		id: bcs.Address,
		is_exclusive: bcs.bool(),
	});
}
export function Lock() {
	return bcs.struct('Lock', {
		id: bcs.Address,
	});
}
export function ItemListed() {
	return bcs.struct('ItemListed', {
		kiosk: bcs.Address,
		id: bcs.Address,
		price: bcs.u64(),
	});
}
export function ItemPurchased() {
	return bcs.struct('ItemPurchased', {
		kiosk: bcs.Address,
		id: bcs.Address,
		price: bcs.u64(),
	});
}
export function ItemDelisted() {
	return bcs.struct('ItemDelisted', {
		kiosk: bcs.Address,
		id: bcs.Address,
	});
}
export function init(packageAddress: string) {
	function _new(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'new',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function close_and_withdraw(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'close_and_withdraw',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_owner(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'set_owner',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_owner_custom(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = ['address'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'set_owner_custom',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function place<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<T>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'place',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function lock<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<T>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'lock',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function take(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'take',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function list(options: {
		arguments: [RawTransactionArgument<number | bigint>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'list',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function place_and_list<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<T>, RawTransactionArgument<number | bigint>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`, 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'place_and_list',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function delist(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'delist',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function purchase(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'purchase',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function list_with_purchase_cap(options: {
		arguments: [RawTransactionArgument<number | bigint>];
		typeArguments: [string];
	}) {
		const argumentsTypes = ['u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'list_with_purchase_cap',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function purchase_with_cap(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'purchase_with_cap',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function return_purchase_cap(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'return_purchase_cap',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function withdraw(options: { arguments: [RawTransactionArgument<number | bigint | null>] }) {
		const argumentsTypes = [
			'0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'withdraw',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function has_item(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'has_item',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function has_item_with_type(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'has_item_with_type',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function is_locked(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'is_locked',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function is_listed(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'is_listed',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function is_listed_exclusively(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'is_listed_exclusively',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function has_access(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'has_access',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function uid_mut_as_owner(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'uid_mut_as_owner',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_allow_extensions(options: { arguments: [RawTransactionArgument<boolean>] }) {
		const argumentsTypes = ['bool'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'set_allow_extensions',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function uid(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'uid',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function uid_mut(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'uid_mut',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function owner(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'owner',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function item_count(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'item_count',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function profits_amount(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'profits_amount',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function profits_mut(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'profits_mut',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function borrow(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'borrow',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function borrow_mut(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'borrow_mut',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function borrow_val(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'borrow_val',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function return_val<T extends BcsType<any>>(options: {
		arguments: [RawTransactionArgument<T>];
		typeArguments: [string];
	}) {
		const argumentsTypes = [`${options.typeArguments[0]}`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'return_val',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function kiosk_owner_cap_for(options: { arguments: [] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'kiosk_owner_cap_for',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function purchase_cap_kiosk(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'purchase_cap_kiosk',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function purchase_cap_item(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'purchase_cap_item',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	function purchase_cap_min_price(options: { arguments: []; typeArguments: [string] }) {
		const argumentsTypes = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'kiosk',
				function: 'purchase_cap_min_price',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
				typeArguments: options.typeArguments,
			});
	}
	return {
		_new,
		close_and_withdraw,
		set_owner,
		set_owner_custom,
		place,
		lock,
		take,
		list,
		place_and_list,
		delist,
		purchase,
		list_with_purchase_cap,
		purchase_with_cap,
		return_purchase_cap,
		withdraw,
		has_item,
		has_item_with_type,
		is_locked,
		is_listed,
		is_listed_exclusively,
		has_access,
		uid_mut_as_owner,
		set_allow_extensions,
		uid,
		uid_mut,
		owner,
		item_count,
		profits_amount,
		profits_mut,
		borrow,
		borrow_mut,
		borrow_val,
		return_val,
		kiosk_owner_cap_for,
		purchase_cap_kiosk,
		purchase_cap_item,
		purchase_cap_min_price,
	};
}
