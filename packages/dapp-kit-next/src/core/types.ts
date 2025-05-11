// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { Experimental_BaseClient } from '@mysten/sui/experimental';
import type { StateStorage } from '../utils/storage.js';

export type CreateDAppKitOptions<TClients extends Experimental_BaseClient[]> = {
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
