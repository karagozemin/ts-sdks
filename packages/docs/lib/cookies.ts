// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

export type ConsentState = boolean; // true = accepted, false = rejected

const CONSENT_COOKIE_NAME = 'user-consent';
const CONSENT_COOKIE_EXPIRY_DAYS = 365; // 1 year

/**
 * Check if we're in a browser environment
 */
function isBrowser(): boolean {
	return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Get the current consent state from the cookie
 * @returns true (accepted) | false (rejected) | null (no consent given yet, i.e., 'idle')
 */
export function getConsentCookie(): ConsentState | null {
	if (!isBrowser()) {
		return null;
	}

	try {
		const cookies = document.cookie.split(';');
		for (const cookie of cookies) {
			const [name, value] = cookie.trim().split('=');
			if (name === CONSENT_COOKIE_NAME) {
				const decodedValue = decodeURIComponent(value);
				if (decodedValue === 'true') return true;
				if (decodedValue === 'false') return false;
			}
		}
	} catch (error) {
		console.warn('Error reading consent cookie:', error);
	}

	return null;
}

/**
 * Set the consent state in a cookie
 * @param consent - true (accepted) or false (rejected)
 */
export function setConsentCookie(consent: ConsentState): void {
	if (!isBrowser()) {
		return;
	}

	try {
		const expiryDate = new Date();
		expiryDate.setDate(expiryDate.getDate() + CONSENT_COOKIE_EXPIRY_DAYS);

		const cookieValue = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(consent.toString())}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;

		document.cookie = cookieValue;
	} catch (error) {
		console.warn('Error setting consent cookie:', error);
	}
}

/**
 * Clear the consent cookie
 */
export function clearConsentCookie(): void {
	if (!isBrowser()) {
		return;
	}

	try {
		document.cookie = `${CONSENT_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
	} catch (error) {
		console.warn('Error clearing consent cookie:', error);
	}
}
