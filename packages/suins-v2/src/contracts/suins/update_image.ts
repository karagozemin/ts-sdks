// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
export function UpdateImage() {
	return bcs.struct('UpdateImage', {
		dummy_field: bcs.bool(),
	});
}
