// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { Experimental_SuiClientTypes } from '@mysten/sui/src/experimental/types.js';
import type { DAppKitStores } from '../store.js';
import { DAppKitError } from '../../utils/errors.js';

export type SwitchNetworkArgs = {
	/** The network to switch to. */
	network: Experimental_SuiClientTypes.Network;
};

export function switchNetworkCreator(
	{ $state }: DAppKitStores,
	supportedNetworks: Experimental_SuiClientTypes.Network[],
) {
	/**
	 * Switches the currently selected network to the specified network.
	 */
	return function switchNetwork({ network }: SwitchNetworkArgs) {
		if (!supportedNetworks.includes(network)) {
			throw new DAppKitError('todo');
		}

		$state.setKey('currentNetwork', network);
	};
}
