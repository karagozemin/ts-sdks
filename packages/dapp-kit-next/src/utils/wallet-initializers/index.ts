import { ClientWithCoreApi } from '@mysten/sui/experimental';
import { Networks } from '../networks.js';
import { Wallet } from '@mysten/wallet-standard';

export type UnregisterCallback = () => void;

export type WalletInitializerArgs<TNetworks extends Networks> = {
	networks: TNetworks;
	getClient: (network: TNetworks[number]) => ClientWithCoreApi;
};

export type WalletInitializerResult = {
	unregister: UnregisterCallback;
	wallets: Wallet[];
};

export type WalletInitializerCallback<TNetworks extends Networks = Networks> = (
	input: WalletInitializerArgs<TNetworks>,
) => Promise<WalletInitializerResult> | WalletInitializerResult;

const unregisterCallbacks: UnregisterCallback[] = [];

export async function registerAdditionalWallets<TNetworks extends Networks>(
	initializers: WalletInitializerCallback<TNetworks>[],
	args: WalletInitializerArgs<TNetworks>,
) {
	unregisterCallbacks.forEach((unregister) => unregister());
	unregisterCallbacks.length = 0;

	const settledResults = await Promise.allSettled(initializers.map((init) => init(args)));

	for (const settledResult of settledResults) {
		if (settledResult.status === 'fulfilled') {
			unregisterCallbacks.push(settledResult.value.unregister);
		}
	}
}
