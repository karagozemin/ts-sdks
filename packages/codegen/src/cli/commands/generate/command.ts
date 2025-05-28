// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { buildCommand } from '@stricli/core';

export const generateCommand = buildCommand({
	loader: async () => import('./impl'),
	parameters: {
		flags: {
			outputDir: {
				kind: 'parsed',
				parse: String,
				brief: 'Output directory',
			},
		},
		positional: {
			kind: 'array',
			parameter: {
				brief: 'Paths to move modules',
				parse: String,
			},
		},
		aliases: {
			o: 'outputDir',
		},
	},
	docs: {
		brief: 'Generate BCS and moveCall helpers from you move code',
	},
});
