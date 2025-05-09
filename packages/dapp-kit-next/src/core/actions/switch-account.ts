// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DAppKitStores } from '../store.js';
import { uiWalletAccountBelongsToUiWallet } from '@wallet-standard/ui';
import type { UiWalletAccount } from '@wallet-standard/ui';
import { WalletNotConnectedError, WalletAccountNotFoundError } from '../../utils/errors.js';
import { getAssociatedWalletOrThrow } from '../../utils/wallets.js';

export type SwitchAccountArgs = {
	/** The account to switch to. */
	account: UiWalletAccount;
};

export function switchAccountCreator({ $state }: DAppKitStores) {
	/**
	 * Switches the currently selected account to the specified account.
	 */
	return function switchAccount({ account }: SwitchAccountArgs) {
		const { connection, wallets } = $state.get();
		if (!connection.currentAccount) {
			throw new WalletNotConnectedError('No wallet is connected.');
		}

		const currentWallet = getAssociatedWalletOrThrow(connection.currentAccount, wallets);
		if (!uiWalletAccountBelongsToUiWallet(account, currentWallet)) {
			throw new WalletAccountNotFoundError(
				`No account with address ${account.address} is connected to ${currentWallet.name}.`,
			);
		}

		$state.setKey('connection.currentAccount', account);
	};
}
