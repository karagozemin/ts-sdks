// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { computed, readonlyType } from 'nanostores';
import { createState } from './state.js';
import { syncRegisteredWallets } from './initializers/registered-wallets.js';
import { createActions } from './actions/index.js';
import { DAppKitError } from '../utils/errors.js';
import { autoConnectWallet } from './initializers/autoconnect-wallet.js';
import { createInMemoryStorage, DEFAULT_STORAGE_KEY, getDefaultStorage } from '../utils/storage.js';
import { syncStateToStorage } from './initializers/sync-state-to-storage.js';
import { getAssociatedWalletOrThrow } from '../utils/wallets.js';
import { manageWalletConnection } from './initializers/manage-connection.js';
import type { Networks } from '../utils/networks.js';
import type { CreateDAppKitOptions } from './types.js';
import type { Experimental_BaseClient } from '@mysten/sui/experimental';

export type DAppKit = ReturnType<typeof createDAppKitInstance>;

export function createDAppKit<TNetworks extends Networks>(
	options: CreateDAppKitOptions<TNetworks>,
) {
	const instance = createDAppKitInstance(options);

	globalThis.__DEFAULT_DAPP_KIT_INSTANCE__ ||= instance;
	if (globalThis.__DEFAULT_DAPP_KIT_INSTANCE__ !== instance) {
		console.warn('Detected multiple dApp-kit instances. This may cause un-expected behavior.');
	}

	return instance;
}

export function getDefaultInstance() {
	if (!globalThis.__DEFAULT_DAPP_KIT_INSTANCE__) {
		throw new DAppKitError('dApp-kit has not been initialized yet.');
	}
	return globalThis.__DEFAULT_DAPP_KIT_INSTANCE__;
}

export function createDAppKitInstance<TNetworks extends Networks>({
	autoConnect = true,
	networks,
	createClient,
	defaultNetwork = networks[0],
	storage = getDefaultStorage(),
	storageKey = DEFAULT_STORAGE_KEY,
}: CreateDAppKitOptions<TNetworks>) {
	const $state = createState({ defaultNetwork });
	const actions = createActions($state, networks);

	storage ||= createInMemoryStorage();
	syncStateToStorage({ $state, storageKey, storage });

	syncRegisteredWallets($state);
	manageWalletConnection($state);

	if (autoConnect) {
		autoConnectWallet({ $state, storageKey, storage });
	}

	const networkConfig = new Map<TNetworks[number], Experimental_BaseClient>();
	const getClient = (network: TNetworks[number]) => {
		if (networkConfig.has(network)) {
			return networkConfig.get(network)!;
		}

		const client = createClient(network);
		networkConfig.set(network, client);
		return client;
	};

	return {
		...actions,
		getClient,
		$state: readonlyType($state),
		$wallets: computed($state, (state) => state.wallets),
		$currentClient: computed($state, (state) => getClient(state.currentNetwork)),
		$currentNetwork: computed($state, (state) => state.currentNetwork),
		$connection: computed([$state], ({ connection, wallets }) => {
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
