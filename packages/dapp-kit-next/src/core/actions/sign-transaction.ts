// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DAppKitStores } from '../store.js';
import type { SuiSignTransactionFeature, SuiSignTransactionInput } from '@mysten/wallet-standard';
import { getWalletAccountForUiWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED as getWalletAccountForUiWalletAccount } from '@wallet-standard/ui-registry';
import { WalletNotConnectedError } from '../../utils/errors.js';
import { getChain } from '../../utils/networks.js';
import type { Transaction } from '@mysten/sui/transactions';
import { getAccountFeature } from '../../utils/wallets.js';

export type SignTransactionArgs = {
	transaction: Transaction | string;
} & Omit<SuiSignTransactionInput, 'account' | 'chain' | 'transaction'>;

export function signTransactionCreator({ $connection, $suiClient }: DAppKitStores) {
	/**
	 * Prompts the specified wallet account to sign a transaction.
	 */
	return async function signTransaction({ transaction, ...standardArgs }: SignTransactionArgs) {
		const { account } = $connection.get();
		if (!account) {
			throw new WalletNotConnectedError('No wallet is connected.');
		}

		const suiClient = $suiClient.get();
		const chain = getChain(suiClient.network);

		// TODO: Change this after https://github.com/MystenLabs/ts-sdks/pull/285 lands.
		const featureName = 'sui:signTransaction';

		const signTransactionFeature = getAccountFeature({
			account,
			chain,
			featureName,
		}) as SuiSignTransactionFeature[typeof featureName];

		return await signTransactionFeature.signTransaction({
			...standardArgs,
			transaction: {
				toJSON: async () => {
					// TODO: Fix passing through the client and supported intents for plugins.
					return typeof transaction === 'string' ? transaction : await transaction.toJSON();
				},
			},
			account: getWalletAccountForUiWalletAccount(account),
			chain,
		});
	};
}
