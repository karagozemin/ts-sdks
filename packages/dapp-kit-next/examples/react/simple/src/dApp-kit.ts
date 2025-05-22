// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { createDAppKit, registerUnsafeBurnerWallet } from '@mysten/dapp-kit-next';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';

export const dAppKit = createDAppKit({
	slushWalletConfig: {
		name: 'Example App',
	},
	walletInitializers: import.meta.env.DEV ? [registerUnsafeBurnerWallet] : [],
	networks: ['mainnet', 'testnet'],
	defaultNetwork: 'testnet',
	createClient(network) {
		return new SuiClient({ network, url: getFullnodeUrl(network) });
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(() => {
		console.log('ABC');
		import.meta.hot?.invalidate('Welp');
	});
}
console.log('borat');
