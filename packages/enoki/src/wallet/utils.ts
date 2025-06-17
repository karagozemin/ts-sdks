// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { Wallet, WalletWithFeatures } from '@mysten/wallet-standard';
import type { UiWalletHandle } from '@wallet-standard/ui';
import { getWalletFeature } from '@wallet-standard/ui';
import type { EnokiWallet } from './index.js';
import type { EnokiGetMetadataFeature } from './feature.js';
import { EnokiGetMetadata } from './feature.js';

export function isEnokiWallet(wallet: UiWalletHandle): boolean;
export function isEnokiWallet(wallet: Wallet): wallet is EnokiWallet;
export function isEnokiWallet(wallet: Wallet | UiWalletHandle) {
	if (isWalletHandle(wallet)) {
		return wallet.features.includes(EnokiGetMetadata);
	}
	return EnokiGetMetadata in wallet.features;
}

export function getWalletMetadata(enokiWallet: Wallet | UiWalletHandle) {
	if (isWalletHandle(enokiWallet)) {
		const { getMetadata } = getWalletFeature(
			enokiWallet,
			EnokiGetMetadata,
		) as EnokiGetMetadataFeature[typeof EnokiGetMetadata];

		return getMetadata();
	} else if (EnokiGetMetadata in enokiWallet.features) {
		const walletWithFeature = enokiWallet as WalletWithFeatures<EnokiGetMetadataFeature>;
		return walletWithFeature.features[EnokiGetMetadata].getMetadata();
	}
	throw new Error("The specified wallet isn't an Enoki wallet.");
}

export function isGoogleWallet(wallet: Wallet | UiWalletHandle) {
	return getWalletMetadata(wallet)?.provider === 'google';
}

export function isTwitchWallet(wallet: Wallet | UiWalletHandle) {
	return getWalletMetadata(wallet)?.provider === 'twitch';
}

export function isFacebookWallet(wallet: Wallet | UiWalletHandle) {
	return getWalletMetadata(wallet)?.provider === 'facebook';
}

function isWalletHandle(wallet: UiWalletHandle | Wallet): wallet is UiWalletHandle {
	// TypeScript doesn't properly narrow readonly arrays:
	// https://github.com/microsoft/TypeScript/issues/1700
	return Array.isArray(wallet.features);
}
