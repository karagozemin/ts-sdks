// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { normalizeSuiAddress } from '@mysten/sui/utils';

import { BalanceManagerContract } from '../transactions/balanceManager.js';
import type { BalanceManager, Environment } from '../types/index.js';
import { mainnetPackageIds, testnetPackageIds } from './constants.js';

export const FLOAT_SCALAR = 1000000000;
export const MAX_TIMESTAMP = 1844674407370955161n;
export const GAS_BUDGET = 0.5 * 500000000; // Adjust based on benchmarking
export const DEEP_SCALAR = 1000000;
export const POOL_CREATION_FEE = 500 * 1_000_000; // 500 DEEP

export class DeepBookConfig {
	address: string;

	DEEPBOOK_PACKAGE_ID: string;
	REGISTRY_ID: string;
	DEEP_TREASURY_ID: string;
	adminCap?: string;

	balanceManager: BalanceManagerContract;

	constructor({
		env,
		address,
		adminCap,
	}: {
		env: Environment;
		address: string;
		adminCap?: string;
		balanceManagers?: { [key: string]: BalanceManager };
	}) {
		this.address = normalizeSuiAddress(address);
		this.adminCap = adminCap;

		if (env === 'mainnet') {
			this.DEEPBOOK_PACKAGE_ID = mainnetPackageIds.DEEPBOOK_PACKAGE_ID;
			this.REGISTRY_ID = mainnetPackageIds.REGISTRY_ID;
			this.DEEP_TREASURY_ID = mainnetPackageIds.DEEP_TREASURY_ID;
		} else {
			this.DEEPBOOK_PACKAGE_ID = testnetPackageIds.DEEPBOOK_PACKAGE_ID;
			this.REGISTRY_ID = testnetPackageIds.REGISTRY_ID;
			this.DEEP_TREASURY_ID = testnetPackageIds.DEEP_TREASURY_ID;
		}

		this.balanceManager = new BalanceManagerContract(this);
	}
}

export const convertToDeepBookPrice = (
	price: number,
	baseDecimals: number,
	quoteDecimals: number,
): number => {
	return price * FLOAT_SCALAR * 10 ** (quoteDecimals - baseDecimals);
};
