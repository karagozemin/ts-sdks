// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Transaction } from '@mysten/sui/transactions';
import { fromBase64, toBase64 } from '@mysten/sui/utils';
import type {
	IdentifierString,
	StandardConnectFeature,
	StandardConnectMethod,
	StandardDisconnectFeature,
	StandardDisconnectMethod,
	StandardEventsFeature,
	StandardEventsOnMethod,
	SuiSignAndExecuteTransactionFeature,
	SuiSignAndExecuteTransactionMethod,
	SuiSignPersonalMessageFeature,
	SuiSignPersonalMessageMethod,
	SuiSignTransactionFeature,
	SuiSignTransactionMethod,
	Wallet,
} from '@mysten/wallet-standard';
import {
	ReadonlyWalletAccount,
	StandardConnect,
	StandardDisconnect,
	StandardEvents,
	SuiSignAndExecuteTransaction,
	SuiSignPersonalMessage,
	SuiSignTransaction,
} from '@mysten/wallet-standard';
import type { Emitter } from 'mitt';
import mitt from 'mitt';

import type { AuthProvider } from '../EnokiClient/type.js';
import type {
	EnokiSessionState,
	EnokiWalletOptions,
	WalletEventsMap,
	ZkLoginSession,
	ZkLoginState,
} from './types.js';
import type { EnokiGetMetadataFeature, EnokiGetMetadataMethod } from './feature.js';
import { EnokiGetMetadata } from './feature.js';
import type { ClientWithCoreApi, Experimental_SuiClientTypes } from '@mysten/sui/experimental';
import { decodeJwt } from '@mysten/sui/src/zklogin/index.js';
import type { ExportedWebCryptoKeypair } from '@mysten/signers/webcrypto';
import { WebCryptoSigner } from '@mysten/signers/webcrypto';
import { clear, createStore, get, set } from 'idb-keyval';
import type { WritableAtom } from 'nanostores';
import { atom, onMount, onSet } from 'nanostores';
import type { Encryption } from '../encryption.js';
import { createDefaultEncryption } from '../encryption.js';
import { EnokiClient } from '../EnokiClient/index.js';
import type { EnokiNetwork } from '../EnokiClient/type.js';
import { EnokiKeypair } from '../EnokiKeypair.js';
import type { SyncStore } from '../stores.js';
import { createSessionStorage } from '../stores.js';

export class EnokiWallet implements Wallet {
	#events: Emitter<WalletEventsMap>;
	#accounts: ReadonlyWalletAccount[];
	#name: string;
	#icon: Wallet['icon'];
	#enokiClient: EnokiClient;
	#clients: ClientWithCoreApi[];
	#encryption: Encryption;
	#encryptionKey: string;
	#sessionStore: SyncStore;
	#sessionStateByNetwork: Map<Experimental_SuiClientTypes.Network, EnokiSessionState>;
	#zkLoginState: WritableAtom<ZkLoginState>;
	#stateStorageKey: string;
	#provider: AuthProvider;
	#clientId: string;
	#redirectUrl: string;
	#extraParams: Record<string, string> | undefined;
	#getCurrentNetwork: () => Experimental_SuiClientTypes.Network;
	#windowFeatures?: string | (() => string);

	get name() {
		return this.#name;
	}

	get provider() {
		return this.#provider;
	}

	get icon() {
		return this.#icon;
	}

	get version() {
		return '1.0.0' as const;
	}

