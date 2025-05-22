// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { createDAppKit, registerUnsafeBurnerWallet } from '@mysten/dapp-kit-next';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { cleanStores } from 'nanostores';

export const dAppKit = createDAppKit({
	slushWalletConfig: {
		name: 'Example App',
	},
	//walletInitializers: import.meta.env.DEV ? [registerUnsafeBurnerWallet] : [],
	networks: ['mainnet', 'testnet'],
	defaultNetwork: 'testnet',
	createClient(network) {
		return new SuiClient({ network, url: getFullnodeUrl(network) });
	},
});

if (import.meta.hot) {
	import.meta.hot.accept();
	import.meta.hot.dispose(() => {
		console.log('stores', Object.values(globalThis.__DEFAULT_DAPP_KIT_INSTANCE__.stores));
		cleanStores(...Object.values(globalThis.__DEFAULT_DAPP_KIT_INSTANCE__.stores));
		globalThis.__DEFAULT_DAPP_KIT_INSTANCE__ = null;
	});
}
console.log('b0oooo00ddfdfoooodoooooooPPPoooooraot');

console.log('bbo');
