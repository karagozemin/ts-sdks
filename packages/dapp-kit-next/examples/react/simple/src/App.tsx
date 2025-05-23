// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useStore } from '@nanostores/react';

import { dAppKit } from './dApp-kit.js';
import { cleanStores } from 'nanostores';

console.log('app');
debugger;

function App() {
	console.log('render');
	debugger;

	const wallets = useStore(dAppKit.stores.$wallets);

	return (
		<div>
			<p>TooooODOoooooDEFDEFEDEF: Flesh this out more / make it more use case specific ^.^</p>
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

if (import.meta.hot) {
	// 1) First, clean up stuff.js (already happened via its dispose handler)
	// 2) Then this accept callback runs so you can e.g. re-import or re-render
	import.meta.hot.accept('./dApp-kit.js', (newModule) => {
		console.log('New mod');
		import.meta.hot?.invalidate();
	});
}
