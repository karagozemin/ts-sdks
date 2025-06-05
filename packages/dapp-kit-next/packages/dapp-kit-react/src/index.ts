export * from '@mysten/dapp-kit-next';

import * as React from 'react';
import { createComponent } from '@lit/react';
import {
  DAppKitConnectButton as ConnectButtonElement,
  DAppKitConnectModal as ConnectModalElement,
} from '@mysten/dapp-kit-next';

export const ConnectButton = createComponent({
  react: React,
  tagName: 'mysten-dapp-kit-connect-button',
  elementClass: ConnectButtonElement,
});

export const ConnectModal = createComponent({
  react: React,
  tagName: 'mysten-dapp-kit-connect-modal',
  elementClass: ConnectModalElement,
});
