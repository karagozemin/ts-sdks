// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { ExportedWebCryptoKeypair } from '@mysten/signers/webcrypto';
import { WebCryptoSigner } from '@mysten/signers/webcrypto';
import { decodeJwt } from '@mysten/sui/zklogin';
import type { ZkLoginSignatureInputs } from '@mysten/sui/zklogin';
import type { UseStore } from 'idb-keyval';
import { clear, createStore, get, set } from 'idb-keyval';
import type { WritableAtom } from 'nanostores';
import { atom, onMount, onSet } from 'nanostores';

import type { Encryption } from '../encryption.js';
import { createDefaultEncryption } from '../encryption.js';
import type { EnokiClientConfig } from '../EnokiClient/index.js';
import { EnokiClient } from '../EnokiClient/index.js';
import type { AuthProvider, EnokiNetwork } from '../EnokiClient/type.js';
import { EnokiKeypair } from '../EnokiKeypair.js';
import type { SyncStore } from '../stores.js';
import { createSessionStorage } from '../stores.js';
import type { ClientWithCoreApi, Experimental_SuiClientTypes } from '@mysten/sui/experimental';

type EnokiFlowConfig = EnokiClientConfig & {
	clients: ClientWithCoreApi[];
	providerId: string;
};

// State that is not bound to a session, and is encrypted.
interface ZkLoginState {
	provider?: AuthProvider;
	address?: string;
	publicKey?: string;
}

// State that session-bound, and is encrypted in storage.
interface ZkLoginSession {
	maxEpoch: number;
	randomness: string;
	expiresAt: number;

	jwt?: string;
	proof?: ZkLoginSignatureInputs;
}

export type EnokiSessionState = {
	idbStore: UseStore;
	client: ClientWithCoreApi;
	storageKey: string;
	$zkLoginSession: WritableAtom<{ initialized: boolean; value: ZkLoginSession | null }>;
};

function createStateStorageKey(apiKey: string, providerId: string) {
	return `@enoki/flow/state/${apiKey}/${providerId}` as const;
}

function createSessionStorageKey(
	apiKey: string,
	network: Experimental_SuiClientTypes.Network,
	providerId: string,
) {
	return `@enoki/flow/session/${apiKey}/${network}/${providerId}` as const;
}

export class INTERNAL_ONLY_EnokiFlow {
	#enokiClient: EnokiClient;
	#clients: ClientWithCoreApi[];
	#encryption: Encryption;
	#encryptionKey: string;
	#sessionStore: SyncStore;
	#sessionStateByNetwork: Map<Experimental_SuiClientTypes.Network, EnokiSessionState>;
	#zkLoginState: WritableAtom<ZkLoginState>;
	#stateStorageKey: string;

