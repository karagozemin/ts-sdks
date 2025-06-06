// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { atom, computed, onMount } from 'nanostores';
import './components/dapp-kit-connect-modal.js';

export { createDAppKit, getDefaultInstance } from './core/index.js';
export type { DAppKit } from './core/index.js';

export type { StateStorage } from './utils/storage.js';

export {
	UnsafeBurnerWallet,
	registerUnsafeBurnerWallet,
} from './utils/wallet-initializers/unsafe-burner.js';

function co() {
	const a = atom([159]);
	const b = computed([a], (a) => [...a, 70]);

	// onMount(b, () => {
	// 	console.log('MOUNT LISTENER');
	// 	const unsubscribe = b.listen((value) => {
	// 		console.log('count changed:', value);
	// 	});

	// 	return () => {
	// 		console.log('UNMOUNT LISTENER');
	// 		unsubscribe();
	// 	};
	// });

	onMount(b, () => {
		console.log('MMMMMMM');
		return () => console.log('PPPPPP');
	});

	return { b };
}

const c = () => {
	const res = co();
	return { abc: res.b };
};

export { c };
