// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { createComponent } from '@lit/react';
import { DAppKitConnectButton as ConnectButtonElement } from '@mysten/dapp-kit-next';

export const ConnectButton = createComponent({
	react: React,
	tagName: 'mysten-dapp-kit-connect-button',
	elementClass: ConnectButtonElement,
	displayName: 'ConnectButton',
});