	constructor(config: EnokiFlowConfig) {
		this.#enokiClient = new EnokiClient({
			apiKey: config.apiKey,
			apiUrl: config.apiUrl,
		});
		this.#clients = config.clients;
		this.#encryptionKey = config.apiKey;
		this.#encryption = createDefaultEncryption();
		this.#sessionStore = createSessionStorage();
		this.#stateStorageKey = createStateStorageKey(config.apiKey, config.providerId);

		this.#sessionStateByNetwork = this.#clients.reduce((accumulator, client) => {
			const network = client.network as Experimental_SuiClientTypes.Network;
			const storageKey = createSessionStorageKey(config.apiKey, network, config.providerId);
			const idbStore = createStore(`${config.apiKey}_${network}`, 'enoki');

			const state: EnokiSessionState = {
				$zkLoginSession: atom({ initialized: false, value: null }),
				client,
				storageKey,
				idbStore,
			};

			// Hydrate the session on mount:
			onMount(state.$zkLoginSession, () => {
				this.#getSession(state);
			});

			return accumulator.set(network, state);
		}, new Map());

		let storedState = null;
		const stateStore = localStorage ?? this.#sessionStore;

		try {
			const rawStoredValue = stateStore.getItem(this.#stateStorageKey);
			if (rawStoredValue) {
				storedState = JSON.parse(rawStoredValue);
			}
		} catch {
			// Ignore errors
		}

		this.#zkLoginState = atom(storedState || {});

		onSet(this.#zkLoginState, ({ newValue }) => {
			stateStore.setItem(this.#stateStorageKey, JSON.stringify(newValue));
		});
	}

	async createAuthorizationURL(input: {
		provider: AuthProvider;
		clientId: string;
		redirectUrl: string;
		network: Experimental_SuiClientTypes.Network;
		extraParams?: Record<string, string>;
	}) {
		const state = this.#sessionStateByNetwork.get(input.network);
		if (!state) throw new Error(`The network ${input.network} isn't supported.`);

		const ephemeralKeyPair = await WebCryptoSigner.generate();
		const { nonce, randomness, maxEpoch, estimatedExpiration } =
			await this.#enokiClient.createZkLoginNonce({
				network: input.network as EnokiNetwork,
				ephemeralPublicKey: ephemeralKeyPair.getPublicKey(),
			});

		const params = new URLSearchParams({
			...input.extraParams,
			nonce,
			client_id: input.clientId,
			redirect_uri: input.redirectUrl,
			response_type: 'id_token',
			// TODO: Eventually fetch the scopes for this client ID from the Enoki service:
			scope: [
				'openid',
				// Merge the requested scopes in with the required openid scopes:
				...(input.extraParams?.scope ? input.extraParams.scope.split(' ') : []),
			]
				.filter(Boolean)
				.join(' '),
		});

		let oauthUrl: string;
		switch (input.provider) {
			case 'google': {
				oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
				break;
			}
			case 'facebook': {
				oauthUrl = `https://www.facebook.com/v17.0/dialog/oauth?${params}`;
				break;
			}
			case 'twitch': {
				params.set('force_verify', 'true');
				oauthUrl = `https://id.twitch.tv/oauth2/authorize?${params}`;
				break;
			}
			default:
				throw new Error(`Invalid provider: ${input.provider}`);
		}

		this.#zkLoginState.set({ provider: input.provider });

		await set('ephemeralKeyPair', ephemeralKeyPair.export(), state.idbStore);
		await this.#setSession(state, {
			expiresAt: estimatedExpiration,
			maxEpoch,
			randomness,
		});

		return oauthUrl;
	}

	async handleAuthCallback({
		hash = window.location.hash,
		network,
	}: {
		hash?: string;
		network: Experimental_SuiClientTypes.Network;
	}) {
		const state = this.#sessionStateByNetwork.get(network);
		if (!state) throw new Error(`The network ${network} isn't supported.`);

		const params = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash);

		// Before we handle the auth redirect and get the state, we need to restore it:
		const zkp = await this.#getSession(state);

		if (!zkp || !zkp.maxEpoch || !zkp.randomness) {
			throw new Error(
				'Start of sign-in flow could not be found. Ensure you have started the sign-in flow before calling this.',
			);
		}

		const jwt = params.get('id_token');
		if (!jwt) {
			throw new Error('Missing ID Token');
		}

		decodeJwt(jwt);

		const { address, publicKey } = await this.#enokiClient.getZkLogin({ jwt });

		this.#zkLoginState.set({
			address,
			publicKey,
		});

		await this.#setSession(state, {
			...zkp,
			jwt,
		});

		return params.get('state');
	}

	get sessionStateByNetwork() {
		return this.#sessionStateByNetwork;
	}

	get zkLoginState() {
		return this.#zkLoginState.get();
	}

	async #setSession(state: EnokiSessionState, newValue: ZkLoginSession | null) {
		if (newValue) {
			const storedValue = await this.#encryption.encrypt(
				this.#encryptionKey,
				JSON.stringify(newValue),
			);

			this.#sessionStore.set(state.storageKey, storedValue);
		} else {
			this.#sessionStore.delete(state.storageKey);
		}

		state.$zkLoginSession.set({ initialized: true, value: newValue });
	}

	async #getSession({ $zkLoginSession, storageKey }: EnokiSessionState) {
		if ($zkLoginSession.get().initialized) {
			return $zkLoginSession.get().value;
		}

		try {
			const storedValue = this.#sessionStore.get(storageKey);
			if (!storedValue) return null;

			const state: ZkLoginSession = JSON.parse(
				await this.#encryption.decrypt(this.#encryptionKey, storedValue),
			);

			// TODO: Rather than having expiration act as a logout, we should keep the state that still is relevant,
			// and just clear out the expired session, but keep the other zkLogin state.
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

	async logout() {
		this.#zkLoginState.set({});
		this.#sessionStore.delete(this.#stateStorageKey);

		for (const state of this.#sessionStateByNetwork.values()) {
			await clear(state.idbStore);
			await this.#setSession(state, null);
		}
	}

	// TODO: Should this return the proof if it already exists?
	async getProof(input: { network: Experimental_SuiClientTypes.Network }) {
		const state = this.#sessionStateByNetwork.get(input.network);
		if (!state) throw new Error(`The network ${input.network} isn't supported.`);

		const zkp = await this.#getSession(state);

		if (zkp?.proof) {
			if (zkp.expiresAt && Date.now() > zkp.expiresAt) {
				throw new Error('Stored proof is expired.');
			}

			return zkp.proof;
		}

		if (!zkp?.jwt) {
			throw new Error('Missing required parameters for proof generation');
		}

		const storedNativeSigner = await get<ExportedWebCryptoKeypair>(
			'ephemeralKeyPair',
			state.idbStore,
		);
		if (!storedNativeSigner) {
			throw new Error('Native signer not found in store.');
		}

		const ephemeralKeyPair = WebCryptoSigner.import(storedNativeSigner);

		const proof = await this.#enokiClient.createZkLoginZkp({
			network: input.network as EnokiNetwork,
			jwt: zkp.jwt,
			maxEpoch: zkp.maxEpoch,
			randomness: zkp.randomness,
			ephemeralPublicKey: ephemeralKeyPair.getPublicKey(),
		});

		await this.#setSession(state, {
			...zkp,
			proof,
		});

		return proof;
	}

	async getKeypair(input: { network: Experimental_SuiClientTypes.Network }) {
		const state = this.#sessionStateByNetwork.get(input.network);
		if (!state) throw new Error(`The network ${input.network} isn't supported.`);

		// Get the proof, so that we ensure it exists in state:
		await this.getProof(input);

		const zkp = await this.#getSession(state);

		// Check to see if we have the essentials for a keypair:
		const { address } = this.#zkLoginState.get();
		if (!address || !zkp || !zkp.proof) {
			throw new Error('Missing required data for keypair generation.');
		}

		if (Date.now() > zkp.expiresAt) {
			throw new Error('Stored proof is expired.');
		}

		const storedNativeSigner = await get<ExportedWebCryptoKeypair>(
			'ephemeralKeyPair',
			state.idbStore,
		);

		if (!storedNativeSigner) {
			throw new Error('Native signer not found in store.');
		}

		const ephemeralKeypair = WebCryptoSigner.import(storedNativeSigner);

		return new EnokiKeypair({
			address,
			ephemeralKeypair,
			maxEpoch: zkp.maxEpoch,
			proof: zkp.proof,
		});
	}
}
