// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { ClientWithCoreApi, SuiClientRegistration } from '@mysten/sui/src/experimental';

export interface SuiNsCompatibleClient extends ClientWithCoreApi {}

export interface SuiNsClientExtensionOptions {}

export interface SuiNsClientOptions extends SuiNsClientExtensionOptions {
	client: SuiNsCompatibleClient;
}

export class SuiNsClient {
	#client: SuiNsCompatibleClient;

	constructor(options: SuiNsClientOptions) {
		if (options.client.network !== 'mainnet' && options.client.network !== 'testnet') {
			if (options.client.network === 'unknown') {
				throw new Error('network must be defined on SuiClient');
			}
			throw new Error('SuiNsClient only supports mainnet and testnet');
		}

		this.#client = options.client;
	}

	static asClientExtension(
		options: SuiNsClientExtensionOptions = {},
	): SuiClientRegistration<SuiNsCompatibleClient, 'suins', SuiNsClient> {
		return {
			name: 'suins',
			register: (client) => {
				return new SuiNsClient({ client, ...options });
			},
		};
	}
}
