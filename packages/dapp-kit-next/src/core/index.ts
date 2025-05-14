// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { computed, readonlyType } from 'nanostores';
import { createState } from './state.js';
import { syncRegisteredWallets } from './initializers/registered-wallets.js';
import { createActions } from './actions/index.js';
import { DAppKitError } from '../utils/errors.js';
import { autoConnectWallet } from './initializers/autoconnect-wallet.js';
import { createInMemoryStorage, DEFAULT_STORAGE_KEY, getDefaultStorage } from '../utils/storage.js';
import type { StateStorage } from '../utils/storage.js';
import { syncStateToStorage } from './initializers/sync-state-to-storage.js';
import { getAssociatedWalletOrThrow } from '../utils/wallets.js';
import { manageWalletConnection } from './initializers/manage-connection.js';
import type { NonEmptyArray } from '../../../utils/src/types.js';
import type { Experimental_BaseClient } from '@mysten/sui/src/experimental/client.js';
import { buildNetworkConfig } from '../utils/networks.js';

export type DAppKit = ReturnType<typeof createDAppKit>;

type CreateDAppKitOptions<TClients extends NonEmptyArray<Experimental_BaseClient>> = {
	/**
	 * Enables automatically connecting to the most recently used wallet account.
	 * @defaultValue `true`
	 */
	autoConnect?: boolean;

	/**
	 * A list of clients used for interacting with Sui.
	 */
	clients: TClients;

	/**
	 * The name of the network to use by default.
	 * @defaultValue The `network` property of the first client: `clients[0].network`
	 */
	defaultNetwork?: TClients[number]['network'];

	/**
	 * Configures how the most recently connected to wallet account is stored. Set to `null` to disable persisting state entirely.
	 * @defaultValue `localStorage` if available
	 */
	storage?: StateStorage | null;

	/**
	 * The key to use to store the most recently connected wallet account.
	 * @defaultValue `mysten-dapp-kit:selected-wallet-and-address`
	 */
	storageKey?: string;
};

let defaultInstance: DAppKit | undefined;

export function createDAppKit<const TClients extends NonEmptyArray<Experimental_BaseClient>>(
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

export function createDAppKitInstance<TClients extends NonEmptyArray<Experimental_BaseClient>>({
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
		clients: Object.freeze(clients),
		$state: readonlyType($state),
		$wallets: computed($state, (state) => state.wallets),
		$currentClient: computed($state, (state) => networkConfig.get(state.currentNetwork)!),
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
