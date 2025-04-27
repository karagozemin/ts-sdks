// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { getWallets, StandardEvents } from '@mysten/wallet-standard';
import { onMount } from 'nanostores';
import type { DAppKitState } from '../state.js';

import type { Wallet, WalletWithRequiredFeatures } from '@mysten/wallet-standard';
import { getSuiWallets, isSuiWallet } from '../../utils/wallets.js';
import { getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED as getOrCreateUiWalletForStandardWallet } from '@wallet-standard/ui-registry';

/**
 * Handles updating the store in response to wallets being added, removed, and their properties changing.
 */
export function syncRegisteredWallets({ $state }: DAppKitState) {
	onMount($state, () => {
		const walletsApi = getWallets();
		const unsubscribeCallbacksByWallet = new Map<Wallet, () => void>();

		const onWalletsChanged = (wallets: Wallet[]) => {
			const suiWallets = wallets.map(getOrCreateUiWalletForStandardWallet);
			$state.setKey('wallets', suiWallets);
		};

		const subscribeToWalletEvents = (wallet: WalletWithRequiredFeatures) => {
			const unsubscribeFromChange = wallet.features[StandardEvents].on('change', () => {
				const suiWallets = getSuiWallets();
				onWalletsChanged(suiWallets);
			});

			unsubscribeCallbacksByWallet.set(wallet, unsubscribeFromChange);
		};

		const unsubscribeFromRegister = walletsApi.on('register', (...addedWallets) => {
			addedWallets.filter(isSuiWallet).forEach(subscribeToWalletEvents);

			const suiWallets = getSuiWallets();
			onWalletsChanged(suiWallets);
		});

		const unsubscribeFromUnregister = walletsApi.on('unregister', (...removedWallets) => {
			removedWallets.filter(isSuiWallet).forEach((wallet) => {
				const unsubscribeFromChange = unsubscribeCallbacksByWallet.get(wallet);
				if (unsubscribeFromChange) {
					unsubscribeCallbacksByWallet.delete(wallet);
					unsubscribeFromChange();
				}
			});

			const suiWallets = getSuiWallets();
			onWalletsChanged(suiWallets);
		});

		const suiWallets = getSuiWallets();
		suiWallets.forEach(subscribeToWalletEvents);
		onWalletsChanged(suiWallets);

		return () => {
			unsubscribeFromRegister();
			unsubscribeFromUnregister();

			unsubscribeCallbacksByWallet.forEach((unsubscribe) => unsubscribe());
			unsubscribeCallbacksByWallet.clear();
		};
	});
}
