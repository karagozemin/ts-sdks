// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from 'vitest';

import { combine, interpolate, split } from '../../src/shamir';

describe('Shamir\'s secret sharing', () => {
	it('secret sharing roundtrip', () => {
		const secret = new Uint8Array(32);
		secret.fill(1);
		const shares = split(secret, 3, 5);

		console.log(shares);

		const combined = combine(shares);
		expect(combined).toEqual(secret);

		const interpolated = interpolate(shares);

		shares.forEach((share) => {
			expect(interpolated(share.index)).toEqual(share.share);
		});
	});
});
