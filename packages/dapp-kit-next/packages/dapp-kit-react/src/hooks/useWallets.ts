// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DAppKit, ResolvedRegister } from '@mysten/dapp-kit-next';
import { useStore } from '@nanostores/react';
import { useDAppKit } from './useDAppKit.js';

type UseCurrentNetworkOptions<TDAppKit extends DAppKit> = {
	dAppKit?: TDAppKit | undefined;
};

export function useWallets<TDAppKit extends DAppKit = ResolvedRegister['dAppKit']>({
	dAppKit,
}: UseCurrentNetworkOptions<TDAppKit> = {}) {
	const instance = useDAppKit(dAppKit);
	return useStore(instance.stores.$wallets);
}
