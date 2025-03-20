// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { coinWithBalance } from '@mysten/sui/transactions';
import type { Transaction } from '@mysten/sui/transactions';
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui/utils';

import { OrderType, SelfMatchingOptions } from '../types/index.js';
import type {
	CreatePermissionlessPoolParams,
	PlaceLimitOrderParams,
	PlaceMarketOrderParams,
	SwapParams,
} from '../types/index.js';
import type { DeepBookConfig } from '../utils/config.js';
import { DEEP_SCALAR, GAS_BUDGET, MAX_TIMESTAMP, POOL_CREATION_FEE } from '../utils/config.js';
import { MAINNET_DEEP_TYPE } from '../utils/constants.js';

/**
 * DeepBookContract class for managing DeepBook operations.
 */
export class DeepBookContract {
	#config: DeepBookConfig;

	/**
	 * @param {DeepBookConfig} config Configuration for DeepBookContract
	 */
	constructor(config: DeepBookConfig) {
		this.#config = config;
	}

	/**
	 * @description Place a limit order
	 * @param {PlaceLimitOrderParams} params Parameters for placing a limit order
	 * @returns A function that takes a Transaction object
	 */
	placeLimitOrder = (params: PlaceLimitOrderParams) => (tx: Transaction) => {
		const {
			poolAddress,
			baseCoinType,
			quoteCoinType,
			balanceManagerAddress,
			clientOrderId,
			price,
			quantity,
			isBid,
			expiration = MAX_TIMESTAMP,
			orderType = OrderType.NO_RESTRICTION,
			selfMatchingOption = SelfMatchingOptions.SELF_MATCHING_ALLOWED,
			payWithDeep = true,
		} = params;

		tx.setGasBudgetIfNotSet(GAS_BUDGET);
		const tradeProof = tx.add(this.#config.balanceManager.generateProof(balanceManagerAddress));

		tx.moveCall({
			target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::place_limit_order`,
			arguments: [
				tx.object(poolAddress),
				tx.object(balanceManagerAddress),
				tradeProof,
				tx.pure.u64(clientOrderId),
				tx.pure.u8(orderType),
				tx.pure.u8(selfMatchingOption),
				tx.pure.u64(price),
				tx.pure.u64(quantity),
				tx.pure.bool(isBid),
				tx.pure.bool(payWithDeep),
				tx.pure.u64(expiration),
				tx.object(SUI_CLOCK_OBJECT_ID),
			],
			typeArguments: [baseCoinType, quoteCoinType],
		});
	};

	/**
	 * @description Place a market order
	 * @param {PlaceMarketOrderParams} params Parameters for placing a market order
	 * @returns A function that takes a Transaction object
	 */
	placeMarketOrder = (params: PlaceMarketOrderParams) => (tx: Transaction) => {
		const {
			poolAddress,
			baseCoinType,
			quoteCoinType,
			balanceManagerAddress,
			clientOrderId,
			quantity,
			isBid,
			selfMatchingOption = SelfMatchingOptions.SELF_MATCHING_ALLOWED,
			payWithDeep = true,
		} = params;

		tx.setGasBudgetIfNotSet(GAS_BUDGET);
		const tradeProof = tx.add(this.#config.balanceManager.generateProof(balanceManagerAddress));

		tx.moveCall({
			target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::place_market_order`,
			arguments: [
				tx.object(poolAddress),
				tx.object(balanceManagerAddress),
				tradeProof,
				tx.pure.u64(clientOrderId),
				tx.pure.u8(selfMatchingOption),
				tx.pure.u64(quantity),
				tx.pure.bool(isBid),
				tx.pure.bool(payWithDeep),
				tx.object(SUI_CLOCK_OBJECT_ID),
			],
			typeArguments: [baseCoinType, quoteCoinType],
		});
	};

	/**
	 * @description Modify an existing order
	 * @param {string} poolAddress The address of the pool
	 * @param {string} balanceManagerAddress The balance manager address
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @param {string} orderId Order ID to modify
	 * @param {number} newQuantity New quantity for the order
	 * @returns A function that takes a Transaction object
	 */
	modifyOrder =
		(
			poolAddress: string,
			balanceManagerAddress: string,
			baseCoinType: string,
			quoteCoinType: string,
			orderId: string,
			newQuantity: number,
		) =>
		(tx: Transaction) => {
			const tradeProof = tx.add(this.#config.balanceManager.generateProof(balanceManagerAddress));

			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::modify_order`,
				arguments: [
					tx.object(poolAddress),
					tx.object(balanceManagerAddress),
					tradeProof,
					tx.pure.u128(orderId),
					tx.pure.u64(newQuantity),
					tx.object(SUI_CLOCK_OBJECT_ID),
				],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Cancel an existing order
	 * @param {string} poolAddress The address of the pool
	 * @param {string} balanceManagerAddress The balance manager address
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @param {string} orderId Order ID to cancel
	 * @returns A function that takes a Transaction object
	 */
	cancelOrder =
		(
			poolAddress: string,
			balanceManagerAddress: string,
			baseCoinType: string,
			quoteCoinType: string,
			orderId: string,
		) =>
		(tx: Transaction) => {
			tx.setGasBudgetIfNotSet(GAS_BUDGET);
			const tradeProof = tx.add(this.#config.balanceManager.generateProof(balanceManagerAddress));

			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::cancel_order`,
				arguments: [
					tx.object(poolAddress),
					tx.object(balanceManagerAddress),
					tradeProof,
					tx.pure.u128(orderId),
					tx.object(SUI_CLOCK_OBJECT_ID),
				],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Cancel all open orders for a balance manager
	 * @param {string} poolAddress The address of the pool
	 * @param {string} balanceManagerAddress The balance manager address
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @returns A function that takes a Transaction object
	 */
	cancelAllOrders =
		(
			poolAddress: string,
			balanceManagerAddress: string,
			baseCoinType: string,
			quoteCoinType: string,
		) =>
		(tx: Transaction) => {
			tx.setGasBudgetIfNotSet(GAS_BUDGET);
			const tradeProof = tx.add(this.#config.balanceManager.generateProof(balanceManagerAddress));

			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::cancel_all_orders`,
				arguments: [
					tx.object(poolAddress),
					tx.object(balanceManagerAddress),
					tradeProof,
					tx.object(SUI_CLOCK_OBJECT_ID),
				],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Withdraw settled amounts for a balance manager
	 * @param {string} poolAddress The address of the pool
	 * @param {string} balanceManagerAddress The balance manager address
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @returns A function that takes a Transaction object
	 */
	withdrawSettledAmounts =
		(
			poolAddress: string,
			balanceManagerAddress: string,
			baseCoinType: string,
			quoteCoinType: string,
		) =>
		(tx: Transaction) => {
			const tradeProof = tx.add(this.#config.balanceManager.generateProof(balanceManagerAddress));

			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::withdraw_settled_amounts`,
				arguments: [tx.object(poolAddress), tx.object(balanceManagerAddress), tradeProof],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Add a deep price point for a target pool using a reference pool
	 * @param {string} targetPoolAddress The address of the target pool
	 * @param {string} targetBaseType The type of the base asset for the target pool
	 * @param {string} targetQuoteType The type of the quote asset for the target pool
	 * @param {string} referencePoolAddress The address of the reference pool
	 * @param {string} referenceBaseType The type of the base asset for the reference pool
	 * @param {string} referenceQuoteType The type of the quote asset for the reference pool
	 * @returns A function that takes a Transaction object
	 */
	addDeepPricePoint =
		(
			targetPoolAddress: string,
			targetBaseType: string,
			targetQuoteType: string,
			referencePoolAddress: string,
			referenceBaseType: string,
			referenceQuoteType: string,
		) =>
		(tx: Transaction) => {
			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::add_deep_price_point`,
				arguments: [
					tx.object(targetPoolAddress),
					tx.object(referencePoolAddress),
					tx.object(SUI_CLOCK_OBJECT_ID),
				],
				typeArguments: [targetBaseType, targetQuoteType, referenceBaseType, referenceQuoteType],
			});
		};

	/**
	 * @description Claim rebates for a balance manager
	 * @param {string} poolAddress The address of the pool
	 * @param {string} balanceManagerAddress The balance manager address
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @returns A function that takes a Transaction object
	 */
	claimRebates =
		(
			poolAddress: string,
			balanceManagerAddress: string,
			baseCoinType: string,
			quoteCoinType: string,
		) =>
		(tx: Transaction) => {
			const tradeProof = tx.add(this.#config.balanceManager.generateProof(balanceManagerAddress));

			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::claim_rebates`,
				arguments: [tx.object(poolAddress), tx.object(balanceManagerAddress), tradeProof],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Gets an order
	 * @param {string} poolAddress The address of the pool
	 * @param {string} orderId Order ID to get
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @returns A function that takes a Transaction object
	 */
	getOrder =
		(poolAddress: string, orderId: string, baseCoinType: string, quoteCoinType: string) =>
		(tx: Transaction) => {
			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::get_order`,
				arguments: [tx.object(poolAddress), tx.pure.u128(orderId)],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Prepares a transaction to retrieve multiple orders from a specified pool.
	 * @param {string} poolAddress The address of the pool
	 * @param {string[]} orderIds - Array of order IDs to retrieve
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @returns {Function} A function that takes a Transaction object
	 */
	getOrders =
		(poolAddress: string, orderIds: string[], baseCoinType: string, quoteCoinType: string) =>
		(tx: Transaction) => {
			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::get_orders`,
				arguments: [tx.object(poolAddress), tx.pure.vector('u128', orderIds)],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Burn DEEP tokens from the pool
	 * @param {string} poolAddress The address of the pool
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @returns A function that takes a Transaction object
	 */
	burnDeep =
		(poolAddress: string, baseCoinType: string, quoteCoinType: string) => (tx: Transaction) => {
			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::burn_deep`,
				arguments: [tx.object(poolAddress), tx.object(this.#config.DEEP_TREASURY_ID)],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Get the mid price for a pool
	 * @param {string} poolAddress The address of the pool
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @returns A function that takes a Transaction object
	 */
	midPrice =
		(poolAddress: string, baseCoinType: string, quoteCoinType: string) => (tx: Transaction) => {
			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::mid_price`,
				arguments: [tx.object(poolAddress), tx.object(SUI_CLOCK_OBJECT_ID)],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Check if a pool is whitelisted
	 * @param {string} poolAddress The address of the pool
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @returns A function that takes a Transaction object
	 */
	whitelisted =
		(poolAddress: string, baseCoinType: string, quoteCoinType: string) => (tx: Transaction) => {
			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::whitelisted`,
				arguments: [tx.object(poolAddress)],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Get the quote quantity out for a given base quantity in
	 * @param {string} poolAddress The address of the pool
	 * @param {number} baseQuantity Base quantity to convert
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @returns A function that takes a Transaction object
	 */
	getQuoteQuantityOut =
		(poolAddress: string, baseQuantity: number, baseCoinType: string, quoteCoinType: string) =>
		(tx: Transaction) => {
			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::get_quote_quantity_out`,
				arguments: [
					tx.object(poolAddress),
					tx.pure.u64(baseQuantity),
					tx.object(SUI_CLOCK_OBJECT_ID),
				],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Get the base quantity out for a given quote quantity in
	 * @param {string} poolAddress The address of the pool
	 * @param {number} quoteQuantity Quote quantity to convert
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @returns A function that takes a Transaction object
	 */
	getBaseQuantityOut =
		(poolAddress: string, quoteQuantity: number, baseCoinType: string, quoteCoinType: string) =>
		(tx: Transaction) => {
			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::get_base_quantity_out`,
				arguments: [
					tx.object(poolAddress),
					tx.pure.u64(quoteQuantity),
					tx.object(SUI_CLOCK_OBJECT_ID),
				],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Get the quantity out for a given base or quote quantity
	 * @param {string} poolAddress The address of the pool
	 * @param {number} baseQuantity Base quantity to convert
	 * @param {number} quoteQuantity Quote quantity to convert
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @returns A function that takes a Transaction object
	 */
	getQuantityOut =
		(
			poolAddress: string,
			baseQuantity: number,
			quoteQuantity: number,
			baseCoinType: string,
			quoteCoinType: string,
		) =>
		(tx: Transaction) => {
			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::get_quantity_out`,
				arguments: [
					tx.object(poolAddress),
					tx.pure.u64(baseQuantity),
					tx.pure.u64(quoteQuantity),
					tx.object(SUI_CLOCK_OBJECT_ID),
				],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Get open orders for a balance manager in a pool
	 * @param {string} poolAddress The address of the pool
	 * @param {string} managerAddress The address of the balance manager
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @returns A function that takes a Transaction object
	 */
	accountOpenOrders =
		(poolAddress: string, managerAddress: string, baseCoinType: string, quoteCoinType: string) =>
		(tx: Transaction) => {
			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::account_open_orders`,
				arguments: [tx.object(poolAddress), tx.object(managerAddress)],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Get level 2 order book specifying range of price
	 * @param {string} poolAddress The address of the pool
	 * @param {number} priceLow Lower bound of the price range
	 * @param {number} priceHigh Upper bound of the price range
	 * @param {boolean} isBid Whether to get bid or ask orders
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @returns A function that takes a Transaction object
	 */
	getLevel2Range =
		(
			poolAddress: string,
			priceLow: number,
			priceHigh: number,
			isBid: boolean,
			baseCoinType: string,
			quoteCoinType: string,
		) =>
		(tx: Transaction) => {
			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::get_level2_range`,
				arguments: [
					tx.object(poolAddress),
					tx.pure.u64(priceLow),
					tx.pure.u64(priceHigh),
					tx.pure.bool(isBid),
					tx.object(SUI_CLOCK_OBJECT_ID),
				],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Get level 2 order book ticks from mid-price for a pool
	 * @param {string} poolAddress The address of the pool
	 * @param {number} tickFromMid Number of ticks from mid-price
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @returns A function that takes a Transaction object
	 */
	getLevel2TicksFromMid =
		(poolAddress: string, tickFromMid: number, baseCoinType: string, quoteCoinType: string) =>
		(tx: Transaction) => {
			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::get_level2_ticks_from_mid`,
				arguments: [
					tx.object(poolAddress),
					tx.pure.u64(tickFromMid),
					tx.object(SUI_CLOCK_OBJECT_ID),
				],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Get the vault balances for a pool
	 * @param {string} poolAddress The address of the pool
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @returns A function that takes a Transaction object
	 */
	vaultBalances =
		(poolAddress: string, baseCoinType: string, quoteCoinType: string) => (tx: Transaction) => {
			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::vault_balances`,
				arguments: [tx.object(poolAddress)],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Get the pool ID by asset types
	 * @param {string} baseCoinType Type of the base asset
	 * @param {string} quoteCoinType Type of the quote asset
	 * @returns A function that takes a Transaction object
	 */
	getPoolIdByAssets = (baseCoinType: string, quoteCoinType: string) => (tx: Transaction) => {
		tx.moveCall({
			target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::get_pool_id_by_asset`,
			arguments: [tx.object(this.#config.REGISTRY_ID)],
			typeArguments: [baseCoinType, quoteCoinType],
		});
	};

	/**
	 * @description Swap exact base amount for quote amount
	 * @param {SwapParams} params Parameters for the swap
	 * @returns A function that takes a Transaction object
	 */
	swapExactBaseForQuote = (params: SwapParams) => (tx: Transaction) => {
		tx.setGasBudgetIfNotSet(GAS_BUDGET);
		tx.setSenderIfNotSet(this.#config.address);

		if (params.quoteCoin) {
			throw new Error('quoteCoin is not accepted for swapping base asset');
		}
		const {
			poolAddress,
			amount: baseAmount,
			deepAmount,
			minOut: minQuote,
			baseCoinType,
			quoteCoinType,
		} = params;

		const deepCoinType = MAINNET_DEEP_TYPE;

		const baseCoinInput =
			params.baseCoin ?? coinWithBalance({ type: baseCoinType, balance: baseAmount });

		const deepCoin =
			params.deepCoin ??
			coinWithBalance({ type: deepCoinType, balance: Math.round(deepAmount * DEEP_SCALAR) });

		const [baseCoinResult, quoteCoinResult, deepCoinResult] = tx.moveCall({
			target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::swap_exact_base_for_quote`,
			arguments: [
				tx.object(poolAddress),
				baseCoinInput,
				deepCoin,
				tx.pure.u64(minQuote),
				tx.object(SUI_CLOCK_OBJECT_ID),
			],
			typeArguments: [baseCoinType, quoteCoinType],
		});

		return [baseCoinResult, quoteCoinResult, deepCoinResult] as const;
	};

	/**
	 * @description Swap exact quote amount for base amount
	 * @param {SwapParams} params Parameters for the swap
	 * @returns A function that takes a Transaction object
	 */
	swapExactQuoteForBase = (params: SwapParams) => (tx: Transaction) => {
		tx.setGasBudgetIfNotSet(GAS_BUDGET);
		tx.setSenderIfNotSet(this.#config.address);

		if (params.baseCoin) {
			throw new Error('baseCoin is not accepted for swapping quote asset');
		}
		const {
			poolAddress,
			amount: quoteAmount,
			deepAmount,
			minOut: minBase,
			baseCoinType,
			quoteCoinType,
		} = params;

		const deepCoinType = MAINNET_DEEP_TYPE;

		const quoteCoinInput =
			params.quoteCoin ??
			coinWithBalance({
				type: quoteCoinType,
				balance: quoteAmount,
			});

		const deepCoin =
			params.deepCoin ??
			coinWithBalance({ type: deepCoinType, balance: Math.round(deepAmount * DEEP_SCALAR) });

		const [baseCoinResult, quoteCoinResult, deepCoinResult] = tx.moveCall({
			target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::swap_exact_quote_for_base`,
			arguments: [
				tx.object(poolAddress),
				quoteCoinInput,
				deepCoin,
				tx.pure.u64(minBase),
				tx.object(SUI_CLOCK_OBJECT_ID),
			],
			typeArguments: [baseCoinType, quoteCoinType],
		});

		return [baseCoinResult, quoteCoinResult, deepCoinResult] as const;
	};

	/**
	 * @description Get the trade parameters for a given pool, including taker fee, maker fee, and stake required.
	 * @param {string} poolAddress The address of the pool
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @returns A function that takes a Transaction object
	 */
	poolTradeParams =
		(poolAddress: string, baseCoinType: string, quoteCoinType: string) => (tx: Transaction) => {
			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::pool_trade_params`,
				arguments: [tx.object(poolAddress)],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Get the book parameters for a given pool, including tick size, lot size, and min size.
	 * @param {string} poolAddress The address of the pool
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @returns A function that takes a Transaction object
	 */
	poolBookParams =
		(poolAddress: string, baseCoinType: string, quoteCoinType: string) => (tx: Transaction) => {
			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::pool_book_params`,
				arguments: [tx.object(poolAddress)],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Get the account information for a given pool and balance manager
	 * @param {string} poolAddress The address of the pool
	 * @param {string} managerAddress The address of the BalanceManager
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @returns A function that takes a Transaction object
	 */
	account =
		(poolAddress: string, managerAddress: string, baseCoinType: string, quoteCoinType: string) =>
		(tx: Transaction) => {
			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::account`,
				arguments: [tx.object(poolAddress), tx.object(managerAddress)],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Get the locked balance for a given pool and balance manager
	 * @param {string} poolAddress The address of the pool
	 * @param {string} managerAddress The address of the BalanceManager
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @returns A function that takes a Transaction object
	 */
	lockedBalance =
		(poolAddress: string, managerAddress: string, baseCoinType: string, quoteCoinType: string) =>
		(tx: Transaction) => {
			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::locked_balance`,
				arguments: [tx.object(poolAddress), tx.object(managerAddress)],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Get the DEEP price conversion for a pool
	 * @param {string} poolAddress The address of the pool
	 * @param {string} baseCoinType The type of the base coin
	 * @param {string} quoteCoinType The type of the quote coin
	 * @returns A function that takes a Transaction object
	 */
	getPoolDeepPrice =
		(poolAddress: string, baseCoinType: string, quoteCoinType: string) => (tx: Transaction) => {
			tx.moveCall({
				target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::get_order_deep_price`,
				arguments: [tx.object(poolAddress)],
				typeArguments: [baseCoinType, quoteCoinType],
			});
		};

	/**
	 * @description Create a new pool permissionlessly
	 * @param {CreatePermissionlessPoolParams} params Parameters for creating permissionless pool
	 * @returns A function that takes a Transaction object
	 */
	createPermissionlessPool = (params: CreatePermissionlessPoolParams) => (tx: Transaction) => {
		tx.setSenderIfNotSet(this.#config.address);
		const { baseCoinType, quoteCoinType, tickSize, lotSize, minSize, deepCoin } = params;
		const deepCoinType = MAINNET_DEEP_TYPE;

		// TODO: make metadata call to get adjusted tick size, lot size, and min size
		const adjustedTickSize = tickSize;
		const adjustedLotSize = lotSize;
		const adjustedMinSize = minSize;

		const deepCoinInput =
			deepCoin ??
			coinWithBalance({
				type: deepCoinType,
				balance: POOL_CREATION_FEE,
			});

		tx.moveCall({
			target: `${this.#config.DEEPBOOK_PACKAGE_ID}::pool::create_permissionless_pool`,
			arguments: [
				tx.object(this.#config.REGISTRY_ID), // registry_id
				tx.pure.u64(adjustedTickSize), // adjusted tick_size
				tx.pure.u64(adjustedLotSize), // adjusted lot_size
				tx.pure.u64(adjustedMinSize), // adjusted min_size
				deepCoinInput,
			],
			typeArguments: [baseCoinType, quoteCoinType],
		});
	};
}
