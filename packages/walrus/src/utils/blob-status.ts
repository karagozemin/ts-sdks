// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { BlobStatus } from '../storage-node/types.js';

// Ranking of blob status types from earliest -> latest in the lifecycle of a blob.
export const lifecycleRank = {
	nonexistent: 0,
	deletable: 1,
	permanent: 2,
	invalid: 3,
};

export function compareByLatestInLifecycle(a: BlobStatus, b: BlobStatus): number {
	if (a.type === 'permanent' && b.type === 'permanent') {
		// todo
	} else if (b.type === 'deletable' && b.type === 'deletable') {
		// todo
	}

	return lifecycleRank[b.type] - lifecycleRank[a.type];
}
