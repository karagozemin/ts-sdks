// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { UseStore } from 'idb-keyval';
import { clear, createStore, del, get, set } from 'idb-keyval';
import type { WritableAtom } from 'nanostores';
import { atom, onMount, onSet } from 'nanostores';

import type { Encryption } from '../encryption.js';
import { createDefaultEncryption } from '../encryption.js';
import type { EnokiClientConfig } from '../EnokiClient/index.js';
import type { ClientWithCoreApi, Experimental_SuiClientTypes } from '@mysten/sui/experimental';

import type { EnokiSessionContext, ZkLoginSession, ZkLoginState } from './types.js';

export type EnokiWalletStateConfig = EnokiClientConfig & {
	clients: ClientWithCoreApi[];
	clientId: string;
};

export class EnokiWalletState {
	#encryption: Encryption;
	#encryptionKey: string;

	#stateStore: UseStore;
	#sessionContextByNetwork: Map<Experimental_SuiClientTypes.Network, EnokiSessionContext>;
	#zkLoginState: Promise<WritableAtom<ZkLoginState | null>>;

	constructor(config: EnokiWalletStateConfig) {
		this.#encryptionKey = config.apiKey;
		this.#encryption = createDefaultEncryption();

		this.#stateStore = createStore(`${config.apiKey}_${config.clientId}`, 'enoki');
		this.#zkLoginState = this.#hydrateZkLoginState();

		this.#sessionContextByNetwork = config.clients.reduce((accumulator, client) => {
			const network = client.network;
			const idbStore = createStore(`${config.apiKey}_${network}_${config.clientId}`, 'enoki');

			const sessionContext: EnokiSessionContext = {
				$zkLoginSession: atom({ initialized: false, value: null }),
				client,
				idbStore,
			};

			onMount(sessionContext.$zkLoginSession, () => {
				this.getSession(sessionContext);
			});

			return accumulator.set(network, sessionContext);
		}, new Map());
	}

	get zkLoginState() {
		return this.#zkLoginState;
	}

	get sessionContextByNetwork() {
		return this.#sessionContextByNetwork;
	}

	getSessionContext(network: Experimental_SuiClientTypes.Network) {
		const context = this.#sessionContextByNetwork.get(network);
		if (!context) {
			throw new Error(`The network ${network} isn't supported.`);
		}

		return context;
	}

	async logout() {
		await clear(this.#stateStore);

		const zkLoginState = await this.zkLoginState;
		zkLoginState.set(null);

		for (const context of this.#sessionContextByNetwork.values()) {
			await clear(context.idbStore);
			await this.setSession(context, null);
		}
	}

	async setSession(context: EnokiSessionContext, newValue: ZkLoginSession | null) {
		if (newValue) {
			const storedValue = await this.#encryption.encrypt(
				this.#encryptionKey,
				JSON.stringify(newValue),
			);

			await set('zklogin-session', storedValue, context.idbStore);
		} else {
			await del('zklogin-session', context.idbStore);
		}

		context.$zkLoginSession.set({ initialized: true, value: newValue });
	}

	async getSession({ $zkLoginSession, idbStore }: EnokiSessionContext) {
		if ($zkLoginSession.get().initialized) {
			return $zkLoginSession.get().value;
		}

		try {
			const storedValue = await get('zklogin-session', idbStore);
			if (!storedValue) return null;

			const state: ZkLoginSession = JSON.parse(
				await this.#encryption.decrypt(this.#encryptionKey, storedValue),
			);

			if (state?.expiresAt && Date.now() > state.expiresAt) {
				await this.logout();
			} else {
				$zkLoginSession.set({ initialized: true, value: state });
			}
		} catch {
			$zkLoginSession.set({ initialized: true, value: null });
		}

		return $zkLoginSession.get().value;
	}

	async #hydrateZkLoginState() {
		let storedState: ZkLoginState | null = null;

		try {
			const rawStoredValue = await get<string>('zklogin-state', this.#stateStore);
			if (rawStoredValue) {
				storedState = JSON.parse(rawStoredValue);
			}
		} catch {
			// Ignore errors
		}

		const $zkLoginState = atom<ZkLoginState | null>(storedState);

		onSet($zkLoginState, ({ newValue }) => {
			set('zklogin-state', JSON.stringify(newValue), this.#stateStore);
		});

		return $zkLoginState;
	}
}
