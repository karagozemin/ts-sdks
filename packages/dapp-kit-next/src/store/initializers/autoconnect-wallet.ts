// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { listenKeys, onMount, task } from 'nanostores';
import type { DAppKitState } from '../state.js';
import type { StateStorage } from '../../utils/storage.js';
import type { UiWallet } from '@wallet-standard/ui';

/**
 * Attempts to automatically connect to a wallet account if it was previously authorized.
 */
export function autoConnectWallet({
	$state,
	storage,
	storageKey,
}: {
	$state: DAppKitState;
	storage: StateStorage;
	storageKey: string;
}) {
	onMount($state, () => {
		return listenKeys($state, ['wallets'], async ({ connection, wallets }, oldValue) => {
			if (oldValue.wallets.length > wallets.length) return;
			if (connection.status !== 'disconnected') return;

			const savedWalletAccount = await task(() => {
				return getSavedWalletAccount({
					storage,
					storageKey,
					wallets: wallets,
				});
			});

			if (savedWalletAccount) {
				$state.setKey('connection', {
					status: 'connected',
					currentAccount: savedWalletAccount,
					// FIXME: Since `silent` is deprecated... we really need to be able to know what the
					// supported intents are on initialization. Do we have a use case for accounts only
					// have specific supported intents?
					// 1. wallet.features[SuiGetWalletMetadata].getMetadata();
					//     { type: 'default' | 'zk-only', supportedIntents: [] }
					// 2. this is a property on the wallet
					// 3. wallet.features[SuiGetWalletAccountMetadata].getMetadata(account);
					supportedIntents: [],
				});
			}
		});
	});
}

async function getSavedWalletAccount({
	storage,
	storageKey,
	wallets,
}: {
	storage: StateStorage;
	storageKey: string;
	wallets: UiWallet[];
}) {
	const savedWalletNameAndAddress = await storage.getItem(storageKey);
	if (!savedWalletNameAndAddress) {
		return null;
	}

	const [savedWalletName, savedAccountAddress] = savedWalletNameAndAddress.split(':');
	if (!savedWalletName || !savedAccountAddress) {
		return null;
	}

	for (const wallet of wallets) {
		if (wallet.name === savedWalletName) {
			for (const account of wallet.accounts) {
				if (account.address === savedAccountAddress) {
					return account;
				}
			}
		}
	}

	return null;
}
