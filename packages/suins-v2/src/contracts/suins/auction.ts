// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments } from '../utils/index.js';
import type { RawTransactionArgument } from '../utils/index.js';
import * as object from './deps/sui/object.js';
import * as balance from './deps/sui/balance.js';
import * as linked_table from './deps/sui/linked_table.js';
import * as domain from './domain.js';
import * as coin from './deps/sui/coin.js';
import * as suins_registration from './suins_registration.js';
export function App() {
	return bcs.struct('App', {
		dummy_field: bcs.bool(),
	});
}
export function AuctionHouse() {
	return bcs.struct('AuctionHouse', {
		id: object.UID(),
		balance: balance.Balance(),
		auctions: linked_table.LinkedTable(domain.Domain()),
	});
}
export function Auction() {
	return bcs.struct('Auction', {
		domain: domain.Domain(),
		start_timestamp_ms: bcs.u64(),
		end_timestamp_ms: bcs.u64(),
		winner: bcs.Address,
		current_bid: coin.Coin(),
		nft: suins_registration.SuinsRegistration(),
	});
}
export function AuctionStartedEvent() {
	return bcs.struct('AuctionStartedEvent', {
		domain: domain.Domain(),
		start_timestamp_ms: bcs.u64(),
		end_timestamp_ms: bcs.u64(),
		starting_bid: bcs.u64(),
		bidder: bcs.Address,
	});
}
export function AuctionFinalizedEvent() {
	return bcs.struct('AuctionFinalizedEvent', {
		domain: domain.Domain(),
		start_timestamp_ms: bcs.u64(),
		end_timestamp_ms: bcs.u64(),
		winning_bid: bcs.u64(),
		winner: bcs.Address,
	});
}
export function BidEvent() {
	return bcs.struct('BidEvent', {
		domain: domain.Domain(),
		bid: bcs.u64(),
		bidder: bcs.Address,
	});
}
export function AuctionExtendedEvent() {
	return bcs.struct('AuctionExtendedEvent', {
		domain: domain.Domain(),
		end_timestamp_ms: bcs.u64(),
	});
}
export function init(packageAddress: string) {
	function start_auction_and_place_bid(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddress}::auction::AuctionHouse`,
			`${packageAddress}::suins::SuiNS`,
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'auction',
				function: 'start_auction_and_place_bid',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function place_bid(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::auction::AuctionHouse`,
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'auction',
				function: 'place_bid',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function claim(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::auction::AuctionHouse`,
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'auction',
				function: 'claim',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function get_auction_metadata(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::auction::AuctionHouse`,
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'auction',
				function: 'get_auction_metadata',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function collect_winning_auction_fund(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::auction::AuctionHouse`,
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'auction',
				function: 'collect_winning_auction_fund',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function admin_withdraw_funds(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::AdminCap`,
			`${packageAddress}::auction::AuctionHouse`,
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'auction',
				function: 'admin_withdraw_funds',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function admin_finalize_auction(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::AdminCap`,
			`${packageAddress}::auction::AuctionHouse`,
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'auction',
				function: 'admin_finalize_auction',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function admin_try_finalize_auctions(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<number | bigint>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddress}::suins::AdminCap`,
			`${packageAddress}::auction::AuctionHouse`,
			'u64',
		] satisfies string[];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'auction',
				function: 'admin_try_finalize_auctions',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		start_auction_and_place_bid,
		place_bid,
		claim,
		get_auction_metadata,
		collect_winning_auction_fund,
		admin_withdraw_funds,
		admin_finalize_auction,
		admin_try_finalize_auctions,
	};
}
