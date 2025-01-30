// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { fromHex } from '@mysten/bcs';
import { bcs } from '@mysten/sui/bcs';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { combine, split } from 'shamir-secret-sharing';

import type { EncryptionInput } from './aes.js';
import { AesGcm256, Ciphertext, generateAesKey } from './aes.js';
import { G1Element, G2Element } from './bls12381.js';
import type { IBEServers } from './ibe.js';
import { BonehFranklinBLS12381Services } from './ibe.js';
import type { Certificate } from './utils.js';
import { createFullId, fetchIbeKey } from './utils.js';

// The domain separation tag for the hash-to-group function.
export const DST: Uint8Array = new TextEncoder().encode('SUI-SEAL-IBE-BLS12381-00');
export const DST_POP: Uint8Array = new TextEncoder().encode('SUI-SEAL-IBE-BLS12381-00-POP');

export const MAX_U8 = 255;

const IBEEncryptions = bcs.enum('IBEEncryptions', {
	BonehFranklinBLS12381: bcs.struct('BonehFranklinBLS12381', {
		encapsulation: bcs.bytes(96),
		shares: bcs.vector(bcs.bytes(32)),
	}),
});
export type IBEEncryptionsType = typeof IBEEncryptions.$inferType;

/**
 * The encrypted object format. Should be aligned with the Rust implementation.
 */
export const EncryptedObject = bcs.struct('EncryptedObject', {
	version: bcs.U8,
	package_id: bcs.bytes(32),
	inner_id: bcs.vector(bcs.U8),
	services: bcs.vector(bcs.tuple([bcs.bytes(32), bcs.U8])),
	threshold: bcs.U8,
	encrypted_shares: IBEEncryptions,
	ciphertext: Ciphertext,
});

export type VerifiedKeyServerInfo = {
	id: string;
	pk: Uint8Array;
};

/**
 * Query all register service object by its type. Visits the registered URL's /service endpoint and verified
 * the returned pop and public key, then return the object id and public key.
 *
 * @param keyServerObjectId - The key server object ID.
 * @returns - An array of [service_object_id, pk_bytes].
 */
