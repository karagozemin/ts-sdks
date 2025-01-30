// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@mysten/sui/bcs';

export const Ciphertext = bcs.enum('Ciphertext', {
	Aes256Gcm: bcs.struct('Aes256Gcm', {
		blob: bcs.vector(bcs.U8),
		aad: bcs.option(bcs.vector(bcs.U8)),
	}),
	Plain: bcs.struct('Plain', {}),
});
export type CiphertextType = typeof Ciphertext.$inferType;

// Use a fixed IV for AES.
export const iv = Uint8Array.from([
	138, 55, 153, 253, 198, 46, 121, 219, 160, 128, 89, 7, 214, 156, 148, 220,
]);

export async function generateAesKey(): Promise<Uint8Array> {
	const key = await crypto.subtle.generateKey(
		{
			name: 'AES-GCM',
			length: 256,
		},
		true,
		['encrypt', 'decrypt'],
	);
	return new Uint8Array(
		await crypto.subtle.exportKey('raw', key).then((keyData) => new Uint8Array(keyData)),
	);
}

export interface EncryptionInput {
	encrypt(key: Uint8Array): Promise<CiphertextType>;
}

export class AesGcm256 implements EncryptionInput {
	readonly plaintext: Uint8Array;
	readonly aad: Uint8Array;

	constructor(msg: Uint8Array, aad: Uint8Array) {
		this.plaintext = new Uint8Array(msg);
		this.aad = aad;
	}

	async encrypt(key: Uint8Array): Promise<CiphertextType> {
		const aesCryptoKey = await crypto.subtle.importKey('raw', key, 'AES-GCM', false, ['encrypt']);

		const blob = Array.from(
			new Uint8Array(
				await crypto.subtle.encrypt(
					{
						name: 'AES-GCM',
						iv,
						additionalData: this.aad,
					},
					aesCryptoKey,
					this.plaintext,
				),
			),
		);

		return {
			Aes256Gcm: {
				blob,
				aad: Array.from(this.aad ?? []),
			},
			$kind: 'Aes256Gcm',
		};
	}

	static async decrypt(key: Uint8Array, ciphertext: CiphertextType): Promise<Uint8Array> {
		if (ciphertext.Aes256Gcm === undefined) {
			throw new Error('Invalid version');
		}

		const aesCryptoKey = await crypto.subtle.importKey('raw', key, 'AES-GCM', false, ['decrypt']);

		return new Uint8Array(
			await crypto.subtle.decrypt(
				{
					name: 'AES-GCM',
					iv,
					additionalData: new Uint8Array(ciphertext.Aes256Gcm.aad ?? []),
				},
				aesCryptoKey,
				new Uint8Array(ciphertext.Aes256Gcm.blob),
			),
		);
	}
}

export class Plain implements EncryptionInput {
	async encrypt(_key: Uint8Array): Promise<CiphertextType> {
		return {
			Plain: {},
			$kind: 'Plain',
		};
	}
}
