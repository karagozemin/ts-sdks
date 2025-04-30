// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { listenKeys, onMount } from 'nanostores';
import type { DAppKitState, DAppKitStateValues } from '../state.js';
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
		console.log('Listening');
		const a = listenKeys(
			$state,
			['connection.currentAccount', 'connection'],
			(value, oldValue: DAppKitStateValues | undefined) => {
				console.log('VA', value, oldValue);

				if (value.connection.currentAccount) {
					console.log('Setting!');
					storage.setItem(
						storageKey,
						getUiWalletAccountStorageKey(value.connection.currentAccount),
					);
				} else if (oldValue?.connection.currentAccount && !value.connection.currentAccount) {
					// eslint-disable-next-line no-debugger
					debugger;
					console.log('removing');
					storage.removeItem(storageKey);
				}
			},
		);

		return () => {
			console.log('cleaning up');
			a();
		};
	});
}
