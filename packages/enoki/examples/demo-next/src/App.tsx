// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Transaction } from '@mysten/sui/transactions';
import { useState } from 'react';

import { ConnectButton, useCurrentAccount, useDAppKit, useWallets } from '@mysten/dapp-kit-react';
import { useMutation } from '@tanstack/react-query';
import { isEnokiWallet, isGoogleWallet } from '@mysten/enoki';
import { dAppKit } from './dApp-kit.js';

export default function App() {
	const { connectWallet, signAndExecuteTransaction, networks } = useDAppKit();
	const { mutate: connect } = useMutation({ mutationFn: connectWallet });
	const signAndExecute = useMutation({ mutationFn: signAndExecuteTransaction });

	const currentAccount = useCurrentAccount();
	const [result, setResult] = useState<any>();

	const wallets = useWallets();
	const googleWallet = wallets.find(isGoogleWallet);

	return (
		<div>
			<ConnectButton modalOptions={{ filterFn: (wallet) => !isEnokiWallet(wallet) }} />

			{googleWallet ? (
				<button
					disabled={!!currentAccount}
					onClick={() => {
						connect({ wallet: googleWallet });
					}}
				>
					{currentAccount?.address ?? 'Sign in with Google'}
				</button>
			) : null}

			{currentAccount && (
				<button
					onClick={async () => {
						try {
							const transaction = new Transaction();
							transaction.moveCall({
								target:
									'0xfa0e78030bd16672174c2d6cc4cd5d1d1423d03c28a74909b2a148eda8bcca16::clock::access',
								arguments: [transaction.object('0x6')],
							});

							const result = await signAndExecute.mutateAsync({ transaction });
							setResult(result.digest);
						} catch (e) {
							console.log(e);
							setResult({ error: (e as Error).stack });
						}
					}}
				>
					{signAndExecute.isPending ? 'Signing...' : 'Sign transaction'}
				</button>
			)}

			{result ? <div>{JSON.stringify(result)}</div> : null}

			<ul>
				{networks.map((network) => (
					<li key={network}>
						<button onClick={() => dAppKit.switchNetwork(network)}>{network}</button>
					</li>
				))}
			</ul>
		</div>
	);
}
