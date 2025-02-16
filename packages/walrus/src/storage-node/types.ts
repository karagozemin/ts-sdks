// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { BlobMetadata, BlobMetadataWithId, SliverData } from '../utils/bcs.js';

export type BlobMetadataWithId = typeof BlobMetadataWithId.$inferType;

export type SliverType = 'primary' | 'secondary';

export type SliverData = typeof SliverData.$inferType;

export type Uploadable = Uint8Array | ArrayBuffer | ReadableStream | Blob;

export type StorageConfirmation = {
	serializedMessage: string;
	signature: string;
};

export type GetBlobStatusRequestInput = {
	blobId: string;
};

export type GetBlobStatusResponse = {
	code: number;
	success: {
		data: BlobStatus;
	};
};

export type BlobStatus = 'nonexistent' | Invalid | Permanent | Deletable;

export type Invalid = {
	invalid: {
		event: StatusEvent;
	};
};

export type Permanent = {
	permanent: {
		deletable_counts: unknown;
		end_epoch: number;
		is_certified: boolean;
		status_event: StatusEvent;
		initial_certified_epoch: number | null;
	};
};

export type Deletable = {
	deletable: {
		deletable_counts: unknown;
		initial_certified_epoch: number | null;
	};
};

export type StatusEvent = {
	eventSeq: string;
	txDigest: Uploadable;
};

export type GetBlobMetadataRequestInput = {
	blobId: string;
};

export type GetBlobMetadataResponse = BlobMetadataWithId;

export type StoreBlobMetadataRequestInput = {
	blobId: string;
	metadata: Uploadable | typeof BlobMetadata.$inferInput;
};

export type StoreBlobMetadataResponse = {
	success: {
		code: number;
		data: string;
	};
};

export type GetSliverRequestInput = {
	blobId: string;
	sliverType: SliverType;
	sliverPairIndex: number;
};
export type GetSliverResponse = SliverData;

export type StoreSliverRequestInput = {
	blobId: string;
	sliver: Uploadable | typeof SliverData.$inferInput;
	sliverType: SliverType;
	sliverPairIndex: number;
};
export type StoreSliverResponse = {
	success: {
		code: number;
		data: string;
	};
};

export type GetDeletableBlobConfirmationRequestInput = {
	blobId: string;
	objectId: string;
};

export type GetDeletableBlobConfirmationResponse = StorageConfirmation;

export type GetPermanentBlobConfirmationRequestInput = {
	blobId: string;
};

export type GetPermanentBlobConfirmationResponse = StorageConfirmation;
