// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { task } from 'nanostores';
import type { DAppKitStores } from '../store.js';
import type { StateStorage } from '../../utils/storage.js';
import type { UiWallet } from '@wallet-standard/ui';
import { getWalletUniqueIdentifier } from '../../utils/wallets.js';

/**
 * Attempts to connect to a previously authorized wallet account on mount and when new wallets are registered.
 */
export function autoConnectWallet({
	stores: { $baseConnection, $compatibleWallets },
	storage,
	storageKey,
}: {
	stores: DAppKitStores;
	storage: StateStorage;
	storageKey: string;
}) {
	$compatibleWallets.listen(async (wallets, oldWallets: readonly UiWallet[] | undefined) => {
		console.log('RUNNING AUTOCONNECT', wallets);
		if (oldWallets && oldWallets.length > wallets.length) return;

		const connection = $baseConnection.get();
		if (connection.status !== 'disconnected') return;

		const savedWalletAccount = await task(() => {
			return getSavedWalletAccount({
				storage,
				storageKey,
				wallets,
			});
		});

		if (savedWalletAccount) {
			$baseConnection.set({
				status: 'connected',
				currentAccount: savedWalletAccount,
			});
		}
	});
}

async function getSavedWalletAccount({
	storage,
	storageKey,
	wallets,
}: {
	storage: StateStorage;
	storageKey: string;
	wallets: readonly UiWallet[];
}) {
	console.log('SAVED A');

	const savedWalletIdAndAddress = await storage.getItem(storageKey);
	if (!savedWalletIdAndAddress) {
		return null;
	}
	console.log('SAVED B');

	const [savedWalletId, savedAccountAddress] = savedWalletIdAndAddress.split(':');
	if (!savedWalletId || !savedAccountAddress) {
		return null;
	}

	console.log('SAVED C');

	for (const wallet of wallets) {
		if (getWalletUniqueIdentifier(wallet) === savedWalletId) {
			for (const account of wallet.accounts) {
				if (account.address === savedAccountAddress) {
					return account;
				}
			}
		}
	}

	return null;
}
