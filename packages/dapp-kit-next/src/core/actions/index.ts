// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { Networks } from '../../utils/networks.js';
import type { DAppKitState } from '../state.js';
import { connectWalletCreator } from './connect-wallet.js';
import { disconnectWalletCreator } from './disconnect-wallet.js';
import { switchAccountCreator } from './switch-account.js';
import { switchNetworkCreator } from './switch-network.js';

export function createActions(state: DAppKitState, supportedNetworks: Networks) {
	return {
		connectWallet: connectWalletCreator(state),
		disconnectWallet: disconnectWalletCreator(state),
		switchAccount: switchAccountCreator(state),
		switchNetwork: switchNetworkCreator(state, supportedNetworks),
	};
}
