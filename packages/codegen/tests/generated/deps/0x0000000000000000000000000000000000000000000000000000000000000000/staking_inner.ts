// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';
import * as object_table from '../0x0000000000000000000000000000000000000000000000000000000000000002/object_table.js';
import * as staking_pool from '../../staking_pool.js';
import * as extended_field from '../../extended_field.js';
import * as active_set from '../../active_set.js';
import * as committee from '../../committee.js';
import * as epoch_parameters from '../../epoch_parameters.js';
import * as vec_map from '../0x0000000000000000000000000000000000000000000000000000000000000002/vec_map.js';
import * as group_ops from '../0x0000000000000000000000000000000000000000000000000000000000000002/group_ops.js';
import * as bls12381 from '../0x0000000000000000000000000000000000000000000000000000000000000002/bls12381.js';
export function StakingInnerV1() {
	return bcs.struct('StakingInnerV1', {
		n_shards: bcs.u16(),
		epoch_duration: bcs.u64(),
		first_epoch_start: bcs.u64(),
		pools: object_table.ObjectTable(bcs.Address, staking_pool.StakingPool()),
		epoch: bcs.u32(),
		active_set: extended_field.ExtendedField(active_set.ActiveSet()),
		next_committee: bcs.option(committee.Committee()),
		committee: committee.Committee(),
		previous_committee: committee.Committee(),
		next_epoch_params: bcs.option(epoch_parameters.EpochParams()),
		epoch_state: EpochState(),
		next_epoch_public_keys: extended_field.ExtendedField(
			vec_map.VecMap(bcs.Address, group_ops.Element(bls12381.UncompressedG1())),
		),
	});
}
export function EpochState() {
	return bcs.enum('EpochState', {
		EpochChangeSync: bcs.u16(),
		EpochChangeDone: bcs.u64(),
		NextParamsSelected: bcs.u64(),
	});
}
