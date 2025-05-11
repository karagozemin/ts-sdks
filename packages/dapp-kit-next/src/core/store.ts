// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { UiWallet, UiWalletAccount } from '@wallet-standard/ui';
import { atom, computed, map } from 'nanostores';
import type { Experimental_BaseClient } from '@mysten/sui/experimental';
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

export type DAppKitStores = ReturnType<typeof createStores>;

export function createStores<TClients extends Experimental_BaseClient[]>({
	networkConfig,
	defaultNetwork,
}: {
	networkConfig: Partial<Record<TClients[number]['network'], TClients[number]>>;
	defaultNetwork: TClients[number]['network'];
}) {
	const $currentNetwork = atom<TClients[number]['network']>(defaultNetwork);

	const $registeredWallets = atom<UiWallet[]>([]);

	const $compatibleWallets = computed(
		[$registeredWallets, $currentNetwork],
		(wallets, currentNetwork) => {
			return wallets.filter((wallet) => {
				const areChainsCompatible = wallet.chains.some(
					(chain) => getChain(currentNetwork) === chain,
				);

				const areFeaturesCompatible = requiredWalletFeatures.every((featureName) =>
					wallet.features.includes(featureName),
				);

				console.log(
					'WALLET',
					areChainsCompatible,
					areFeaturesCompatible,
					wallet.name,
					wallet.features,
				);
				return areChainsCompatible && areFeaturesCompatible;
			});
		},
	);

	const $baseConnection = map<WalletConnection>({
		status: 'disconnected',
		currentAccount: null,
	});

	return {
		$currentNetwork,
		$registeredWallets,
		$compatibleWallets,
		$baseConnection,
		$suiClient: computed($currentNetwork, (currentNetwork) => {
			const a = networkConfig[currentNetwork];
			console.log('fff', a);
			return networkConfig[currentNetwork]! satisfies TClients[number];
		}),
		$connection: computed([$baseConnection, $compatibleWallets], (connection, wallets) => {
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
