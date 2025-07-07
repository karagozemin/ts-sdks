// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { EnokiWallet } from './wallet.js';
import type { RegisterEnokiWalletsOptions } from './types.js';
import { getWallets } from '@mysten/wallet-standard';
import type { ClientWithCoreApi } from '@mysten/sui/experimental';
import { isEnokiNetwork } from '../utils.js';
import { ENOKI_PROVIDER_WALLETS_INFO } from './providers.js';

export function registerEnokiWallets({
	providers,
	windowFeatures = defaultWindowFeatures,
	...config
}: RegisterEnokiWalletsOptions) {
	const clients: ClientWithCoreApi[] =
		'clients' in config
			? config.clients
			: [Object.assign(config.client, { network: config.network ?? 'mainnet' })];

	const enokiCompatibleClients = clients.filter(({ network }) => isEnokiNetwork(network));
	if (enokiCompatibleClients.length === 0) {
		throw new Error('None of the specified clients are compatible with Enoki.');
	}

	const getCurrentNetwork =
		'clients' in config ? config.getCurrentNetwork : () => clients[0].network;

	const walletsApi = getWallets();
	const wallets: Record<string, EnokiWallet> = {};

	for (const { name, icon, provider, authenticationUrl, extraParams } of [
		...(config.additionalProvidersWalletInfo ?? []),
		...ENOKI_PROVIDER_WALLETS_INFO,
	]) {
		const providerOptions = providers[provider];
		let adjustedExtraParams = providerOptions?.extraParams;

		if (adjustedExtraParams && extraParams) {
			adjustedExtraParams = () => {
				if (typeof adjustedExtraParams === 'function') {
					return { ...adjustedExtraParams(), ...extraParams };
				}
				return { ...adjustedExtraParams, ...extraParams };
			};
		}

		if (providerOptions) {
			wallets[provider] = new EnokiWallet({
				...providerOptions,
				extraParams: adjustedExtraParams,
				name,
				icon,
				provider,
				windowFeatures,
				getCurrentNetwork,
				apiKey: config.apiKey,
				apiUrl: config.apiUrl,
				clients: enokiCompatibleClients,
				authenticationUrl,
			});
		}
	}

	const unregister = walletsApi.register(...Object.values(wallets));
	return { wallets, unregister };
}

function defaultWindowFeatures() {
	const width = 500;
	const height = 800;
	const left = (screen.width - width) / 2;
	const top = (screen.height - height) / 4;

	return `popup=1;toolbar=0;status=0;resizable=1,width=${width},height=${height},top=${top},left=${left}`;
}
