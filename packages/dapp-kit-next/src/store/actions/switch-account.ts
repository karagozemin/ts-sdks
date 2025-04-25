// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { WalletNotConnectedError, WalletAccountNotFoundError } from '../errors.js';
import type { DAppKitState } from '../state.js';
import { uiWalletAccountBelongsToUiWallet } from '@wallet-standard/ui';
import type { UiWalletAccount } from '@wallet-standard/ui';

export type SwitchAccountArgs = {
	/** The account to switch to. */
	account: UiWalletAccount;
};

export function switchAccountCreator({ $state, $currentWallet }: DAppKitState) {
	/**
	 * Switches the currently selected account to the specified account.
	 */
	return function switchAccount({ account }: SwitchAccountArgs) {
		const currentWallet = $currentWallet.get();
		if (!currentWallet) {
			throw new WalletNotConnectedError('No wallet is connected.');
		}

		if (!uiWalletAccountBelongsToUiWallet(account, currentWallet)) {
			throw new WalletAccountNotFoundError(
				`No account with address ${account.address} is connected to ${currentWallet.name}.`,
			);
		}

		$state.setKey('currentAccount', account);
	};
}
