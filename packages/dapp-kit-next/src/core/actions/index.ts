// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { Experimental_SuiClientTypes } from '@mysten/sui/experimental';
import type { DAppKitState } from '../state.js';
import { connectWalletCreator } from './connect-wallet.js';
import { disconnectWalletCreator } from './disconnect-wallet.js';
import { switchAccountCreator } from './switch-account.js';
import { switchNetworkCreator } from './switch-network.js';

export function createActions(
	state: DAppKitState,
	supportedNetworks: Experimental_SuiClientTypes.Network[],
) {
	return {
		connectWallet: connectWalletCreator(state),
		disconnectWallet: disconnectWalletCreator(state),
		switchAccount: switchAccountCreator(state),
		switchNetwork: switchNetworkCreator(state, supportedNetworks),
	};
}
