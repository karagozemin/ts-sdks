// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { SuiSignPersonalMessage } from '@mysten/wallet-standard';
import type {
	SuiSignPersonalMessageFeature,
	SuiSignPersonalMessageInput,
} from '@mysten/wallet-standard';
import { getWalletAccountForUiWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED as getWalletAccountForUiWalletAccount } from '@wallet-standard/ui-registry';
import { WalletNotConnectedError } from '../../utils/errors.js';
import { getChain } from '../../utils/networks.js';
import { getAccountFeature } from '../../utils/wallets.js';
import type { DAppKitState } from '../state.js';

export type SignPersonalMessageArgs = Omit<SuiSignPersonalMessageInput, 'account' | 'chain'>;

export function signPersonalMessageCreator($state: DAppKitState) {
	/**
	 * Prompts the specified wallet account to sign a personal message.
	 */
	return async function signPersonalMessage({ ...standardArgs }: SignPersonalMessageArgs) {
		const { connection, currentNetwork } = $state.get();
		if (!connection.currentAccount) {
			throw new WalletNotConnectedError('No wallet is connected.');
		}

		const chain = getChain(currentNetwork);
		const signPersonalMessageFeature = getAccountFeature({
			account: connection.currentAccount,
			featureName: SuiSignPersonalMessage,
			chain,
		}) as SuiSignPersonalMessageFeature[typeof SuiSignPersonalMessage];

		const underlyingAccount = getWalletAccountForUiWalletAccount(connection.currentAccount);
		return await signPersonalMessageFeature.signPersonalMessage({
			...standardArgs,
			account: underlyingAccount,
			chain,
		});
	};
}
