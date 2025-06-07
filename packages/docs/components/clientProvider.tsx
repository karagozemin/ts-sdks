// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
'use client';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ConsentProvider } from 'consent-nextjs';
import dynamic from 'next/dynamic';
import type { PropsWithChildren } from 'react';
const Popup = dynamic(() => import('./popup'), { ssr: false });

const ClientProvider = ({ children }: PropsWithChildren) => {
	return (
		<ConsentProvider
			scriptSlots={
				<>
					<GoogleAnalytics gaId="G-TVRSCWSQ8N" />
				</>
			}
		>
			{children}
			<Popup />
		</ConsentProvider>
	);
};

export default ClientProvider;
