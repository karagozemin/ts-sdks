// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { onMount } from 'nanostores';
import type { DAppKitStores } from '../store.js';
import type { StateStorage } from '../../utils/storage.js';
import type { UiWalletAccount } from '@wallet-standard/ui';
import { getWalletUniqueIdentifier } from '../../utils/wallets.js';

/**
 * Syncs the most recently connected wallet name and address to storage.
 */
export function syncStateToStorage({
	stores: { $baseConnection },
	storage,
	storageKey,
}: {
	stores: DAppKitStores;
	storage: StateStorage;
	storageKey: string;
}) {
	onMount($baseConnection, () => {
		return $baseConnection.listen((connection) => {
			if (connection.currentAccount) {
				storage.setItem(storageKey, getSavedAccountStorageKey(connection.currentAccount));
			} else {
				storage.removeItem(storageKey);
			}
		});
	});
}

export function getSavedAccountStorageKey(account: UiWalletAccount) {
	const walletIdentifier = getWalletUniqueIdentifier(account);
	return `${walletIdentifier.replace(':', '_')}:${account.address}`;
}
