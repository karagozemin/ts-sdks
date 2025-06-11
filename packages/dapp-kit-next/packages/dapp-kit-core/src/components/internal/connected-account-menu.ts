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
		return html`<internal-button
				id="menubutton"
				aria-haspopup="true"
				aria-controls="menu"
				aria-expanded="${this._open}"
				@click=${this.#toggleMenu}
			>
				<div class="trigger-content">
					<img src=${this.connection.account.icon ?? this.connection.wallet.icon} alt="" />
					${this.#getNameTask.render({
						initial: this.#getDisplayAddress,
						pending: this.#getDisplayAddress,
						error: this.#getDisplayAddress,
						complete: (value) => value ?? this.#getDisplayAddress(),
					})}
				</div>
			</internal-button>
			<div id="menu" role="menu" aria-labelledby="menubutton" @keydown="${this.#onMenuKeydown}">
				<div role="group">
					<div class="current-account-container">
						<img src=${this.connection.account.icon ?? this.connection.wallet.icon} alt="" />
						${when(this.connection.account.label, (label) => html`<h2>${label}</h2>`)}
						<h3>
							<button
								class="copy-address-button"
								aria-label="Copy address to clipboard"
								@click=${async () => {
									try {
										await navigator.clipboard.writeText(this.connection.account.address);
									} catch (err) {
										// Do nothing here
									}
								}}
							>
								${formatAddress(this.connection.account.address)} ${copyIcon}
							</button>
						</h3>
					</div>
				</div>
				<div role="separator" aria-orientation="horizontal"></div>
				<div class="accounts-container" role="group">
					<div class="accounts-label">Accounts</div>
					<ul class="accounts-list">
						${[
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
							...this.connection.wallet.accounts,
						].map(
							(account) => html`
								<account-menu-item
									.account=${account}
									.selected=${account.address === this.connection.account.address}
									@account-selected=${() => {
										this._open = false;
									}}
								></account-menu-item>
							`,
						)}
					</ul>
				</div>
				<div role="separator" aria-orientation="horizontal"></div>
				<div role="group">
					<div
						class="action-menu-item"
						role="menuitem"
						tabindex="-1"
						@click=${this.#onManageConnectionClick}
					>
						${connectIcon} Manage Connection
					</div>
					<div
						class="action-menu-item"
						role="menuitem"
						tabindex="-1"
						@click=${this.#onDisconnectClick}
					>
						${disconnectIcon} Disconnect Wallet
					</div>
				</div>
			</div>`;
	}

	#onDisconnectClick() {
		this.dispatchEvent(
			new CustomEvent('disconnect-click', {
				bubbles: true,
				composed: true,
			}),
		);
	}

	#onManageConnectionClick() {
		this.dispatchEvent(
			new CustomEvent('manage-connection-click', {
				bubbles: true,
				composed: true,
			}),
		);
	}

	#getDisplayAddress = () => {
		return this.connection.account.label || formatAddress(this.connection.account.address);
	};

	#onDocumentClick = (event: MouseEvent) => {
		if (!this._open) {
			return;
		}

		const path = event.composedPath();
		if (!path.includes(this)) {
			this.#closeMenu();
		}
	};

	#onMenuKeydown(event: KeyboardEvent) {
		if (!this._open) return;

		console.log(event.key);

		switch (event.key) {
			case 'Escape':
				this.#closeMenu();
				this._trigger.focus();
				break;
			case 'ArrowDown':
				event.preventDefault();
				this._focusedIndex = Math.min(this._focusedIndex + 1, this._menuItems.length - 1);
				this._menuItems.item(this._focusedIndex).focus();
				break;
			case 'ArrowUp':
				event.preventDefault();
				this._focusedIndex = Math.max(this._focusedIndex - 1, 0);
				this._menuItems.item(this._focusedIndex).focus();
				break;
			case 'Home':
				event.preventDefault();
				this._focusedIndex = 0;
				this._menuItems.item(0).focus();
				break;
			case 'End':
				event.preventDefault();
				this._focusedIndex = this._menuItems.length - 1;
				this._menuItems.item(this._focusedIndex).focus();
				break;
			case 'Enter':
			case ' ':
				event.preventDefault();
				//this.activateCurrentItem();
				break;
			case 'Tab':
				this.#closeMenu();
				break;
		}
	}

	#toggleMenu() {
		if (this._open) {
			this.#closeMenu();
		} else {
			this.#openMenu();
		}
	}

	async #openMenu() {
		this._open = true;
		this._focusedIndex = -1;
		this.#startPositioning();

		await this.updateComplete;
		this._focusedIndex = 0;
		this._menuItems.item(0).focus();
	}

	#closeMenu() {
		this._open = false;
		this._focusedIndex = -1;
		this.#stopPositioning();
	}

	#startPositioning() {
		this.#unsubscribeFromAutoUpdate = autoUpdate(this._trigger, this._menu, async () => {
			const result = await computePosition(this._trigger, this._menu, {
				placement: 'bottom-end',
				middleware: [offset(8), flip(), shift()],
			});

			Object.assign(this._menu.style, {
				left: `${result.x}px`,
				top: `${result.y}px`,
			});
		});
	}

	#stopPositioning() {
		if (this.#unsubscribeFromAutoUpdate) {
			this.#unsubscribeFromAutoUpdate();
			this.#unsubscribeFromAutoUpdate = undefined;
		}
	}
}
