// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { Experimental_SuiClientTypes } from '@mysten/sui/experimental';
import { DAppKitError } from '../../utils/errors.js';
import type { DAppKitState } from '../state.js';

export type SwitchNetworkArgs = {
	/** The network to switch to. */
	network: Experimental_SuiClientTypes.Network;
};

export function switchNetworkCreator(
	$state: DAppKitState,
	supportedNetworks: Experimental_SuiClientTypes.Network[],
) {
	/**
	 * Switches the currently selected network to the specified network.
	 */
	return function switchNetwork({ network }: SwitchNetworkArgs) {
		if (!supportedNetworks.includes(network)) {
			throw new DAppKitError(
				`The specified network "${network}" isn't supported. The network must be one of "${supportedNetworks.join(', ')}".`,
			);
		}
		$state.setKey('currentNetwork', network);
	};
}
