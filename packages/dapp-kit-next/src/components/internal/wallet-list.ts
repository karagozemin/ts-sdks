// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { WalletWithRequiredFeatures } from '@mysten/wallet-standard';
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class WalletList extends LitElement {
	@property({ attribute: false })
	wallets: WalletWithRequiredFeatures[] = [];

	@property({ attribute: false })
	selectedWallet!: WalletWithRequiredFeatures;

	render() {
		return html`<ul class="wallet-list">
			<li>hello</li>
		</ul>`;
	}
}
