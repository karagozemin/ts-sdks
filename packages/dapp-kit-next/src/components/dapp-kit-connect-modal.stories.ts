// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { Meta, StoryObj } from '@storybook/web-components';

import '../components/dapp-kit-connect-modal.js';
import { html } from 'lit';

const meta = {
	title: 'Connect Modal',
	component: 'dapp-kit-connect-modal',
	render: () => html`<dapp-kit-connect-modal></dapp-kit-connect-modal>`,
	tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const Default: StoryObj = {};
