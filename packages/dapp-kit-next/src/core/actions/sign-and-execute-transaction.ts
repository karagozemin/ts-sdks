// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DAppKitStores } from '../store.js';
import type {
	SuiSignAndExecuteTransactionFeature,
	SuiSignAndExecuteTransactionInput,
} from '@mysten/wallet-standard';
import { getWalletAccountForUiWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED as getWalletAccountForUiWalletAccount } from '@wallet-standard/ui-registry';
import { WalletNotConnectedError } from '../../utils/errors.js';
import { getChain } from '../../utils/networks.js';
import type { Transaction } from '@mysten/sui/transactions';
import { getAccountFeature } from '../../utils/wallets.js';

export type signAndExecuteTransactionArgs = {
	transaction: Transaction | string;
} & Omit<SuiSignAndExecuteTransactionInput, 'account' | 'chain' | 'transaction'>;

export function signAndExecuteTransactionCreator({ $connection, $suiClient }: DAppKitStores) {
	/**
	 * Prompts the specified wallet account to sign and execute a transaction.
	 */
	return async function signAndExecuteTransaction({
		transaction,
		...standardArgs
	}: signAndExecuteTransactionArgs) {
		const { account } = $connection.get();
		if (!account) {
			throw new WalletNotConnectedError('No wallet is connected.');
		}

		const suiClient = $suiClient.get();
		const chain = getChain(suiClient.network);

		// TODO: Change this after https://github.com/MystenLabs/ts-sdks/pull/285 lands.
		const featureName = 'sui:signAndExecuteTransaction';

		const signAndExecuteTransactionFeature = getAccountFeature({
			account,
			chain,
			featureName,
		}) as SuiSignAndExecuteTransactionFeature[typeof featureName];

		return await signAndExecuteTransactionFeature.signAndExecuteTransaction({
			...standardArgs,
			transaction: {
				toJSON: async () => {
					return typeof transaction === 'string'
						? transaction
						: await transaction.toJSON({
								supportedIntents: [],
								client: suiClient,
							});
				},
			},
			account: getWalletAccountForUiWalletAccount(account),
			chain,
		});
	};
}
