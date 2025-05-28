// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { LocalContext } from '../../context.js';

interface SubdirCommandFlags {}

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (
	this: LocalContext,
	flags: SubdirCommandFlags,
	...paths: string[]
): Promise<void> {
	console.log(this, flags, paths);
}
