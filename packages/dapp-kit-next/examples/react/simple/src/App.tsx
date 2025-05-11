// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useStore } from '@nanostores/react';
import { createDAppKit } from '@mysten/dapp-kit-next';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { registerUnsafeBurnerWallet, useUnsafeBurnerWallet } from './unsafe.js';

const mainnetClient = new SuiClient({
	url: getFullnodeUrl('mainnet'),
	network: 'mainnet',
});

const testnetClient = new SuiClient({
	url: getFullnodeUrl('localnet'),
	network: 'localnet',
});

const dAppKit = createDAppKit({
	clients: [testnetClient, mainnetClient],
	defaultNetwork: 'testnet',
});

declare module '@mysten/dapp-kit-next' {
	interface Register {
		dAppKit: typeof dAppKit;
	}
}

registerUnsafeBurnerWallet(null as any);

function App() {
	const _suiClient = useStore(dAppKit.stores.$suiClient);
	const wallets = useStore(dAppKit.stores.$wallets);
	const network = useStore(dAppKit.stores.$currentNetwork);

	const connection = useStore(dAppKit.stores.$connection);

	console.log(network, wallets, connection);

	return (
		<div>
			{Object.keys(dAppKit.networkConfig).map((network) => {
				return (
					<button onClick={() => dAppKit.switchNetwork({ network })}>Switch to {network}</button>
				);
			})}
			<button>Switch network</button>
			<p>TODO: Flesh this out more / make it more use case specific ^.^</p>
			<button onClick={() => dAppKit.connectWallet({ wallet: wallets[wallets.length - 1] })}>
				Connect
			</button>
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
