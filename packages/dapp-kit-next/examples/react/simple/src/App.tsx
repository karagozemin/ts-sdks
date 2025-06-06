// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useStore } from '@nanostores/react';

import { a, dAppKit } from './dApp-kit.js';
import { atom, cleanStores, onMount } from 'nanostores';
import { useEffect } from 'react';

a.abc.listen((value) => {
	console.log('count changed:', value);
});

function App() {
	console.log('reoooooonder');

	const wallets = useStore(dAppKit.stores.$wallets);

	const b = useStore(a.abc);
	console.log(wallets, b);

	useEffect(() => {
		console.log('COmp mounted');
		return () => console.log('Comp unmounted');
	}, []);

	return (
		<div>
			<p>TooooooODOoooooDEFDEFEDEF: Flesh this out more / make it more use case specific ^.^</p>
			{wallets.length > 0 ? (
				<ul>
					{wallets.map((wallet) => (
						<li key={wallet.name + crypto.randomUUID()}>{wallet.name}</li>
					))}
				</ul>
			) : (
				<p>No regstered wallets</p>
			)}
			<button onClick={() => cleanStores(dAppKit.stores.$wallets)}>conn</button>
			<button onClick={() => dAppKit.stores.$wallets.listen(() => {})}>remount</button>
		</div>
	);
}

export default App;
