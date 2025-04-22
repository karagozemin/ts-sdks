// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { getWallets, StandardEvents } from '@mysten/wallet-standard';
import { onMount } from 'nanostores';
import type { DAppKitState } from '../state.js';

import type { WalletWithRequiredFeatures } from '@mysten/wallet-standard';
import { getWalletUniqueIdentifier, isSuiWallet } from '../../utils/wallets.js';

export function syncRegisteredWallets($state: DAppKitState) {
	onMount($state, () => {
		const { get, on } = getWallets();
		const unsubscribeCallbacksByWalletId = new Map<string, () => void>();

		const updateRegisteredWallets = () => {
			const suiWallets = get().filter(isSuiWallet);
			$state.setKey('wallets', suiWallets);
		};

		const subscribeToWalletEvents = (wallet: WalletWithRequiredFeatures) => {
			const unsubscribeFromChange = wallet.features[StandardEvents].on('change', (properties) => {
				if (!isSuiWallet({ ...wallet, ...properties })) {
					// TODO: If the features, chains, or accounts change in a way that make the connected wallet
					// invalid we'll need to manually reset / invalidate the connection state. This will be done
					// in a follow-up PR!
				}
				updateRegisteredWallets();
			});

			const walletId = getWalletUniqueIdentifier(wallet);
			unsubscribeCallbacksByWalletId.set(walletId, unsubscribeFromChange);
		};

		const unsubscribeFromRegister = on('register', (...addedWallets) => {
			addedWallets.filter(isSuiWallet).forEach(subscribeToWalletEvents);
			updateRegisteredWallets();
		});

		const unsubscribeFromUnregister = on('unregister', (...removedWallets) => {
			removedWallets.filter(isSuiWallet).forEach((wallet) => {
				const walletId = getWalletUniqueIdentifier(wallet);
				const unsubscribeFromChange = unsubscribeCallbacksByWalletId.get(walletId);

				if (unsubscribeFromChange) {
					unsubscribeCallbacksByWalletId.delete(walletId);
					unsubscribeFromChange();
				}
			});

			updateRegisteredWallets();
		});

		updateRegisteredWallets();
		$state.get().wallets.forEach(subscribeToWalletEvents);

		return () => {
			unsubscribeFromRegister();
			unsubscribeFromUnregister();

			unsubscribeCallbacksByWalletId.forEach((unsubscribe) => unsubscribe());
			unsubscribeCallbacksByWalletId.clear();
		};
	});
}
