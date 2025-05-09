// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { UiWallet, UiWalletAccount } from '@wallet-standard/ui';
import { computed, deepMap } from 'nanostores';
import type {
	Experimental_BaseClient,
	Experimental_SuiClientTypes,
} from '@mysten/sui/experimental';
import { getAssociatedWalletOrThrow, requiredWalletFeatures } from '../utils/wallets.js';
import { getChain } from '../utils/networks.js';

type WalletConnection =
	| {
			status: 'disconnected' | 'connecting';
			currentAccount: null;
	  }
	| {
			status: 'reconnecting' | 'connected';
			currentAccount: UiWalletAccount;
	  };

type DAppKitStateValues = {
	wallets: UiWallet[];
	connection: WalletConnection;
	currentNetwork: Experimental_SuiClientTypes.Network;
};

export type DAppKitStores = ReturnType<typeof createStores>;

export function createStores<TClients extends Experimental_BaseClient[]>({
	networkConfig,
	defaultNetwork,
}: {
	networkConfig: Map<TClients[number]['network'], TClients[number]>;
	defaultNetwork: TClients[number]['network'];
}) {
	const $state = deepMap<DAppKitStateValues>({
		wallets: [],
		connection: {
			status: 'disconnected',
			currentAccount: null,
		},
		currentNetwork: defaultNetwork,
	});

	return {
		$state,
		$wallets: computed($state, (state) => {
			return state.wallets.filter((wallet) => {
				const areChainsCompatible = wallet.chains.some(
					(chain) => getChain(state.currentNetwork) === chain,
				);

				const areFeaturesCompatible = requiredWalletFeatures.every((featureName) =>
					wallet.features.includes(featureName),
				);

				return areChainsCompatible && areFeaturesCompatible;
			});
		}),
		$suiClient: computed($state, (state) => networkConfig.get(state.currentNetwork)!),
		$currentNetwork: computed($state, (state) => state.currentNetwork),
		$connection: computed($state, ({ connection, wallets }) => {
			switch (connection.status) {
				case 'connected':
					return {
						wallet: getAssociatedWalletOrThrow(connection.currentAccount, wallets),
						account: connection.currentAccount,
						status: connection.status,
						isConnected: true,
						isConnecting: false,
						isReconnecting: false,
						isDisconnected: false,
					} as const;
				case 'connecting':
					return {
						wallet: null,
						account: connection.currentAccount,
						status: connection.status,
						isConnected: false,
						isConnecting: true,
						isReconnecting: false,
						isDisconnected: false,
					} as const;
				case 'reconnecting':
					return {
						wallet: getAssociatedWalletOrThrow(connection.currentAccount, wallets),
						account: connection.currentAccount,
						status: connection.status,
						isConnected: false,
						isConnecting: false,
						isReconnecting: true,
						isDisconnected: false,
					} as const;
				case 'disconnected':
					return {
						wallet: null,
						account: connection.currentAccount,
						status: connection.status,
						isConnected: false,
						isConnecting: false,
						isReconnecting: false,
						isDisconnected: true,
					} as const;
				default:
					throw new Error(`Encountered unknown connection status: ${connection}`);
			}
		}),
	};
}
