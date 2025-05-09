// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import type {
	Experimental_BaseClient,
	Experimental_SuiClientTypes,
} from '@mysten/sui/src/experimental';
import { DAppKitError } from './errors.js';

export function getChain(network: Experimental_SuiClientTypes.Network) {
	return `sui:${network}`;
}

export function buildNetworkConfig<TClients extends Experimental_BaseClient[]>(clients: TClients) {
	if (clients.length === 0) {
		throw new DAppKitError(
			'You must specify at least one Sui client. Throw error or default to devnet/localnet/testnet???',
		);
	}

	return clients.reduce((accumulator, client) => {
		if (accumulator.has(client.network)) {
			throw new DAppKitError(
				`Detected multiple clients configured for the "${client.network}" network. Please ensure that each client is configured with a unique network.`,
			);
		}
		return accumulator.set(client.network, client);
	}, new Map<TClients[number]['network'], TClients[number]>());
}
