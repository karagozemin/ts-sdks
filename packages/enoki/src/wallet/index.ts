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
	getWallets,
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

import type { AuthProvider, EnokiNetwork } from '../EnokiClient/type.js';
import { ENOKI_PROVIDER_WALLETS_INFO } from './providers.js';
import type { EnokiSessionState } from './state.js';
import { INTERNAL_ONLY_EnokiFlow } from './state.js';
import type { RegisterEnokiWalletsOptions, WalletEventsMap } from './types.js';
import type { EnokiGetMetadataFeature, EnokiGetMetadataMethod } from './features.js';
import { EnokiGetMetadata } from './features.js';
import type { ClientWithCoreApi, Experimental_SuiClientTypes } from '@mysten/sui/experimental';
import type { UiWallet } from '@wallet-standard/ui';
import { getWalletFeature } from '@wallet-standard/ui';
import { isEnokiNetwork } from '../utils.js';

export class EnokiWallet implements Wallet {
	#events: Emitter<WalletEventsMap>;
	#accounts: ReadonlyWalletAccount[];
	#name: string;
	#icon: Wallet['icon'];
	#flow: INTERNAL_ONLY_EnokiFlow;
	#provider: AuthProvider;
	#clientId: string;
	#redirectUrl: string | undefined;
	#extraParams: Record<string, string> | undefined;
	#sessionStateByChain: Map<IdentifierString, EnokiSessionState>;
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
		return [...this.#sessionStateByChain.keys()];
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
		flow,
		provider,
		clientId,
		redirectUrl,
		extraParams,
		windowFeatures,
		getCurrentNetwork,
	}: {
		icon: Wallet['icon'];
		name: string;
		flow: INTERNAL_ONLY_EnokiFlow;
		provider: AuthProvider;
		clientId: string;
		redirectUrl?: string;
		extraParams?: Record<string, string>;
		windowFeatures?: string | (() => string);
		getCurrentNetwork: () => Experimental_SuiClientTypes.Network;
	}) {
		this.#events = mitt();
		this.#name = name;
		this.#icon = icon;
		this.#flow = flow;
		this.#provider = provider;
		this.#clientId = clientId;
		this.#redirectUrl = redirectUrl;
		this.#extraParams = extraParams;
		this.#windowFeatures = windowFeatures;
		this.#sessionStateByChain = new Map(
			Array.from(
				this.#flow.sessionStateByNetwork,
				([network, value]) => [`sui:${network}`, value] as const,
			),
		);

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
		return {
			provider: this.#provider,
		};
	};

	#on: StandardEventsOnMethod = (event, listener) => {
		this.#events.on(event, listener);
		return () => this.#events.off(event, listener);
	};

	#getAuthorizedAccounts() {
		const { address, publicKey } = this.#flow.zkLoginState;
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

	#connect: StandardConnectMethod = async (input) => {
		if (input?.silent || this.#accounts.length > 0) {
			return { accounts: this.#accounts };
		}

		const currentNetwork = this.#getCurrentNetwork();
		await this.#createSession({ network: currentNetwork as EnokiNetwork });

		this.#accounts = this.#getAuthorizedAccounts();
		this.#events.emit('change', { accounts: this.#accounts });

		return { accounts: this.#accounts };
	};

	#disconnect: StandardDisconnectMethod = async () => {
		await this.#flow.logout();

		this.#accounts = [];
		this.#events.emit('change', { accounts: this.#accounts });
	};

	async #getSessionContext(chain?: IdentifierString) {
		const sessionState = chain ? this.#sessionStateByChain.get(chain) : null;
		if (!sessionState) {
			throw new Error(
				`A valid Sui chain identifier was not provided in the request. Please report this issue to the dApp developer. Examples of valid Sui chain identifiers are 'sui:testnet' and 'sui:mainnet'. Consider using the '@mysten/dapp-kit' package, which provides this value automatically.`,
			);
		}

		const zkLoginSession = sessionState.$zkLoginSession.get();
		if (!zkLoginSession.value) {
			await this.#createSession({ network: sessionState.client.network as EnokiNetwork });
		}

		const keypair = await this.#flow.getKeypair({
			network: sessionState.client.network as EnokiNetwork,
		});
		return { client: sessionState.client, keypair };
	}

	async #createSession({ network }: { network: EnokiNetwork }) {
		const popup = window.open(
			undefined,
			'_blank',
			typeof this.#windowFeatures === 'function' ? this.#windowFeatures() : this.#windowFeatures,
		);
		if (!popup) {
			throw new Error('Failed to open popup');
		}

		const url = await this.#flow.createAuthorizationURL({
			network,
			provider: this.#provider,
			clientId: this.#clientId,
			redirectUrl: this.#redirectUrl ?? window.location.href.split('#')[0],
			extraParams: this.#extraParams,
		});

		popup.location = url;

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

				this.#flow
					.handleAuthCallback({ hash: popup.location.hash, network })
					.then(() => resolve(), reject);

				try {
					popup.close();
				} catch (e) {
					console.error(e);
				}
			}, 16);
		});
	}
}

