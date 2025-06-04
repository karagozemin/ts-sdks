// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { createComponent } from '@lit/react';
import { DAppKitConnectButton as DAppKitConnectButtonElementClass } from '@mysten/dapp-kit-next';

export const DAppKitConnectButton = createComponent({
	tagName: 'mysten-dapp-kit-connect-button',
	elementClass: DAppKitConnectButtonElementClass,
	react: React,
	events: {
		onactivate: 'activate',
		onchange: 'change',
	},
});
