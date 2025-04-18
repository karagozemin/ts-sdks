// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { InferOutput } from 'valibot';
import {
	any,
	array,
	literal,
	object,
	optional,
	pipe,
	record,
	string,
	url,
	uuid,
	variant,
} from 'valibot';

export const SlushRequestData = variant('type', [
	object({
		type: literal('connect'),
	}),
	object({
		type: literal('sign-transaction'),
		transaction: string('`transaction` is required'),
		address: string('`address` is required'),
		chain: string('`chain` is required'),
		session: string('`session` is required'),
	}),
	object({
		type: literal('sign-and-execute-transaction'),
		transaction: string('`transaction` is required'),
		address: string('`address` is required'),
		chain: string('`chain` is required'),
		session: string('`session` is required'),
	}),
	object({
		type: literal('sign-personal-message'),
		chain: optional(string('`chain` is required')),
		message: string('`message` is required'),
		address: string('`address` is required'),
		session: string('`session` is required'),
	}),
]);
export type SlushRequestData = InferOutput<typeof SlushRequestData>;

export const SlushRequest = object({
	version: literal('v1'),
	requestId: pipe(string('`requestId` is required'), uuid()),
	appUrl: pipe(string(), url('`appUrl` must be a valid URL')),
	appName: string('`appName` is required'),
	payload: SlushRequestData,
	metadata: optional(record(string(), any())),
});

export type SlushRequest = InferOutput<typeof SlushRequest>;

export const SlushResponseData = variant('type', [
	object({
		type: literal('connect'),
		accounts: array(
			object({
				address: string('`address` is required'),
				publicKey: optional(string('`publicKey` must be a string')),
			}),
		),
		session: string('`session` is required'),
	}),
	object({
		type: literal('sign-transaction'),
		bytes: string(),
		signature: string(),
	}),
	object({
		type: literal('sign-and-execute-transaction'),
		bytes: string(),
		signature: string(),
		digest: string(),
		effects: optional(string()),
	}),
	object({
		type: literal('sign-personal-message'),
		bytes: string(),
		signature: string(),
	}),
]);
export type SlushResponseData = InferOutput<typeof SlushResponseData>;

export const SlushResponsePayload = variant('type', [
	object({
		type: literal('reject'),
		reason: optional(string('`reason` must be a string')),
	}),
	object({
		type: literal('resolve'),
		data: SlushResponseData,
	}),
]);
export type SlushResponsePayload = InferOutput<typeof SlushResponsePayload>;

export const SlushResponse = object({
	id: pipe(string(), uuid()),
	source: literal('slush-channel'),
	payload: SlushResponsePayload,
	version: literal('v1'),
});
export type SlushResponse = InferOutput<typeof SlushResponse>;

export type SlushRequestTypes = Record<string, any> & {
	[P in SlushRequestData as P['type']]: P;
};

export type SlushResponseTypes = {
	[P in SlushResponseData as P['type']]: P;
};
