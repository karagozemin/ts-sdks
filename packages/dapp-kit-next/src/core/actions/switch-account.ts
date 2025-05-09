// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DAppKitStores } from '../store.js';
import { uiWalletAccountBelongsToUiWallet } from '@wallet-standard/ui';
import type { UiWalletAccount } from '@wallet-standard/ui';
import { WalletNotConnectedError, WalletAccountNotFoundError } from '../../utils/errors.js';

export type SwitchAccountArgs = {
	/** The account to switch to. */
	account: UiWalletAccount;
};

export function switchAccountCreator(stores: DAppKitStores) {
	/**
	 * Switches the currently selected account to the specified account.
	 */
	return function switchAccount({ account }: SwitchAccountArgs) {
		const { wallet: currentWallet } = stores.$connection.get();
		if (!currentWallet) {
			throw new WalletNotConnectedError('No wallet is connected.');
		}

		if (!uiWalletAccountBelongsToUiWallet(account, currentWallet)) {
			throw new WalletAccountNotFoundError(
				`No account with address ${account.address} is connected to ${currentWallet.name}.`,
			);
		}

		stores.$state.setKey('connection.currentAccount', account);
	};
}
