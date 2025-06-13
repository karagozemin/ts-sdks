// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { ConnectButton, useWallets } from '@mysten/dapp-kit-react';
import { dAppKit } from './dApp-kit';

function App() {
	const wallets = useWallets({ dAppKit });
	console.log(wallets);
	return (
		<div>
			{wallets.map((w, i) => (
				<div key={w.name + i}>{w.name}</div>
			))}
		</div>
	);
}

export default App;
