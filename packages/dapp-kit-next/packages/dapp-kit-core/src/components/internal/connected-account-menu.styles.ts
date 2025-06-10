// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { css } from 'lit';
import { sharedStyles } from '../styles/index.js';

export const styles = [
	sharedStyles,
	css`
		:host {
			display: block;
			width: fit-content;
		}

		[role='menu'] {
			display: none;
		}

		[aria-expanded='true'] + [role='menu'] {
			display: flex;
			flex-direction: column;
			max-width: fit-content;
			min-width: 240px;
			padding: 4px;
			position: absolute;
			background-color: var(--dapp-kit-popover);
			color: var(--dapp-kit-popover-foreground);
			border-radius: var(--dapp-kit-radius-lg);
			border: 1px solid var(--dapp-kit-border);
		}

		[role='separator'] {
			height: 1px;
			margin-left: -8px;
			margin-right: -8px;
			margin-top: 4px;
			margin-bottom: 4px;
			background-color: var(--dapp-kit-border);
		}

		img {
			width: 24px;
			height: 24px;
			border-radius: 96px;
		}

		.menu-group {
			padding-left: 6px;
			padding-right: 6px;
			padding-top: 6px;
			padding-bottom: 6px;
		}

		.current-account-container {
			display: flex;
			gap: 8px;
		}

		.copy-address-button {
			display: flex;
			align-items: center;
			font-weight: var(--dapp-kit-font-weight-medium);
			gap: 8px;
		}

		.copy-address-button svg {
			color: var(--dapp-kit-muted-foreground);
		}

		.copy-address-button:hover svg {
			color: var(--dapp-kit-accent-foreground);
		}

		.trigger-content {
			display: flex;
			align-items: center;
			font-weight: var(--dapp-kit-font-weight-semibold);
			gap: 8px;
		}

		.accounts-label {
			color: var(--dapp-kit-muted-foreground);
			font-weight: var(--dapp-kit-font-weight-medium);
			padding-top: 4px;
			padding-bottom: 4px;
			font-size: 12px;
		}

		.accounts-list {
			max-height: 240px;
			overflow-y: auto;
		}

		.disconnect-button {
			padding-top: 6px;
			padding-bottom: 6px;
			padding-left: 8px;
			padding-right: 8px;
			display: flex;
			font-size: 12px;
			align-items: center;
			gap: 8px;
			width: 100%;
		}

		.disconnect-button:hover,
		.disconnect-button:focus {
			border-radius: var(--dapp-kit-radius-sm);
			background-color: var(--dapp-kit-accent);
		}
	`,
];
