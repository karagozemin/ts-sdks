// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import type {
	Experimental_BaseClient,
	Experimental_SuiClientTypes,
} from '@mysten/sui/experimental';
import { DAppKitError } from './errors.js';
import type { IdentifierString } from '@mysten/wallet-standard';

export function getChain(network: Experimental_SuiClientTypes.Network): IdentifierString {
	return `sui:${network}`;
}

export function buildNetworkConfig<TClients extends Experimental_BaseClient[]>(clients: TClients) {
	if (clients.length === 0) {
		throw new DAppKitError(
			'You must specify at least one Sui client. Throw error or default to devnet/localnet/testnet???',
		);
	}

	const networkConfig = clients.reduce<
		Partial<Record<TClients[number]['network'], TClients[number]>>
	>((accumulator, client) => {
		if (client.network in accumulator) {
			throw new DAppKitError(
				`Detected multiple clients configured for the "${client.network}" network. Please ensure that each client is configured with a unique network.`,
			);
		}
		accumulator[client.network as TClients[number]['network']] = client;
		return accumulator;
	}, {});

	return networkConfig;
}
