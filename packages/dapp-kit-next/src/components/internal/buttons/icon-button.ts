// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { html, LitElement } from 'lit';
import { styles } from './icon-button.styles.js';

export class IconButton extends LitElement {
	static override shadowRootOptions = {
		...LitElement.shadowRootOptions,
		delegatesFocus: true,
	};

	static override styles = styles;

	override render() {
		return html`
			<button type="button">
				<slot></slot>
			</button>
		`;
	}
}
