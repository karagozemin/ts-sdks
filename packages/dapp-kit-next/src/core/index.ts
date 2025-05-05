// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { computed, readonlyType } from 'nanostores';
import { createState } from './state.js';
import { syncRegisteredWallets } from './initializers/registered-wallets.js';
import { createActions } from './actions/index.js';

export type DAppKit = ReturnType<typeof createDAppKit>;

type CreateDAppKitOptions = void;

let defaultInstance: DAppKit | undefined;

export function createDAppKit(options: CreateDAppKitOptions) {
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

function createDAppKitInstance(_: CreateDAppKitOptions) {
	const state = createState();
	const actions = createActions(state);

	syncRegisteredWallets(state);

	return {
		...actions,
		$state: readonlyType(state.$state),
		$wallets: computed(state.$state, (state) => state.wallets),
		$currentWallet: state.$currentWallet,
		$currentAccount: computed([state.$state], (state) => {
			switch (state.connectionStatus) {
				case 'connected':
					return {
						account: state.currentAccount,
						supportedIntents: state.supportedIntents,
						connectionStatus: state.connectionStatus,
						isConnected: true,
						isConnecting: false,
						isDisconnected: false,
					} as const;
				case 'connecting':
					return {
						account: state.currentAccount,
						supportedIntents: state.supportedIntents,
						connectionStatus: state.connectionStatus,
						isConnected: false,
						isConnecting: true,
						isDisconnected: false,
					} as const;
				case 'disconnected':
					return {
						account: state.currentAccount,
						supportedIntents: state.supportedIntents,
						connectionStatus: state.connectionStatus,
						isConnected: false,
						isConnecting: false,
						isDisconnected: true,
					} as const;
				default:
					throw new Error(`Encountered unknown connection status: ${state}`);
			}
		}),
	};
}
