// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { createDAppKit, unsafeBurnerWalletInitializer } from '@mysten/dapp-kit-react';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';

export const dAppKit = createDAppKit({
	networks: ['mainnet', 'testnet'],
	defaultNetwork: 'testnet',
	walletInitializers: [import.meta.env === 'DEV' ? unsafeBurnerWalletInitializer() : null],
	createClient(network) {
		return new SuiClient({ network, url: getFullnodeUrl(network) });
	},
});

console.log('Tee,ooeoo');
declare module '@mysten/dapp-kit-react' {
	interface Register {
		dAppKit: typeof dAppKit;
	}
}
