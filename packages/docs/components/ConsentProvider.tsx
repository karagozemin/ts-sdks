// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { getConsentCookie, setConsentCookie } from '@/lib/cookies';
import type { ConsentState } from '@/lib/cookies';

interface ConsentContextValue {
	consent: ConsentState | null; // true=accepted, false=rejected, null=idle
	acceptConsent: () => void;
	rejectConsent: () => void;
}

const ConsentContext = createContext<ConsentContextValue | undefined>(undefined);

interface ConsentProviderProps {
	children: ReactNode;
}

export function ConsentProvider({ children }: ConsentProviderProps) {
	const [consent, setConsent] = useState<ConsentState | null>(null);
	const [isInitialized, setIsInitialized] = useState(false);

	// Load initial consent state from cookie on mount
	useEffect(() => {
		const savedConsent = getConsentCookie();
		setConsent(savedConsent);
		setIsInitialized(true);
	}, []);

	const acceptConsent = () => {
		setConsentCookie(true);
		setConsent(true);
	};

	const rejectConsent = () => {
		setConsentCookie(false);
		setConsent(false);
	};

	// Don't render children until we've loaded the initial state
	// This prevents hydration mismatches
	if (!isInitialized) {
		return null;
	}

	const value: ConsentContextValue = {
		consent,
		acceptConsent,
		rejectConsent,
	};

	return (
		<ConsentContext.Provider value={value}>
			{children}
			<ConsentPopup />
			{consent === true && <GoogleAnalytics gaId="G-TVRSCWSQ8N" />}
		</ConsentContext.Provider>
	);
}

function ConsentPopup() {
	const { consent, acceptConsent, rejectConsent } = useConsent();

	// Only show popup when consent is idle (null)
	if (consent !== null) return null;

	return (
		<div data-comp="consent-popup-overlay">
			<div>
				<b>We use cookies</b>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
				</p>
				<div style={{ textAlign: 'center' }}>
					<a href="/privacy" style={{ textAlign: 'center' }}>
						Privacy Policy
					</a>
					<button onClick={acceptConsent}>Accept All</button>
					<button onClick={rejectConsent}>Reject All</button>
				</div>
			</div>
		</div>
	);
}

export function useConsent(): ConsentContextValue {
	const context = useContext(ConsentContext);
	if (context === undefined) {
		throw new Error('useConsent must be used within a ConsentProvider');
	}
	return context;
}
