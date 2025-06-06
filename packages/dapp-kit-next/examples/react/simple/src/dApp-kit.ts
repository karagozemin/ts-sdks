// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
	c,
	createDAppKit,
	registerUnsafeBurnerWallet,
	UnsafeBurnerWallet,
} from '@mysten/dapp-kit-next';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { getWallets, registerWallet } from '@mysten/wallet-standard';

export const a = c();

export const dAppKit = createDAppKit({
	slushWalletConfig: {
		name: 'Eample App',
	},
	walletInitializers: import.meta.env.DEV ? [registerUnsafeBurnerWallet] : [],
	networks: ['mainnet', 'testnet'],
	defaultNetwork: 'testnet',
	createClient(network) {
		return new SuiClient({ network, url: getFullnodeUrl(network) });
	},
});

console.log('goo', getWallets().register);

// function registerBurnerWallet() {
// 	const wallets = getWallets();
// 	const set = new Set(wallets.get());

// 	// @ts-ignore
// 	globalThis.UNSAFE ||= new UnsafeBurnerWallet({
// 		clients: (['mainnet', 'testnet'] as const).map((n) => dAppKit.getClient(n)),
// 	});

// 	// @ts-ignore
// 	wallets.register(globalThis.UNSAFE);
// }

// registerBurnerWallet();

// registerWallet();
console.log('oskfoskoodofkdofdkfodkoodooooefABoooooooosfdsdosC');
