// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { BcsType } from '@mysten/sui/bcs';
export function VecMap<K extends BcsType<any>, V extends BcsType<any>>(...typeParameters: [K, V]) {
	return bcs.struct('VecMap', {
		contents: bcs.vector(Entry(typeParameters[0], typeParameters[1])),
	});
}
export function Entry<K extends BcsType<any>, V extends BcsType<any>>(...typeParameters: [K, V]) {
	return bcs.struct('Entry', {
		key: typeParameters[0],
		value: typeParameters[1],
	});
}
