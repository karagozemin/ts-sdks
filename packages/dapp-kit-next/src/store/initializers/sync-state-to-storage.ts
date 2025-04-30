// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { listenKeys, onMount } from 'nanostores';
import type { DAppKitState } from '../state.js';
import type { StateStorage } from '../../utils/storage.js';
import { getUiWalletAccountStorageKey } from '@wallet-standard/ui';

/**
 * Syncs the most recently connected wallet name and address to storage.
 */
export function syncStateToStorage({
	$state,
	storage,
	storageKey,
}: {
	$state: DAppKitState;
	storage: StateStorage;
	storageKey: string;
}) {
	onMount($state, () => {
		return listenKeys($state, ['connection', 'connection.currentAccount'], ({ connection }) => {
			if (connection.currentAccount) {
				storage.setItem(storageKey, getUiWalletAccountStorageKey(connection.currentAccount));
			} else {
				storage.removeItem(storageKey);
			}
		});
	});
}
