// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { css } from 'lit';
import { sharedStyles } from '../styles/index.js';

export const styles = [
	sharedStyles,
	css`
		.container {
			padding-top: 12px;
			padding-bottom: 12px;
			padding-left: 16px;
			padding-right: 16px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 8px;
			width: 100%;
			border-radius: var(--dapp-kit-radius-sm);
		}

		.container--selected {
			background-color: var(--dapp-kit-accent);
		}

		.account-title {
			font-weight: var(--dapp-kit-font-weight-medium);
		}

		.account-subtitle {
			color: var(--dapp-kit-muted-foreground);
		}

		.account-info {
			display: flex;
			flex-direction: column;
			gap: 4px;
		}

		.content {
			display: flex;
			gap: 12px;
		}

		.copy-address-button {
			display: inline-flex;
		}

		.copy-address-button svg {
			width: 16px;
			height: 16px;
		}

		.radio-button {
			width: 20px;
			height: 20px;
			border-radius: 100%;
			background-color: var(--dapp-kit-input);
			border: 1px solid var(--dapp-kit-border);
			display: inline-flex;
			justify-content: center;
			align-items: center;
		}

		.radio-button[data-checked='true'] {
			color: var(--dapp-kit-positive);
			border-color: var(--dapp-kit-positive);
		}

		.radio-input {
			position: absolute;
			pointer-events: none;
			opacity: 0;
			margin: 0;
		}
	`,
];
