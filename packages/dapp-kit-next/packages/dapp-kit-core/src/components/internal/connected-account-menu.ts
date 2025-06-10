// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';

import { when } from 'lit/directives/when.js';
import { css, html, LitElement } from 'lit';
import { sharedStyles } from '../styles/index.js';
import { Button } from './button.js';
import { formatAddress } from '@mysten/sui/utils';
import { Task } from '@lit/task';
import { property, query, state } from 'lit/decorators.js';
import type { DAppKit } from '../../core/index.js';
import type { StoreValue } from 'nanostores';
import { disconnectIcon } from './icons/disconnect-icon.js';
import { copyIcon } from './icons/copy-icon.js';
import type { UiWalletAccount } from '@wallet-standard/ui';
import { checkIcon } from './icons/check-icon.js';
import { styles } from './connected-account-menu.styles.js';
import type { DAppKitCompatibleClient } from '../../core/types.js';
import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';

type ConnectedState = Extract<
	StoreValue<DAppKit['stores']['$connection']>,
	{ status: 'connected' }
>;

export type AccountSelectedEvent = CustomEvent<{ account: UiWalletAccount }>;

class AccountMenuItem extends LitElement {
	static override styles = [
		sharedStyles,
		css`
			button {
				padding-top: 8px;
				padding-bottom: 8px;
				padding-left: 12px;
				padding-right: 12px;
				display: flex;
				align-items: center;
				gap: 8px;
				width: 100%;
			}

			button:hover,
			button:focus {
				border-radius: var(--dapp-kit-radius-sm);
				background-color: var(--dapp-kit-accent);
			}

			svg {
				width: 16px;
				height: 16px;
			}
		`,
	];

	static shadowRootOptions = {
		...LitElement.shadowRootOptions,
		delegatesFocus: true,
	};

	@property({ type: Object })
	account!: UiWalletAccount;

	@property({ type: Boolean })
	selected = false;

	override render() {
		return html`<li
			role="menuitemradio"
			tabindex=${-1}
			aria-checked="${this.selected}"
			@click=${this.#itemClicked}
		>
			${formatAddress(this.account.address)} ${when(this.selected, () => checkIcon)}
		</li>`;
	}

	#itemClicked() {
		this.dispatchEvent(
			new CustomEvent<AccountSelectedEvent['detail']>('account-selected', {
				detail: { account: this.account },
				bubbles: true,
				composed: true,
			}),
		);
	}
}

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
		task: async ([currentAccount]) => {
			// TODO: Do data fetching to resolve the SuiNS name.
			// This will be in a follow-up PR since I need to make adjustments to the client
			// types and normalize the client method
			return formatAddress(currentAccount.address);
		},
	});

	@state()
	private _open = false;

	get open() {
		return this._open;
	}

	set open(open: boolean) {
		if (open === this._open) {
			return;
		}

		this._open = open;
		if (this._open) {
			this.#startPositioning();
		} else {
			this.#stopPositioning();
		}
	}

	#unsubscribeFromAutoUpdate?: () => void;

	@query('#menubutton')
	private _trigger!: HTMLElement;

	@query('#menu')
	private _menu!: HTMLElement;

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
				aria-expanded="${this.open}"
				@click=${() => {
					this.open = true;
				}}
			>
				<div class="trigger-content">
					<img src=${this.connection.account.icon ?? this.connection.wallet.icon} alt="" />
					${this.#getNameTask.render({
						pending: this.#getDisplayAddress,
						error: this.#getDisplayAddress,
						complete: (value) => value,
					})}
				</div>
			</internal-button>
			<div id="menu" role="menu" aria-labelledby="menubutton">
				<div class="menu-group" role="group">
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
				<div class="menu-group" role="group">
					<div class="accounts-label">Accounts</div>
					<ul class="accounts-list">
						${this.connection.wallet.accounts.map(
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
				<div class="menu-group" role="group">
					<div class="disconnect-button" role="menuitem" @click=${this.#onDisconnectClick}>
						${disconnectIcon} Disconnect Wallet
					</div>
					<div
						class="manage-connection-button"
						role="menuitem"
						@click=${this.#onManageConnectionClick}
					>
						${disconnectIcon} Manage Connection
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
			this._open = false;
		}
	};

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
