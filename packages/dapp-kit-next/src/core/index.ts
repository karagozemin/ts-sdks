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
import type { Experimental_BaseClient } from '@mysten/sui/experimental';
import type { CreateDAppKitOptions } from './types.js';
import { buildNetworkConfig } from '../utils/networks.js';

export type DAppKit = ReturnType<typeof createDAppKit>;

let defaultInstance: DAppKit | undefined;

export function createDAppKit<TClients extends Experimental_BaseClient[]>(
	options: CreateDAppKitOptions<TClients>,
) {
	const dAppKit = createDAppKitInstance(options);

	if (!defaultInstance) {
		defaultInstance = dAppKit;

		globalThis.__DEFAULT_DAPP_KIT_INSTANCE__ ||= defaultInstance;
		if (globalThis.__DEFAULT_DAPP_KIT_INSTANCE__ !== defaultInstance) {
			console.warn('Detected multiple dApp-kit instances. This may cause un-expected behavior.');
		}
	}

	return dAppKit;
}

export function getDefaultInstance() {
	if (!defaultInstance) {
		throw new DAppKitError('dApp-kit has not been initialized yet.');
	}
	return defaultInstance;
}

export function createDAppKitInstance<TClients extends Experimental_BaseClient[]>({
	autoConnect = true,
	clients,
	defaultNetwork,
	storage = getDefaultStorage(),
	storageKey = DEFAULT_STORAGE_KEY,
}: CreateDAppKitOptions<TClients>) {
	const networkConfig = buildNetworkConfig(clients);

	defaultNetwork ||= clients[0].network;
	if (!(defaultNetwork in networkConfig)) {
		throw new DAppKitError(
			`No client is configured for the specified default network "${defaultNetwork}".`,
		);
	}

	const $state = createState({ defaultNetwork });
	const actions = createActions($state, Object.keys(networkConfig));

	storage ||= createInMemoryStorage();
	syncStateToStorage({ $state, storageKey, storage });

	syncRegisteredWallets($state);
	manageWalletConnection($state);

	if (autoConnect) {
		autoConnectWallet({ $state, storageKey, storage });
	}

	return {
		...actions,
		$state: readonlyType($state),
		$suiClient: computed($state, (state) => networkConfig[state.currentNetwork]!),
		$currentNetwork: computed($state, (state) => state.currentNetwork),
		$wallets: computed($state, (state) => state.wallets),
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
