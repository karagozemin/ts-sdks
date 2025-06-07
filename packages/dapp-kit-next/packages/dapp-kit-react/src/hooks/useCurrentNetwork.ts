// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { DAppKit, ResolvedRegister } from '@mysten/dapp-kit-next';
import { useStore } from '@nanostores/react';
import { useDAppKit } from './useDAppKit.js';

type InstanceOptions<TDAppKit extends DAppKit> = {
	dAppKit?: TDAppKit | DAppKit | undefined;
};

export function useCurrentNetwork<TDAppKit extends DAppKit<any> = ResolvedRegister['dAppKit']>({
	dAppKit,
}: InstanceOptions<TDAppKit> = {}): ReturnType<
	typeof useStore<TDAppKit['stores']['$currentNetwork']>
> {
	const instance = useDAppKit(dAppKit);
	return useStore(instance.stores.$currentNetwork);
}
