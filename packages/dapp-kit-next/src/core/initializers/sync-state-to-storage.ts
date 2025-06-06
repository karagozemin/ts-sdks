// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DAppKitStores } from '../store.js';
import type { StateStorage } from '../../utils/storage.js';
import type { UiWalletAccount } from '@wallet-standard/ui';
import { getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED as getWalletForHandle } from '@wallet-standard/ui-registry';
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
	$baseConnection.listen((connection) => {
		console.log('LISTEN CALLBACK FOR CONN', connection);
		if (connection.currentAccount) {
			storage.setItem(storageKey, getSavedAccountStorageKey(connection.currentAccount));
		} else {
			storage.removeItem(storageKey);
		}
	});
}

export function getSavedAccountStorageKey(account: UiWalletAccount) {
	const underlyingWallet = getWalletForHandle(account);
	const walletIdentifier = getWalletUniqueIdentifier(underlyingWallet);
	return `${walletIdentifier.replace(':', '_')}:${account.address}`;
}
