// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { SlushWallet } from '@mysten/slush-wallet';
import { registerSlushWallet } from '@mysten/slush-wallet';
import { useEffect, useLayoutEffect, useState } from 'react';

import { useAutoConnectWallet } from './useAutoConnectWallet.js';
import { useConnectWallet } from './useConnectWallet.js';

export interface SlushWalletConfig {
	name: string;
	network?: 'mainnet' | 'testnet';
	origin?: string;
}

export function useSlushWallet(config?: SlushWalletConfig) {
	useLayoutEffect(() => {
		if (!config?.name) {
			return;
		}

		let cleanup: (() => void) | undefined;

		const setupWallet = async () => {
			try {
				const { unregister } = await registerSlushWallet(config.name, {
					origin: config.origin,
				});
				cleanup = unregister;
			} catch (error) {
				console.error('Failed to register Slush wallet:', error);
			}
		};

		setupWallet();

		return () => {
			if (cleanup) cleanup();
		};
	}, [config?.name, config?.origin, config?.network]);
}
