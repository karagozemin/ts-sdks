// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useStore } from '@nanostores/react';

import { dAppKit } from './dApp-kit.js';
import { cleanStores } from 'nanostores';
import { useEffect } from 'react';
import { getWalletUniqueIdentifier } from '../../../../dist/esm/index.js';

function App() {
	console.log('reoooooonder');

	const wallets = useStore(dAppKit.stores.$wallets);
	console.log(wallets);

	const connection = useStore(dAppKit.stores.$connection);
	console.log(connection);

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
				<p>No registered wallets</p>
			)}
			<button
				onClick={() => {
					const slush = wallets[wallets.length - 1];
					console.log(slush, getWalletUniqueIdentifier(slush));
					dAppKit.connectWallet({ wallet: slush });
				}}
			>
				conn
			</button>
			<button onClick={() => console.log(dAppKit.stores.$wallets.get())}>remount</button>
		</div>
	);
}

export default App;
