// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from 'vitest';

import { getFullnodeUrl, SuiClient } from '../../src/client';
import { namedPackagesPlugin, Transaction } from '../../src/transactions';
import { normalizeSuiAddress } from '../../src/utils';

const mainnetPlugin = namedPackagesPlugin({
	url: 'https://qa.mainnet.mvr.mystenlabs.com',
	overrides: {
		packages: {
			'@framework/std': '0x1',
			'@framework/std/1': '0x1',
		},
		types: {
			'@framework/std::string::String': '0x1::string::String',
			'@framework/std::vector::empty<@framework/std::string::String>':
				'0x1::vector::empty<0x1::string::String>',
		},
	},
});

const testnetPlugin = namedPackagesPlugin({
	url: 'https://qa.testnet.mvr.mystenlabs.com',
	overrides: {
		packages: {
			'@framework/std': '0x1',
			'@framework/std/1': '0x1',
		},
		types: {
			'@framework/std::string::String': '0x1::string::String',
			'@framework/std::vector::empty<@framework/std::string::String>':
				'0x1::vector::empty<0x1::string::String>',
		},
	},
});

// A local plugin that does not do any online resolution,
// but can work for the pre-defined cache.
const localCachePlugin = namedPackagesPlugin({
	url: '', // empty URL, no online resolution.
	overrides: {
		packages: {
			'@framework/std': '0x1',
			'@framework/sui': '0x2',
		},
		types: {
			'@framework/sui::vec_set::VecSet': '0x2::vec_set::VecSet',
			'@framework/std::string::String': '0x1::string::String',
			'@framework/sui::sui::SUI': '0x2::sui::SUI',
		},
	},
});

describe.concurrent('Name Resolution Plugin', () => {
	it('Should replace names in a given PTB', async () => {
		const transaction = new Transaction();
		transaction.addSerializationPlugin(mainnetPlugin);

		// replace .move names properly
		transaction.moveCall({
			target: '@framework/std::string::utf8',
			arguments: [transaction.pure.string('Hello, world!')],
		});

		// replace type args properly
		transaction.moveCall({
			target: '@framework/std::vector::empty',
			typeArguments: ['@framework/std::string::String'],
		});

		// replace nested type args properly
		transaction.moveCall({
			target: '@framework/std/1::vector::empty',
			typeArguments: ['@framework/std::vector::empty<@framework/std::string::String>'],
		});

		// replace type args in `MakeMoveVec` call.
		transaction.makeMoveVec({
			type: '@framework/std::string::String',
			elements: [transaction.pure.string('Hello, world!')],
		});

		const json = JSON.parse(await transaction.toJSON());

		expect(json.commands[0].MoveCall.package).toBe(normalizeSuiAddress('0x1'));
		expect(json.commands[1].MoveCall.typeArguments[0]).toBe(`0x1::string::String`);
		expect(json.commands[2].MoveCall.package).toBe(normalizeSuiAddress('0x1'));
		expect(json.commands[2].MoveCall.typeArguments[0]).toBe(
			`0x1::vector::empty<0x1::string::String>`,
		);
	});
});

describe.concurrent('Name Resolution Plugin (MVR) - Mainnet', () => {
	it('Should replace target calls in a given PTB', async () => {
		await simplePtb('mainnet');
	});

	it('Should replace target calls AND types in a given PTB', async () => {
		await nestedTypeArgsPtb('mainnet');
	});
});

describe.concurrent('Name Resolution Plugin (MVR) - Testnet', () => {
	it('Should replace target calls in a given PTB', async () => {
		await simplePtb('testnet');
	});

	it('Should replace target calls AND types in a given PTB', async () => {
		await nestedTypeArgsPtb('testnet');
	});
});

describe.concurrent('Name Resolution Plugin (Local Cache)', () => {
	it('Should replace composite types in a given PTB', async () => {
		const transaction = new Transaction();
		transaction.addSerializationPlugin(localCachePlugin);

		const zeroCoin = transaction.moveCall({
			target: '@framework/sui::coin::zero',
			typeArguments: ['@framework/sui::sui::SUI'],
		});

		transaction.transferObjects([zeroCoin], normalizeSuiAddress('0x2'));

		// Types are composed here, without needing any API calls, even if we do not have the
		// full type in the cache.
		transaction.moveCall({
			target: '@framework/std::vector::empty',
			typeArguments: ['@framework/sui::vec_set::VecSet<@framework/std::string::String>'],
		});

		const res = await dryRun(transaction, 'testnet');
		expect(res.effects.status.status).toEqual('success');
	});

	it('Should replace compsite types twice, and not have any weird side effects', async () => {
		const transaction = new Transaction();
		transaction.addSerializationPlugin(localCachePlugin);

		const zeroCoin = transaction.moveCall({
			target: '@framework/sui::coin::zero',
			typeArguments: ['@framework/sui::sui::SUI'],
		});

		transaction.transferObjects([zeroCoin], normalizeSuiAddress('0x2'));

		// Types are composed here, without needing any API calls, even if we do not have the
		// full type in the cache.
		transaction.moveCall({
			target: '@framework/std::vector::empty',
			typeArguments: ['@framework/sui::vec_set::VecSet<@framework/std::string::String>'],
		});

		const res = await dryRun(transaction, 'testnet');
		expect(res.effects.status.status).toEqual('success');
	});
});

const simplePtb = async (network: 'mainnet' | 'testnet') => {
	const transaction = new Transaction();

	transaction.addSerializationPlugin(network === 'mainnet' ? mainnetPlugin : testnetPlugin);

	let v1 = transaction.moveCall({
		target: `@pkg/qwer::mvr_a::new_v1`,
	});

	transaction.moveCall({
		target: `@pkg/qwer::mvr_a::new`,
		arguments: [v1],
	});

	transaction.makeMoveVec({
		type: '@pkg/qwer::mvr_a::V1',
		elements: [
			transaction.moveCall({
				target: `@pkg/qwer::mvr_a::new_v1`,
			}),
		],
	});

	// Adding a move call with regular addresses, to validate that
	// a mix of addresses & names work too (in the same PTB).
	const coin = transaction.moveCall({
		target: '0x2::coin::zero',
		typeArguments: ['0x2::sui::SUI'],
	});

	transaction.transferObjects([coin], normalizeSuiAddress('0x2'));

	const res = await dryRun(transaction, network);
	expect(res.effects.status.status).toEqual('success');
};

const nestedTypeArgsPtb = async (network: 'mainnet' | 'testnet') => {
	const transaction = new Transaction();

	transaction.addSerializationPlugin(network === 'mainnet' ? mainnetPlugin : testnetPlugin);

	transaction.moveCall({
		target: `@pkg/qwer::mvr_a::noop_with_one_type_param`,
		typeArguments: ['@pkg/qwer::mvr_a::V1'],
	});

	// this combines multiple versions of the same package (v3, v2, v1)
	transaction.moveCall({
		target: `@pkg/qwer::mvr_a::noop_with_two_type_params`,
		typeArguments: ['@pkg/qwer::mvr_a::V1', '@pkg/qwer::mvr_b::V2'],
	});

	const res = await dryRun(transaction, network);
	expect(res.effects.status.status).toEqual('success');
};

const dryRun = async (transaction: Transaction, network: 'mainnet' | 'testnet') => {
	const client = new SuiClient({ url: getFullnodeUrl(network) });

	transaction.setSender(normalizeSuiAddress('0x2'));

	return client.dryRunTransactionBlock({ transactionBlock: await transaction.build({ client }) });
};