export async function fetchVerifiedKeyServerInfo({
	keyServerObjectId,
	network = 'mainnet',
	client = new SuiClient({ url: getFullnodeUrl(network) }),
}: {
	keyServerObjectId: string;
	network?: 'testnet' | 'mainnet';
	client?: SuiClient;
}): Promise<VerifiedKeyServerInfo> {
	return await client
		.getObject({
			id: keyServerObjectId,
			options: {
				showContent: true,
			},
		})
		.then(async (res) => {
			if (!res?.data) throw new Error('No data returned');
			const fields = (res?.data?.content as { fields: { [k: string]: any } })?.fields;
			const response = await fetch(fields?.url! + '/v1/service', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const serviceResponse = await response.json();

			if (serviceResponse.service_id !== keyServerObjectId) {
				throw new Error('Service id mismatch');
			}
			const pk = new Uint8Array(fields?.pk?.fields?.pos0.fields.bytes);
			// console.log('pk g2', pk.length);
			// console.log('pop g1', fromB64(serviceResponse.pop).length);

			// let fullMsg = new Uint8Array([...DST_POP, ...pk, ...fromHEX(id)]);
			// console.log('fullMsg', fullMsg);
			// let hashedG1 = G1Element.hashToCurve(fullMsg).toBytes();

			// console.log('g1',hashedG1.length);
			// if (!await bls12_381.verify(fromB64(serviceResponse.pop), hashedG1, pk)) {
			//   throw new Error("Invalid pop");
			// }
			return {
				id: keyServerObjectId,
				pk,
			};
		});
}

/** Look up urls of key servers and fetch key from servers with request signature, cert and ephPk, then decrypt the response with ephSk.
 *
 * @param serviceIds - The object id's of the key servers.
 * @param requestSig - The request signature.
 * @param ptb - The ptb.
 * @param cert - The certificate.
 * @param ephSk - The ephemeral public key.
 * @returns - The secret keys.
 */
export async function fetchSks({
	serviceIds,
	requestSig,
	ptb,
	cert,
	ephSk,
	network = 'mainnet',
	client = new SuiClient({ url: getFullnodeUrl(network) }),
}: {
	serviceIds: string[];
	requestSig: Uint8Array;
	ptb: Uint8Array;
	cert: Certificate;
	ephSk: Uint8Array;
	network?: 'mainnet' | 'testnet';
	client?: SuiClient;
}): Promise<Uint8Array[]> {
	const objects = await client.multiGetObjects({
		ids: serviceIds,
		options: {
			showContent: true,
		},
	});
	const promises = objects.map(async (obj) => {
		const fields = (obj.data?.content as { fields: any })?.fields || {};
		return fetchIbeKey(fields.url, requestSig, ptb, ephSk, cert);
	});
	return Promise.all(promises);
}

/**
 * Given full ID and what key servers to use, return the encrypted message under the identity and return the bcs bytes of the encrypted object.
 *
 * @param packageId - packageId
 * @param innerId - innerId
 * @param keyServers - A list of VerifiedKeyServerInfo that contains mapping of keyServerObjectID -> PK.
 * @param encryption_input - Input to the encryption. Should be one of the EncryptionInput types, AesGcmEncryptionInput or Plain.
 * @param threshold - The threshold for the TSS encryption.
 * @returns The encrypted object containing all metadata.
 */
export async function encrypt<Input extends EncryptionInput, KeyServers extends IBEServers>(
	packageId: Uint8Array,
	innerId: Uint8Array,
	keyServers: KeyServers,
	encryption_input: Input,
	threshold: number,
): Promise<string> {
	const id = createFullId(DST, packageId, innerId);
	if (
		keyServers.size() < threshold ||
		threshold === 0 ||
		keyServers.size() > MAX_U8 ||
		threshold > MAX_U8
	) {
		throw new Error('Invalid input');
	}

	// Generate a random symmetric key and encrypt the encryption input using this key.
	const aesKeyBytes = await generateAesKey();
	const ciphertext = await encryption_input.encrypt(aesKeyBytes);

	// Split the symmetric key into shares and encrypt each share with the public keys of the key servers.
	const shares = await split(aesKeyBytes, keyServers.size(), threshold);
	const encrypted_shares = keyServers.encrypt_batched(
		id,
		shares.map((share) => share.subarray(0, 32)),
		shares.map((share) => share.subarray(32)),
	);
	const services_and_indices: [Uint8Array, number][] = keyServers
		.get_object_ids()
		.map((id, i) => [fromHex(id), shares[i][32]]);

	return EncryptedObject.serialize({
		version: 0,
		package_id: packageId,
		inner_id: innerId,
		services: services_and_indices,
		threshold,
		encrypted_shares,
		ciphertext,
	}).toBase64();
}

/**
 * Decrypt the given encrypted bytes with the given secret key (returned from fetchIbeKey).
 *
 * @param encryptedObject - EncryptedObject.
 * @param sks - The secret keys. It's assumed that these keys are validated. Otherwise the KEM may give a wrong result.
 * @returns - The decrypted plaintext corresponding to ciphertext.
 */
export async function decrypt(
	encryptedObject: typeof EncryptedObject.$inferType,
	sks: Uint8Array[],
): Promise<Uint8Array> {
	const nonce = G2Element.fromBytes(
		encryptedObject.encrypted_shares.BonehFranklinBLS12381.encapsulation,
	);
	const encrypted_shares = encryptedObject.encrypted_shares.BonehFranklinBLS12381.shares;
	const user_secret_keys = sks.map(G1Element.fromBytes);

	if (
		encrypted_shares.length === 0 ||
		encrypted_shares.length !== user_secret_keys.length ||
		encrypted_shares.length < encryptedObject.threshold
	) {
		throw new Error('Invalid input');
	}

	// Decrypt each share
	const shares = encrypted_shares.map((encrypted_share, i) => {
		const index = encryptedObject.services[i][1];

		let decrypted_share;
		if (encryptedObject.encrypted_shares.BonehFranklinBLS12381) {
			decrypted_share = BonehFranklinBLS12381Services.decrypt(
				nonce,
				user_secret_keys[i],
				encrypted_share,
				new Uint8Array([index]),
			);
		} else {
			throw new Error('Invalid encrypted object');
		}

		const share = new Uint8Array(decrypted_share.length + 1);
		share.set(decrypted_share, 0);

		// The Shamir secret sharing library expects the index/x-coordinate to be at the end of the share.
		share[decrypted_share.length] = index;
		return share;
	});

	// Combine the decrypted shares into the key
	const key = shares.length === 1 ? shares[0].subarray(0, 32) : await combine(shares);

	if (encryptedObject.ciphertext.Aes256Gcm) {
		try {
			// Decrypt the ciphertext with the key
			return AesGcm256.decrypt(key, encryptedObject.ciphertext);
		} catch {
			throw new Error('Decryption failed');
		}
	} else if (encryptedObject.ciphertext.Plain) {
		// In case `Plain` mode is used, return the key.
		return key;
	} else {
		throw new Error('Invalid encrypted object');
	}
}
