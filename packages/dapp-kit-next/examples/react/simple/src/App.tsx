// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useStore } from '@nanostores/react';
import { createDAppKit } from '@mysten/dapp-kit-next';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';

const dAppKit = createDAppKit({
	clients: [new SuiClient({ network: 'testnet', url: getFullnodeUrl('testnet') })],
});

function App() {
	const wallets = useStore(dAppKit.$wallets);

	return (
		<div>
			<p>TODO: Flesh this out more / make it more use case specific ^.^</p>
			{wallets.length > 0 ? (
				<ul>
					{wallets.map((wallet) => (
						<li key={wallet.name}>{wallet.name}</li>
					))}
				</ul>
			) : (
				<p>No registered wallets</p>
			)}
		</div>
	);
}

export default App;
