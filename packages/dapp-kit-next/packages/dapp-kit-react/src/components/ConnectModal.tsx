// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { createComponent } from '@lit/react';
import type { ResolvedRegister } from '@mysten/dapp-kit-next';
import { DAppKitConnectModal as ConnectModalElement } from '@mysten/dapp-kit-next';

export const ConnectModal = createComponent<ConnectModalElement<ResolvedRegister['dAppKit']>>({
	react: React,
	tagName: 'mysten-dapp-kit-connect-modal',
	elementClass: ConnectModalElement,
	displayName: 'ConnectModal',
});
