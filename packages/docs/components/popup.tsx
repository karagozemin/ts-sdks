// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { PopupConsent, enUS } from 'consent-nextjs';
// import { enUS } from '@consent-nextjs/lang';
// import { PopupConsent } from '@consent-nextjs/ui/PopupConsent';
// import { BannerConsent } from '@consent-nextjs/ui/BannerConsent';
import { useConsent } from '@/lib/consent';

const Popup = () => {
	const { consentState, onRejectClick, onConsentClick } = useConsent();
	const showPopup = consentState.consent === 'idle' && consentState.showPopup;

	if (!showPopup) return null;
	return (
		<div data-comp="consent-nextjs-overlay">
			<PopupConsent
				areaTop={<b>{enUS.title}</b>}
				areaBottom={
					<>
						<a href="/privacy" style={{ textAlign: 'center' }}>
							Privacy Policy
						</a>
						<button onClick={() => onConsentClick()}>{enUS.buttonConsent}</button>
						<button onClick={() => onRejectClick()}>{enUS.buttonReject}</button>
					</>
				}
			>
				{enUS.consentGeneral}
			</PopupConsent>
		</div>
	);
};

export default Popup;
