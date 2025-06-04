// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
'use client';

import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
	if (!GA_MEASUREMENT_ID) return null;

	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
				strategy="afterInteractive"
			/>
			<Script id="ga-init" strategy="afterInteractive">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
			</Script>
		</>
	);
}
