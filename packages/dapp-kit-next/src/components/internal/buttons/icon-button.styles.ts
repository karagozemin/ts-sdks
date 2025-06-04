// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { css } from 'lit';
import { sharedStyles } from '../../styles/index.js';

export const styles = [
	sharedStyles,
	css`
		button {
			width: 32px;
			height: 32px;
			border-radius: 50%;
			background: var(--dapp-kit-background);
			color: var(--dapp-kit-foreground);
			display: inline-flex;
			align-items: center;
			justify-content: center;
			transition:
				background-color 200ms,
				transform 100ms;
		}

		button:hover {
			background-color: var(--dapp-kit-accent);
		}

		button:active {
			transform: scale(0.9);
		}
	`,
];
