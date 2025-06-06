import { ClientWithCoreApi } from '@mysten/sui/experimental';
import { Networks } from '../networks';
import { Wallet } from '@mysten/wallet-standard';

export type UnregisterCallback = () => void;

export type WalletInitializerArgs<TNetworks extends Networks> = {
	networks: TNetworks;
	getClient: (network: TNetworks[number]) => ClientWithCoreApi;
};

export type WalletInitializerResult = {
	unregister: UnregisterCallback;
} & ({ wallet: Wallet } | { wallets: Wallet[] });

export type WalletInitializerCallback<TNetworks extends Networks> = (
	input: WalletInitializerArgs<TNetworks>,
) => Promise<WalletInitializerResult> | WalletInitializerResult;

const unregisterCallbacks: UnregisterCallback[] = [];

export async function registerAdditionalWallets<TNetworks extends Networks>(
	initializers: WalletInitializerCallback<TNetworks>[],
) {
	unregisterCallbacks.forEach((unregister) => unregister());
	unregisterCallbacks.length = 0;

	const settledResults = await Promise.allSettled(
		initializers.map((init) => init({ networks, getClient })),
	);

	for (const settledResult of settledResults) {
		if (settledResult.status === 'fulfilled') {
			unregisterCallbacks.push(settledResult.value.unregister);
		}
	}
}
