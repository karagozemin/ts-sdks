// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type {
	Experimental_BaseClient,
	Experimental_SuiClientTypes,
} from '@mysten/sui/experimental';
import { DAppKitError } from './errors.js';
import type { IdentifierString } from '@mysten/wallet-standard';

type NonEmptyArray<T> = readonly [T, ...T[]] | readonly [...T[], T] | readonly [T, ...T[], T];

export type BaseClients = NonEmptyArray<Experimental_BaseClient>;

export function getChain(network: Experimental_SuiClientTypes.Network): IdentifierString {
	return `sui:${network}`;
}

export function buildNetworkConfig<TClients extends BaseClients>(clients: TClients) {
	return clients.reduce((accumulator, client) => {
		if (client.network in accumulator) {
			throw new DAppKitError(
				`Detected multiple clients configured for the "${client.network}" network. Please ensure that each client is configured with a unique network.`,
			);
		}
		return accumulator.set(client.network, client);
	}, new Map<TClients[number]['network'], TClients[number]>());
}
