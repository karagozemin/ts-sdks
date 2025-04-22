// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { ReactiveElement } from 'lit';
import { StoreController } from '@nanostores/lit';
import type { DAppKitStore } from '../store/index.js';
import type { DAppKitStoreState } from '../store/state.js';

export function storeProperty() {
	return function (target: any, propertyKey: PropertyKey) {
		// Create unique symbols for storing the controller and value:
		const controllerKey = Symbol();
		const valueKey = Symbol();

		interface Target extends ReactiveElement {
			[controllerKey]: StoreController<Readonly<DAppKitStoreState>> | undefined;
			[valueKey]: DAppKitStore | undefined;
		}

		Object.defineProperty(target, propertyKey, {
			get(this: Target): DAppKitStore | undefined {
				return this[valueKey];
			},
			set(this: Target, newStore: DAppKitStore | undefined) {
				const oldStore = this[valueKey];
				if (oldStore === newStore) {
					return;
				}

				this[valueKey] = newStore;

				const existingController = this[controllerKey];
				if (existingController) {
					existingController.hostDisconnected();
					this.removeController(existingController);
				}

				const newController = newStore ? new StoreController(this, newStore.$state) : undefined;
				this[controllerKey] = newController;

				if (existingController && !newController) {
					// If the store is removed, request an update. Otherwise the controller should handle it.
					this.requestUpdate(propertyKey, oldStore);
				}
			},
			configurable: true,
			enumerable: true,
		});
	};
}
