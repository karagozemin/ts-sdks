// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import * as vec_map from '../sui/vec_map.js';
export function Committee() {
	return bcs.struct('Committee', {
		pos0: vec_map.VecMap(bcs.Address, bcs.vector(bcs.u16())),
	});
}
