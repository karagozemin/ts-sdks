// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DAppKitStores } from '../store.js';
import { getWalletAccountFeature } from '@wallet-standard/ui';
import {
	WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_CHAIN_UNSUPPORTED,
	WalletStandardError,
} from '@mysten/wallet-standard';
import type {
	SuiSignPersonalMessageFeature,
	SuiSignPersonalMessageInput,
} from '@mysten/wallet-standard';
import { getWalletAccountForUiWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED as getWalletAccountForUiWalletAccount } from '@wallet-standard/ui-registry';
import { ChainNotSupportedError, WalletNotConnectedError } from '../../utils/errors.js';

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
		const chain = `sui:${currentNetwork}` as const;

		// TODO: Change this after https://github.com/MystenLabs/ts-sdks/pull/285 lands.
		const featureName = 'sui:signPersonalMessage';

		if (!currentAccount.chains.includes(chain)) {
			throw new ChainNotSupportedError(`This account does not support the chain ${chain}.`, {
				cause: new WalletStandardError(
					WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_CHAIN_UNSUPPORTED,
					{
						chain,
						featureName,
						supportedChains: [...currentAccount.chains],
						supportedFeatures: [...currentAccount.features],
						address: currentAccount.address,
					},
				),
			});
		}

		const signPersonalMessageFeature = getWalletAccountFeature(
			currentAccount,
			featureName,
		) as SuiSignPersonalMessageFeature[typeof featureName];

		return await signPersonalMessageFeature.signPersonalMessage({
			...standardArgs,
			account: getWalletAccountForUiWalletAccount(currentAccount),
			chain,
		});
	};
}
