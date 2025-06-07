// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { ResolvedRegister } from '@mysten/dapp-kit-next';
import { createContext } from 'react';
import type { PropsWithChildren } from 'react';

export const DAppKitContext = createContext<ResolvedRegister['dAppKit'] | null>(null);

export type DAppKitProviderProps = PropsWithChildren<{
	dAppKit: ResolvedRegister['dAppKit'];
}>;

export function DAppKitProvider({ dAppKit, children }: DAppKitProviderProps) {
	return <DAppKitContext.Provider value={dAppKit}>{children}</DAppKitContext.Provider>;
}
