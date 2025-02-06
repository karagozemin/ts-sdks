// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

export class WalrusClientError extends Error {}

export class WalrusBlobDoesNotExistError extends WalrusClientError {}

export class WalrusBlobBlockedError extends WalrusClientError {}

export class WalrusBlobDecodingVerificationError extends WalrusClientError {}
