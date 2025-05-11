// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { Experimental_SuiClientTypes } from '@mysten/sui/experimental';
import type { DAppKitStores } from '../store.js';
import { connectWalletCreator } from './connect-wallet.js';
import { disconnectWalletCreator } from './disconnect-wallet.js';
import { signPersonalMessageCreator } from './sign-personal-message.js';
import { switchAccountCreator } from './switch-account.js';
import { switchNetworkCreator } from './switch-network.js';

export function createActions(
	stores: DAppKitStores,
	supportedNetworks: Experimental_SuiClientTypes.Network[],
) {
	return {
		connectWallet: connectWalletCreator(stores, supportedNetworks),
		disconnectWallet: disconnectWalletCreator(stores),
		signPersonalMessage: signPersonalMessageCreator(stores),
		switchAccount: switchAccountCreator(stores),
		switchNetwork: switchNetworkCreator(stores, supportedNetworks),
	};
}
