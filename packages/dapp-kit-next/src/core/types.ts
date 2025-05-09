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
	 * Configures how the most recently connected to wallet account is stored. Set to `null` to disable persisting state entirely.
	 * @defaultValue `localStorage` if available
	 */
	storage?: StateStorage | null;

	/**
	 * The key to use to store the most recently connected wallet account.
	 * @defaultValue `mysten-dapp-kit:selected-wallet-and-address`
	 */
	storageKey?: string;

	/**
	 *
	 */
	clients: TClients;

	/**
	 *
	 */
	defaultNetwork?: TClients[number]['network'];
};
