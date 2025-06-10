// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from 'vitest';

import { combine, GF256, interpolate, Polynomial, split } from '../../src/shamir';
import { fromHex } from '@mysten/bcs';

describe("Shamir's·secret·sharing", () => {
	it('secret sharing roundtrip', () => {
		const secret = new Uint8Array([
			54, 73, 146, 97, 76, 123, 231, 6, 176, 180, 101, 228, 201, 216, 14, 65, 60, 155, 160, 238,
			132, 92, 76, 35, 11, 197, 34, 172, 114, 81, 94, 42,
		]);
		const shares = split(secret, 3, 3);

		const combined = combine(shares);
		expect(combined).toEqual(secret);

		const interpolated = interpolate(shares);

		shares.forEach((share) => {
			expect(interpolated(share.index)).toEqual(share.share);
		});
	});

	it('test polynomial interpolation', () => {
		const coordinates = [
			{ x: 1, y: 7 },
			{ x: 2, y: 11 },
			{ x: 3, y: 17 },
		];
		const interpolated = Polynomial.interpolate(
			coordinates.map(({ x, y }) => ({ x: new GF256(x), y: new GF256(y) })),
		);
		coordinates.forEach(({ x, y }) => {
			expect(interpolated.evaluate(new GF256(x))).toEqual(new GF256(y));
		});
	});

	it('test vector', () => {
		const shares = [
			{ index: 0x2d, share: fromHex('0bbad0cd0d222fe2fe7c17080198a95c186d66c523bbba') },
			{ index: 0x59, share: fromHex('94ed01a1e8e883b0110555e38cb50ca8014ffc8badd19a') },
			{ index: 0x3d, share: fromHex('16cad5ae8279f9e59fc3bb05817abc6370160cdd8e82f7') },
		];
		const combined = combine(shares);
		expect(combined).toEqual(new TextEncoder().encode('My super secret message'));
	});
});
