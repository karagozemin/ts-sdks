// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/bcs';

// pub enum BlobMetadata {
//     /// Version 1 of the blob metadata.
//     V1(BlobMetadataV1),
// }

// pub struct BlobMetadataV1 {
//     /// The type of encoding used to erasure encode the blob.
//     pub encoding_type: EncodingType,
//     /// The length of the unencoded blob.
//     pub unencoded_length: u64,
//     /// The hashes over the slivers of the blob.
//     pub hashes: Vec<SliverPairMetadata>,
// }

const MerkleNode = bcs.enum('MerkleNode', {
	Empty: null,
	Digest: bcs.bytes(32),
});

const SliverPairMetadata = bcs.struct('SliverPairMetadata', {
	primary_hash: MerkleNode,
	secondary_hash: MerkleNode,
});

const EncodingType = bcs.enum('EncodingType', {
	RedStuff: null,
});

export const BlobMetadataV1 = bcs.struct('BlobMetadataV1', {
	encoding_type: EncodingType,
	unencoded_length: bcs.u64(),
	hashes: bcs.vector(SliverPairMetadata),
});

export const BlobMetadata = bcs.enum('BlobMetadata', {
	V1: BlobMetadataV1,
});
