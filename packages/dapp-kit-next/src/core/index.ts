// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { createStores } from './store.js';
import { syncRegisteredWallets } from './initializers/registered-wallets.js';
import { DAppKitError } from '../utils/errors.js';
import { autoConnectWallet } from './initializers/autoconnect-wallet.js';
import { createInMemoryStorage, DEFAULT_STORAGE_KEY, getDefaultStorage } from '../utils/storage.js';
import { syncStateToStorage } from './initializers/sync-state-to-storage.js';
import { manageWalletConnection } from './initializers/manage-connection.js';
import type { Experimental_BaseClient } from '@mysten/sui/experimental';
import type { CreateDAppKitOptions } from './types.js';
import { createActions } from './actions/index.js';
import { buildNetworkConfig } from '../utils/networks.js';
import { readonlyType } from 'nanostores';

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

	const stores = createStores({ networkConfig, defaultNetwork });
	const actions = createActions(stores, Object.keys(networkConfig));

	storage ||= createInMemoryStorage();
	syncStateToStorage({ stores, storageKey, storage });

	syncRegisteredWallets(stores);
	manageWalletConnection(stores);

	if (autoConnect) {
		autoConnectWallet({ stores, storageKey, storage });
	}

	return {
		...actions,
		networkConfig,
		stores: {
			$wallets: stores.$compatibleWallets,
			$connection: stores.$connection,
			$currentNetwork: readonlyType(stores.$currentNetwork),
			$suiClient: stores.$suiClient,
		},
	};
}
