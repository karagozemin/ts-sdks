// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { createDAppKit, DAppKit, ResolvedRegister } from '@mysten/dapp-kit-next';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';

export const dAppKit = createDAppKit({
	networks: ['mainnet', 'testnet'],
	defaultNetwork: 'testnet',
	createClient(network) {
		return new SuiClient({ network, url: getFullnodeUrl(network) });
	},
});

declare module '@mysten/dapp-kit-next' {
	interface Register {
		dAppKit: typeof dAppKit;
	}
}

const b: DAppKit = dAppKit;
console.log(b);

dAppKit.getClient('');

type D = ResolvedRegister['dAppKit'];
