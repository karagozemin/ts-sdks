import { registerSlushWallet } from '@mysten/slush-wallet';
import { SlushWalletConfig } from '../../core/types';

export async function registerSlushWebWallet(slushWalletConfig: SlushWalletConfig) {
	const appName = slushWalletConfig.name || getDefaultAppName();
	const result = await registerSlushWallet(appName, {
		origin: slushWalletConfig.origin,
		metadataApiUrl: slushWalletConfig.metadataApiUrl,
	});

	if (!result) throw new Error('Registration un-successful.');
	return result;
}

function getDefaultAppName() {
	const appNameElement = document.querySelector<HTMLMetaElement>(`meta[name="application-name"]`);
	return appNameElement?.content || document.title;
}