	get chains() {
		return [...this.#sessionStateByNetwork.keys()].map((network) => `sui:${network}` as const);
	}

	get accounts() {
		return this.#accounts;
	}

	get features(): StandardConnectFeature &
		StandardDisconnectFeature &
		StandardEventsFeature &
		SuiSignTransactionFeature &
		SuiSignAndExecuteTransactionFeature &
		SuiSignPersonalMessageFeature &
		EnokiGetMetadataFeature {
		return {
			[StandardConnect]: {
				version: '1.0.0',
				connect: this.#connect,
			},
			[StandardDisconnect]: {
				version: '1.0.0',
				disconnect: this.#disconnect,
			},
			[StandardEvents]: {
				version: '1.0.0',
				on: this.#on,
			},
			[SuiSignTransaction]: {
				version: '2.0.0',
				signTransaction: this.#signTransaction,
			},
			[SuiSignAndExecuteTransaction]: {
				version: '2.0.0',
				signAndExecuteTransaction: this.#signAndExecuteTransaction,
			},
			[SuiSignPersonalMessage]: {
				version: '1.1.0',
				signPersonalMessage: this.#signPersonalMessage,
			},
			[EnokiGetMetadata]: {
				version: '1.0.0',
				getMetadata: this.#getMetadata,
			},
		};
	}

	constructor({
		name,
		icon,
		provider,
		clientId,
		redirectUrl,
		extraParams,
		windowFeatures,
		getCurrentNetwork,
		apiKey,
		apiUrl,
		clients,
	}: EnokiWalletOptions) {
		this.#events = mitt();
		this.#name = name;
		this.#icon = icon;
		this.#enokiClient = new EnokiClient({ apiKey, apiUrl });
		this.#clients = clients;
		this.#encryptionKey = apiKey;
		this.#encryption = createDefaultEncryption();
		this.#sessionStore = createSessionStorage();
		this.#stateStorageKey = createStateStorageKey(apiKey, clientId);
		this.#zkLoginState = createZkLoginState(localStorage, this.#stateStorageKey);

		this.#sessionStateByNetwork = this.#clients.reduce((accumulator, client) => {
			const network = client.network;
			const storageKey = createSessionStorageKey(apiKey, network, clientId);
			const idbStore = createStore(`${apiKey}_${network}_${clientId}`, 'enoki');

			const sessionState: EnokiSessionState = {
				$zkLoginSession: atom({ initialized: false, value: null }),
				client,
				storageKey,
				idbStore,
			};

			onMount(sessionState.$zkLoginSession, () => {
				this.#getSession(sessionState);
			});

			return accumulator.set(network, sessionState);
		}, new Map());

