// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { registerSlushWallet } from '@mysten/slush-wallet';
import { useLayoutEffect } from 'react';

export interface SlushWalletConfig {
	name: string;
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
				const result = await registerSlushWallet(config.name, {
					origin: config.origin,
				});
				cleanup = result?.unregister;
			} catch (error) {
				console.error('Failed to register Slush wallet:', error);
			}
		};

		setupWallet();

		return () => {
			if (cleanup) cleanup();
		};
	}, [config?.name, config?.origin]);
}
