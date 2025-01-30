// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { fromBase64, toBase64, toHEX } from '@mysten/bcs';
import { bcs } from '@mysten/sui/bcs';
import type { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

import { elgamal_decrypt, toPublicKey } from './elgamal.js';

export const RequestFormat = bcs.struct('RequestFormat', {
	ptb: bcs.string(),
	enc_key: bcs.vector(bcs.U8),
});

export function xor(a: Uint8Array, b: Uint8Array): Uint8Array {
	if (a.length !== b.length) {
		throw new Error('Invalid input');
	}
	return a.map((ai, i) => ai ^ b[i]);
}

export function createFullId(
	dst: Uint8Array,
	packageId: Uint8Array,
	innerId: Uint8Array,
): Uint8Array {
	const fullId = new Uint8Array(1 + dst.length + packageId.length + innerId.length);
	fullId.set([dst.length], 0);
	fullId.set(dst, 1);
	fullId.set(packageId, 1 + dst.length);
	fullId.set(innerId, 1 + dst.length + packageId.length);
	return fullId;
}

/**
 * Construct a personal message for the given package id and inner id, ephemeral public key, and ptb.
 * This should be passed to signPersonalMessage to sign.
 *
 * @param packageId - packageId.
 * @param innerId - innerId.
 * @param ephPk - The ephemeral public key.
 * @param ptb - The ptb.
 * @returns The personal message to be signed.
 */
export function toPersonalMessage(
	packageId: Uint8Array,
	ttlMin: number,
	vk: Uint8Array,
	creationTime: number,
): Uint8Array {
	const message = `Requesting access to keys of package ${toHEX(packageId)} for ${ttlMin} mins\n session key ${toBase64(vk)}, created at ${creationTime}`;
	return new TextEncoder().encode(message);
}

export type Certificate = {
	session_vk: string;
	creation_time: number;
	ttl_min: number;
	signature: string;
};

/**
 * Construct a certificate and request signature for the given keypair, signature, ptb, ephemeral public key, creation time and ttl.
 * @param kp - The keypair.
 * @param signature - The signature.
 * @param ptb - The ptb.
 * @param ephPk - The ephemeral public key.
 * @param creationTime - The creation time.
 * @param ttlMin - The ttl.
 * @returns The certificate and request signature.
 */
export async function toCertAndRequestSig(
	kp: Ed25519Keypair,
	signature: string,
	ptb: Uint8Array,
	ephPk: Uint8Array,
	creationTime: number,
	ttlMin: number,
) {
	const cert = {
		session_vk: toBase64(kp.getPublicKey().toRawBytes()),
		creation_time: creationTime,
		ttl_min: ttlMin,
		signature,
	} as Certificate;
	const msgToSign = RequestFormat.serialize({
		ptb: toBase64(ptb),
		enc_key: ephPk,
	}).toBytes();
	const requestSig = await kp.sign(msgToSign);
	return { cert, requestSig };
}

/**
 * Fetch the IBE key from the server with the ptb, ephemeral pubkey, request signature and certificate.
 * If server dry runs the ptb and succeeded, it returns BLS secret key encrypted under the ephemeral pubkey.
 *
 * @param signature - The signature of the ptb in Base64.
 * @param ptb - The ptb in Base64.
 * @param ephSk - The ephemeral secret key. A 32-byte scalar.
 * @returns The BLS secret key encrypted under the ephemeral pubkey in Uint8Array.
 */
export async function fetchIbeKey(
	url: string,
	requestSig: Uint8Array,
	ptb: Uint8Array,
	ephSk: Uint8Array,
	certificate: Certificate,
): Promise<Uint8Array> {
	const ephPk = toPublicKey(ephSk);
	let body = {
		ptb: toBase64(ptb),
		enc_key: toBase64(ephPk),
		request_signature: toBase64(requestSig),
		certificate: certificate,
	};
	const response = await fetch(url + '/v1/fetch_key', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});
	const resp = await response.json();
	console.log('resp', resp);
	return elgamal_decrypt(
		ephSk,
		// todo: handle multiple decryption keys?
		resp.decryption_keys[0].encrypted_key.map((k: string) => fromBase64(k)),
	);
}
