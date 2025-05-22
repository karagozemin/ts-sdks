// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { ClientWithCoreApi } from '@mysten/sui/experimental';
import type { Networks } from '../utils/networks.js';
import type { StateStorage } from '../utils/storage.js';

export type UnregisterCallback = () => void;

export type WalletInitializerArgs<TNetworks extends Networks> = {
	networks: TNetworks;
	getClient: (network: TNetworks[number]) => ClientWithCoreApi;
};

export type WalletInitializerCallback<TNetworks extends Networks> = (
	input: WalletInitializerArgs<TNetworks>,
) => Promise<UnregisterCallback> | UnregisterCallback;

export type SlushWalletConfig = {
	/**
	 * The name of your application, shown to the user when connecting to the wallet.
	 */
	name: string;

	/**
	 * The host origin of the wallet.
	 * @defaultValue https://my.slush.app
	 */
	origin?: string;

	/**
	 * The URL to fetch the wallet metadata from.
	 * @defaultValue https://api.slush.app/api/wallet/metadata
	 */
	metadataApiUrl?: string;
};

export type CreateDAppKitOptions<TNetworks extends Networks> = {
	/**
	 * Enables automatically connecting to the most recently used wallet account.
	 * @defaultValue `true`
	 */
	autoConnect?: boolean;

	/**
	 * A list of networks supported by the application.
	 */
	networks: TNetworks;

	/**
	 * Creates a new client instance for the given network.
	 *
	 * @param network - A supported network identifier as defined by the `networks` field.
	 * @returns An `ClientWithCoreApi` that’s pre-configured to interact with the specified network.
	 */
	createClient: (network: TNetworks[number]) => ClientWithCoreApi;

	/**
	 * The name of the network to use by default.
	 * @defaultValue The first network specified in `networks`.
	 */
	defaultNetwork?: TNetworks[number];

	/**
	 * Configuration options for the Slush web wallet. Set to `null` to disable the wallet.
	 */
	slushWalletConfig: SlushWalletConfig | null;

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
	 * A list of wallet initializer callbacks to invoke on initial page load.
	 *
	 * Each callback receives a `registerWallet` function and should call it
	 * with a custom wallet descriptor to extend the set of available wallets.
	 * Useful for plugging in third‑party or proprietary wallets alongside
	 * standard wallets, enabling custom integrations.
	 */
	walletInitializers?: WalletInitializerCallback<TNetworks>[];
};
