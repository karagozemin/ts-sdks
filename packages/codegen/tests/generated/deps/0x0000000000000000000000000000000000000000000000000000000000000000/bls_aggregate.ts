// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import * as group_ops from '../0x0000000000000000000000000000000000000000000000000000000000000002/group_ops.js';
import * as bls12381 from '../0x0000000000000000000000000000000000000000000000000000000000000002/bls12381.js';
export function BlsCommitteeMember() {
	return bcs.struct('BlsCommitteeMember', {
		public_key: group_ops.Element(bls12381.UncompressedG1()),
		weight: bcs.u16(),
		node_id: bcs.Address,
	});
}
export function BlsCommittee() {
	return bcs.struct('BlsCommittee', {
		members: bcs.vector(BlsCommitteeMember()),
		n_shards: bcs.u16(),
		epoch: bcs.u32(),
		total_aggregated_key: group_ops.Element(bls12381.G1()),
	});
}
export function RequiredWeight() {
	return bcs.enum('RequiredWeight', {
		Quorum: null,
		OneCorrectNode: null,
	});
}
