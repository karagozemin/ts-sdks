// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { css } from 'lit';
import { sharedStyles } from '../styles/index.js';
import { iconButtonStyles } from '../styles/icon-button.js';

export const styles = [
	sharedStyles,
	iconButtonStyles,
	css`
		:host {
			display: block;
			width: fit-content;
		}

		.menu {
			display: none;
		}

		[aria-expanded='true'] + .menu {
			display: flex;
			flex-direction: column;
			max-width: fit-content;
			min-width: 396px;
			gap: 16px;
			padding: 16px;
			position: absolute;
			outline: none;
			background-color: var(--dapp-kit-popover);
			color: var(--dapp-kit-popover-foreground);
			border-radius: var(--dapp-kit-radius-lg);
			border: 1px solid var(--dapp-kit-border);
			box-shadow:
				0 4px 6px -1px rgba(0, 0, 0, 0.1),
				0 2px 4px -2px rgba(0, 0, 0, 0.1);
		}

		.header-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.header-title {
			font-size: 18px;
			font-weight: var(--dapp-kit-font-weight-semibold);
			letter-spacing: -0.18px;
		}

		img {
			width: 24px;
			height: 24px;
			border-radius: 96px;
		}

		[aria-expanded='true'] .chevron {
			transition: transform 0.3s ease;
			transform: rotate(180deg);
		}

		.chevron {
			display: flex;
		}

		.chevron svg {
			width: 12px;
			height: 12px;
		}

		.trigger-content {
			display: flex;
			align-items: center;
			font-weight: var(--dapp-kit-font-weight-semibold);
			gap: 12px;
		}

		.accounts-list {
			display: flex;
			flex-direction: column;
			gap: 12px;
			max-height: 240px;
			overflow-y: auto;
		}

		.disconnect-button {
			background-color: rgba(0, 0, 0, 0.8);
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			border-radius: var(--dapp-kit-radius-md);
			height: 48px;
			padding: 16px;
			gap: 8px;
		}
	`,
];
