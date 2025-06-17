// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { BcsType } from '@mysten/sui/bcs';
import * as object from './object.js';
export function LinkedTable<K extends BcsType<any>>(...typeParameters: [K]) {
	return bcs.struct('LinkedTable', {
		id: object.UID(),
		size: bcs.u64(),
		head: bcs.option(typeParameters[0]),
		tail: bcs.option(typeParameters[0]),
	});
}