export function registerEnokiWallets({
	providers,
	clients,
	windowFeatures = defaultWindowFeatures,
	getCurrentNetwork,
	...config
}: RegisterEnokiWalletsOptions) {
	const enokiCompatibleClients = clients.filter(({ network }) => isEnokiNetwork(network));
	if (enokiCompatibleClients.length === 0) {
		throw new Error('None of the specified clients are compatible with Enoki.');
	}

	const walletsApi = getWallets();
	const wallets: Partial<Record<AuthProvider, EnokiWallet>> = {};

	for (const { name, icon, provider } of ENOKI_PROVIDER_WALLETS_INFO) {
		const providerOptions = providers[provider];

		if (providerOptions) {
			const { clientId, redirectUrl, extraParams } = providerOptions;
			const flow = new INTERNAL_ONLY_EnokiFlow({
				...config,
				providerId: `${provider}:${clientId}`,
				clients: enokiCompatibleClients,
			});

			const wallet = new EnokiWallet({
				name,
				icon,
				flow,
				provider,
				clientId,
				redirectUrl,
				extraParams,
				windowFeatures,
				getCurrentNetwork,
			});

			wallets[provider] = wallet;
		}
	}

	const unregister = walletsApi.register(...Object.values(wallets));
	return { wallets, unregister };
}

export function enokiWalletsInitializer(
	options: Omit<RegisterEnokiWalletsOptions, 'clients' | 'getCurrentNetwork'>,
) {
	return {
		id: 'enoki-wallets-initializer',
		async initialize<TNetworks extends readonly Experimental_SuiClientTypes.Network[]>({
			networks,
			getClient,
		}: {
			networks: TNetworks;
			getClient: (network?: TNetworks[number]) => ClientWithCoreApi;
		}) {
			const { unregister } = registerEnokiWallets({
				...options,
				getCurrentNetwork: () => getClient().network,
				clients: networks.map(getClient),
			});

			return { unregister };
		},
	};
}

export function isEnokiWallet(wallet: UiWallet): boolean;
export function isEnokiWallet(wallet: Wallet): wallet is EnokiWallet;
export function isEnokiWallet(wallet: Wallet | UiWallet) {
	if (Array.isArray(wallet.features)) {
		return wallet.features.includes(EnokiGetMetadata);
	}
	return EnokiGetMetadata in wallet.features;
}

export function getEnokiWalletMetadata(enokiWallet: UiWallet) {
	const { getMetadata } = getWalletFeature(
		enokiWallet,
		EnokiGetMetadata,
	) as EnokiGetMetadataFeature[typeof EnokiGetMetadata];

	return getMetadata();
}

export function defaultWindowFeatures() {
	const width = 500;
	const height = 800;
	const left = (screen.width - width) / 2;
	const top = (screen.height - height) / 4;

	return `popup=1;toolbar=0;status=0;resizable=1,width=${width},height=${height},top=${top},left=${left}`;
}
