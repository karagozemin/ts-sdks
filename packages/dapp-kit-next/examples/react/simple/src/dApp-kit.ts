// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { createDAppKit } from '@mysten/dapp-kit-react';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';

export const dAppKit = createDAppKit({
	networks: ['mainnet', 'testnet'],
	defaultNetwork: 'testnet',
    walletInitializers: [
        () => registerSlushWallet,
        ...,
    ],

	createClient(network) {
		return new SuiClient({ network, url: getFullnodeUrl(network) });
	},
});

// window.__DAPP__KIT
// registered wallets

// Mismatched library versions in the dep tree
// HMR 
// Developer mistake

// declare module '@mysten/dapp-kit-react' {
// 	interface Register {
// 		dAppKit: typeof dAppKit;
// 	}
// }