		this.#provider = provider;
		this.#clientId = clientId;
		this.#redirectUrl = redirectUrl || window.location.href.split('#')[0];
		this.#extraParams = extraParams;
		this.#windowFeatures = windowFeatures;
		this.#getCurrentNetwork = getCurrentNetwork;
		this.#accounts = this.#getAuthorizedAccounts();
	}

	#signTransaction: SuiSignTransactionMethod = async ({ transaction, chain, account, signal }) => {
		signal?.throwIfAborted();

		const { client, keypair } = await this.#getSessionContext(chain);
		const parsedTransaction = Transaction.from(await transaction.toJSON());
		const suiAddress = keypair.toSuiAddress();

		if (suiAddress !== account.address) {
			throw new Error(
				`The specified account ${account.address} does not match the currently connected Enoki address ${suiAddress}.`,
			);
		}

		parsedTransaction.setSenderIfNotSet(suiAddress);
		return keypair.signTransaction(await parsedTransaction.build({ client }));
	};

	#signAndExecuteTransaction: SuiSignAndExecuteTransactionMethod = async ({
		transaction,
		chain,
		account,
		signal,
	}) => {
		signal?.throwIfAborted();

		const { client, keypair } = await this.#getSessionContext(chain);
		const parsedTransaction = Transaction.from(await transaction.toJSON());
		const bytes = await parsedTransaction.build({ client });

		const suiAddress = keypair.toSuiAddress();

		if (suiAddress !== account.address) {
			throw new Error(
				`The specified account ${account.address} does not match the currently connected Enoki address ${suiAddress}.`,
			);
		}

		parsedTransaction.setSenderIfNotSet(suiAddress);

		const result = await keypair.signAndExecuteTransaction({
			transaction: parsedTransaction,
			client,
		});

		return {
			bytes: toBase64(bytes),
			signature: result.signatures[0],
			digest: result.digest,
			effects: toBase64(result.effects.bcs!),
		};
	};

	#signPersonalMessage: SuiSignPersonalMessageMethod = async ({ message, account, chain }) => {
		const { keypair } = await this.#getSessionContext(chain);
		const suiAddress = keypair.toSuiAddress();

		if (suiAddress !== account.address) {
			throw new Error(
				`The specified account ${account.address} does not match the currently connected Enoki address ${suiAddress}.`,
			);
		}

		return keypair.signPersonalMessage(message);
	};

	#getMetadata: EnokiGetMetadataMethod = () => {
		const sessionState = this.#sessionStateByNetwork.get(this.#getCurrentNetwork());
		const session = sessionState?.$zkLoginSession.get();
		const decodedJwt = session?.value?.jwt ? decodeJwt(session.value.jwt) : undefined;

		return {
			provider: this.#provider,
			activeSession: decodedJwt ? { decodedJwt } : undefined,
		};
	};

	#on: StandardEventsOnMethod = (event, listener) => {
		this.#events.on(event, listener);
		return () => this.#events.off(event, listener);
	};

	#connect: StandardConnectMethod = async (input) => {
		if (input?.silent || this.#accounts.length > 0) {
			return { accounts: this.#accounts };
		}

		const currentNetwork = this.#getCurrentNetwork();
		await this.#createSession({ network: currentNetwork });

		this.#accounts = this.#getAuthorizedAccounts();
		this.#events.emit('change', { accounts: this.#accounts });

		return { accounts: this.#accounts };
	};

	#disconnect: StandardDisconnectMethod = async () => {
		this.#zkLoginState.set({});
		this.#sessionStore.delete(this.#stateStorageKey);

		for (const state of this.#sessionStateByNetwork.values()) {
			await clear(state.idbStore);
			await this.#setSession(state, null);
		}

		this.#accounts = [];
		this.#events.emit('change', { accounts: this.#accounts });
	};

	#getAuthorizedAccounts() {
		const { address, publicKey } = this.#zkLoginState.get();
		if (address && publicKey) {
			return [
				new ReadonlyWalletAccount({
					address,
					chains: this.chains,
					icon: this.icon,
					features: [SuiSignPersonalMessage, SuiSignTransaction, SuiSignAndExecuteTransaction],
					publicKey: fromBase64(publicKey),
				}),
			];
		}
		return [];
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

			if (state?.expiresAt && Date.now() > state.expiresAt) {
				await this.#disconnect();
			} else {
				$zkLoginSession.set({ initialized: true, value: state });
			}
		} catch {
			$zkLoginSession.set({ initialized: true, value: null });
		}

		return $zkLoginSession.get().value;
	}

	async #getProof(input: { network: Experimental_SuiClientTypes.Network }) {
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

		await this.#setSession(state, { ...zkp, proof });

		return proof;
	}

	async #getKeypair(input: { network: Experimental_SuiClientTypes.Network }) {
		const state = this.#sessionStateByNetwork.get(input.network);
		if (!state) throw new Error(`The network ${input.network} isn't supported.`);

		await this.#getProof(input);

		const zkp = await this.#getSession(state);

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

	async #getSessionContext(chain?: IdentifierString) {
		const sessionState = chain ? this.#sessionStateByNetwork.get(chain.split(':')[1]) : null;
		if (!sessionState) {
			throw new Error(
				`A valid Sui chain identifier was not provided in the request. Please report this issue to the dApp developer. Examples of valid Sui chain identifiers are 'sui:testnet' and 'sui:mainnet'. Consider using the '@mysten/dapp-kit' package, which provides this value automatically.`,
			);
		}

		const zkLoginSession = await this.#getSession(sessionState);
		if (!zkLoginSession) {
			await this.#createSession({ network: sessionState.client.network });
		}

		const keypair = await this.#getKeypair({
			network: sessionState.client.network,
		});

		return { client: sessionState.client, keypair };
	}

	async #createSession({ network }: { network: Experimental_SuiClientTypes.Network }) {
		const popup = window.open(
			undefined,
			'_blank',
			typeof this.#windowFeatures === 'function' ? this.#windowFeatures() : this.#windowFeatures,
		);

		if (!popup) {
			throw new Error('Failed to open popup');
		}

		popup.location = await this.#createAuthorizationURL({ network });

		return await new Promise<void>((resolve, reject) => {
			const interval = setInterval(() => {
				try {
					if (popup.closed) {
						clearInterval(interval);
						reject(new Error('Popup closed'));
					}

					if (!popup.location.hash) {
						return;
					}
				} catch (e) {
					return;
				}
				clearInterval(interval);

				this.#handleAuthCallback({ hash: popup.location.hash, network }).then(
					() => resolve(),
					reject,
				);

				try {
					popup.close();
				} catch (e) {
					console.error(e);
				}
			}, 16);
		});
	}

	async #createAuthorizationURL(input: { network: Experimental_SuiClientTypes.Network }) {
		const state = this.#sessionStateByNetwork.get(input.network);
		if (!state) throw new Error(`The network ${input.network} isn't supported.`);

		const ephemeralKeyPair = await WebCryptoSigner.generate();
		const { nonce, randomness, maxEpoch, estimatedExpiration } =
			await this.#enokiClient.createZkLoginNonce({
				network: input.network as EnokiNetwork,
				ephemeralPublicKey: ephemeralKeyPair.getPublicKey(),
			});

		const params = new URLSearchParams({
			...this.#extraParams,
			nonce,
			client_id: this.#clientId,
			redirect_uri: this.#redirectUrl,
			response_type: 'id_token',
			scope: ['openid', ...(this.#extraParams?.scope ? this.#extraParams.scope.split(' ') : [])]
				.filter(Boolean)
				.join(' '),
		});

		let oauthUrl: string;
		switch (this.#provider) {
			case 'google':
				oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
				break;
			case 'facebook':
				oauthUrl = `https://www.facebook.com/v17.0/dialog/oauth?${params}`;
				break;
			case 'twitch':
				params.set('force_verify', 'true');
				oauthUrl = `https://id.twitch.tv/oauth2/authorize?${params}`;
				break;
			default:
				throw new Error(`Invalid provider: ${this.#provider}`);
		}

		await set('ephemeralKeyPair', ephemeralKeyPair.export(), state.idbStore);
		await this.#setSession(state, {
			expiresAt: estimatedExpiration,
			maxEpoch,
			randomness,
		});

		return oauthUrl;
	}

	async #handleAuthCallback({
		hash,
		network,
	}: {
		hash: string;
		network: Experimental_SuiClientTypes.Network;
	}) {
		const state = this.#sessionStateByNetwork.get(network);
		if (!state) throw new Error(`The network ${network} isn't supported.`);

		const params = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash);
		const zkp = await this.#getSession(state);

		if (!zkp?.maxEpoch || !zkp.randomness) {
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

		this.#zkLoginState.set({ address, publicKey });
		await this.#setSession(state, { ...zkp, jwt });

		return params.get('state');
	}
}

function createZkLoginState(storage: Storage, storageKey: string) {
	let storedState = null;

	try {
		const rawStoredValue = storage.getItem(storageKey);
		if (rawStoredValue) {
			storedState = JSON.parse(rawStoredValue);
		}
	} catch {
		// Ignore errors
	}

	const $zkLoginState = atom(storedState || {});

	onSet($zkLoginState, ({ newValue }) => {
		storage.setItem(storageKey, JSON.stringify(newValue));
	});

	return $zkLoginState;
}

function createStateStorageKey(apiKey: string, clientId: string) {
	return `@enoki/flow/state/${apiKey}/${clientId}`;
}

function createSessionStorageKey(
	apiKey: string,
	network: Experimental_SuiClientTypes.Network,
	clientId: string,
) {
	return `@enoki/flow/session/${apiKey}/${network}/${clientId}`;
}
