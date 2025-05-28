// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { buildCommand } from '@stricli/core';

export const generateCommand = buildCommand({
	loader: async () => import('./impl'),
	parameters: {
		positional: {
			kind: 'array',
			parameter: {
				brief: 'Paths to move modules',
				parse: String,
			},
		},
	},
	docs: {
		brief: 'Generate BCS and moveCall helpers from you move code',
	},
});
