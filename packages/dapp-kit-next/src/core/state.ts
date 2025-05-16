// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { UiWallet, UiWalletAccount } from '@wallet-standard/ui';
import { deepMap } from 'nanostores';
import type { Networks } from '../utils/networks.js';

type WalletConnection =
	| {
			status: 'disconnected' | 'connecting';
			currentAccount: null;
	  }
	| {
			status: 'reconnecting' | 'connected';
			currentAccount: UiWalletAccount;
	  };

export type DAppKitStateValues<TNetworks extends Networks> = {
	wallets: UiWallet[];
	connection: WalletConnection;
	currentNetwork: TNetworks[number];
};

export type DAppKitState = ReturnType<typeof createState>;

export function createState<TNetworks extends Networks = Networks>({
	defaultNetwork,
}: {
	defaultNetwork: TNetworks[number];
}) {
	return deepMap<DAppKitStateValues<TNetworks>>({
		wallets: [],
		connection: {
			status: 'disconnected',
			currentAccount: null,
		},
		currentNetwork: defaultNetwork,
	});
}
