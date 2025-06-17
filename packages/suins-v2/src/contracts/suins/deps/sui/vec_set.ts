// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { BcsType } from '@mysten/sui/bcs';
export function VecSet<K extends BcsType<any>>(...typeParameters: [K]) {
	return bcs.struct('VecSet', {
		contents: bcs.vector(typeParameters[0]),
	});
}
