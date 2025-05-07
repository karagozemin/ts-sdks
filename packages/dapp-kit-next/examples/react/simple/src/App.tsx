// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { useStore } from '@nanostores/react';
import { getDefaultStore } from '@mysten/dapp-kit-next';
import { useEffect, useState } from 'react';
import { atom, map } from 'nanostores';

const dAppKitStore = getDefaultStore();

function App() {
	const wallets = useStore(dAppKitStore.$wallets);
	const currAcc = useStore(dAppKitStore.$connection);
	// const connection = useStore(dAppKitStore.$connection);

	// console.log(wallets, conn);

	console.log('re-render?', wallets);

	console.log('Acc', currAcc);

	// console.log(wallets, connection);

	return (
		<div>
			{/* <dapp-kit-connect-modal></dapp-kit-connect-modal> */}
			<button
				onClick={() => {
					dAppKitStore.connectWallet({ wallet: wallets[0] });
				}}
			>
				Connect
			</button>

			<button
				onClick={() => {
					dAppKitStore.disconnectWallet();
				}}
			>
				Disconnect
			</button>

			{currAcc.account ? <p>CONNECTED ALREDADY BITCH</p> : null}
			<button
				onClick={() => {
					console.log('A');
					//dAppKitStore.switchAccount({ account: null as any });
				}}
			>
				Click
			</button>
			{wallets.length > 0 ? (
				<pre>{JSON.stringify(wallets, null, 2)}</pre>
			) : (
				<p>No registered wallets</p>
			)}
		</div>
	);
}

export default App;
