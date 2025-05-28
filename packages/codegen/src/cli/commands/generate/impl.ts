// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { LocalContext } from '../../context.js';
import { generatePackage } from '../../../index.js';
import { basename } from 'node:path';

interface SubdirCommandFlags {
	outputDir: string;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (
	this: LocalContext,
	flags: SubdirCommandFlags,
	...paths: string[]
): Promise<void> {
	for (const path of paths) {
		const options = {
			source: path,
			destination: flags.outputDir,
			name: basename(path),
		};
		await generatePackage(options);
	}
}
