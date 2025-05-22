// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useStore } from '@nanostores/react';

import { dAppKit } from './dApp-kit.js';
import { getWallets } from '@mysten/wallet-standard';

console.log('app');

function App() {
	console.log('render');
	const wallets = useStore(dAppKit.stores.$wallets);

	console.log('oob');

	return (
		<div>
			<p>TODO: Flesh this out more / make it more use case specific ^.^</p>
			{wallets.length > 0 ? (
				<ul>
					{wallets.map((wallet) => (
						<li key={wallet.name + crypto.randomUUID()}>{wallet.name}</li>
					))}
				</ul>
			) : (
				<p>No registered wallets</p>
			)}
			<button onClick={() => console.log(getWallets().get())}>conn</button>
		</div>
	);
}

export default App;
