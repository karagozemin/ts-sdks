// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DAppKitStores } from '../store.js';
import type {
	SuiSignPersonalMessageFeature,
	SuiSignPersonalMessageInput,
} from '@mysten/wallet-standard';
import { getWalletAccountForUiWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED as getWalletAccountForUiWalletAccount } from '@wallet-standard/ui-registry';
import { WalletNotConnectedError } from '../../utils/errors.js';
import { getChain } from '../../utils/networks.js';
import { getAccountFeature } from '../../utils/wallets.js';

export type SignPersonalMessageArgs = Omit<SuiSignPersonalMessageInput, 'account' | 'chain'>;

export function signPersonalMessageCreator({ $connection, $currentNetwork }: DAppKitStores) {
	/**
	 * Prompts the specified wallet account to sign a personal message.
	 */
	return async function signPersonalMessage({ ...standardArgs }: SignPersonalMessageArgs) {
		const { account: currentAccount } = $connection.get();
		if (!currentAccount) {
			throw new WalletNotConnectedError('No wallet is connected.');
		}

		const currentNetwork = $currentNetwork.get();
		const chain = getChain(currentNetwork);

		// TODO: Change this after https://github.com/MystenLabs/ts-sdks/pull/285 lands.
		const featureName = 'sui:signPersonalMessage';

		const signPersonalMessageFeature = getAccountFeature({
			account: currentAccount,
			chain,
			featureName,
		}) as SuiSignPersonalMessageFeature[typeof featureName];

		return await signPersonalMessageFeature.signPersonalMessage({
			...standardArgs,
			account: getWalletAccountForUiWalletAccount(currentAccount),
			chain,
		});
	};
}
