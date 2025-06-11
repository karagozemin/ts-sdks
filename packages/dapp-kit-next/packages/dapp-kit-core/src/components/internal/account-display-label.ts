// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';

import { when } from 'lit/directives/when.js';
import { html, LitElement } from 'lit';
import { Button } from './button.js';
import { formatAddress } from '@mysten/sui/utils';
import { Task } from '@lit/task';
import { property, query, queryAll, state } from 'lit/decorators.js';
import type { DAppKit } from '../../core/index.js';
import type { StoreValue } from 'nanostores';
import { disconnectIcon } from './icons/disconnect-icon.js';
import { copyIcon } from './icons/copy-icon.js';
import { styles } from './connected-account-menu.styles.js';
import type { DAppKitCompatibleClient } from '../../core/types.js';
import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { connectIcon } from './icons/connect-icon.js';
import { AccountMenuItem } from './connected-account-menu-item.js';

type ConnectedState = Extract<
	StoreValue<DAppKit['stores']['$connection']>,
	{ status: 'connected' }
>;

export class ConnectedAccountMenu extends ScopedRegistryHost(LitElement) {
	static elementDefinitions = {
		'internal-button': Button,
		'account-menu-item': AccountMenuItem,
	};

	static override styles = styles;

	@property({ type: Object })
	connection!: ConnectedState;

	@property({ type: Object })
	currentClient!: DAppKitCompatibleClient;

	#getNameTask = new Task(this, {
		args: () => [this.connection.account],
		task: async ([currentAccount], { signal }) => {
			const result = await this.currentClient.core.resolveNameServiceNames?.({
				address: currentAccount.address,
				signal,
			});
			return result?.data.at(0);
		},
	});

	@state()
	private _open = false;

	@state()
	private _focusedIndex = -1;

	#unsubscribeFromAutoUpdate?: () => void;

	@query('#menubutton')
	private _trigger!: HTMLElement;

	@query('#menu')
	private _menu!: HTMLElement;

	@queryAll('[role="menuitem"], [role="menuitemradio"]')
	private _menuItems!: NodeListOf<HTMLElement>;

	connectedCallback() {
		super.connectedCallback();
		document.addEventListener('click', this.#onDocumentClick);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.#stopPositioning();
		document.removeEventListener('click', this.#onDocumentClick);
	}

	override render() {
		return html`${formatAddress(this.connection.account.address)}``
                            
	}

	#getDisplayAddress = () => {
		return this.connection.account.label || formatAddress(this.connection.account.address);
	};
}
