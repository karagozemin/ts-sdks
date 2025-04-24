// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Experimental_CoreClient } from '../core.js';
import type { Experimental_SuiClientTypes } from '../types.js';
import type { GraphQLQueryOptions, SuiGraphQLClient } from '../../graphql/client.js';
import { MultiGetObjectsDocument } from '../../graphql/generated/queries.js';

export class GraphQLTransport extends Experimental_CoreClient {
	#graphqlClient: SuiGraphQLClient;

	constructor(graphqlClient: SuiGraphQLClient) {
		super({ network: graphqlClient.network });
		this.#graphqlClient = graphqlClient;
	}

	async #graphqlQuery<
		Result = Record<string, unknown>,
		Variables = Record<string, unknown>,
		Data = Result,
	>(
		options: GraphQLQueryOptions<Result, Variables>,
		getData?: (result: Result) => Data,
	): Promise<NonNullable<Data>> {
		const { data, errors } = await this.#graphqlClient.query(options);

		handleGraphQLErrors(errors);

		const extractedData = data && (getData ? getData(data) : data);

		if (extractedData == null) {
			throw new Error('Missing response data');
		}

		return extractedData as NonNullable<Data>;
	}

	async getObjects(
		options: Experimental_SuiClientTypes.GetObjectsOptions,
	): Promise<Experimental_SuiClientTypes.GetObjectsResponse> {
		const objectEdges = await this.#graphqlQuery(
			{
				query: MultiGetObjectsDocument,
				variables: {
					ids: options.objectIds,
				},
			},
			(result) => result.objects.nodes,
		);

		return options.objectIds.map((id) => objectEdges.find((edge) => edge.id === id));
	}
	async getOwnedObjects(
		options: Experimental_SuiClientTypes.GetOwnedObjectsOptions,
	): Promise<Experimental_SuiClientTypes.GetOwnedObjectsResponse> {
		throw new Error('Not implemented');
	}

	async getCoins(
		options: Experimental_SuiClientTypes.GetCoinsOptions,
	): Promise<Experimental_SuiClientTypes.GetCoinsResponse> {
		throw new Error('Not implemented');
	}

	async getBalance(
		options: Experimental_SuiClientTypes.GetBalanceOptions,
	): Promise<Experimental_SuiClientTypes.GetBalanceResponse> {
		throw new Error('Not implemented');
	}
	async getAllBalances(
		options: Experimental_SuiClientTypes.GetAllBalancesOptions,
	): Promise<Experimental_SuiClientTypes.GetAllBalancesResponse> {
		throw new Error('Not implemented');
	}
	async getTransaction(
		options: Experimental_SuiClientTypes.GetTransactionOptions,
	): Promise<Experimental_SuiClientTypes.GetTransactionResponse> {
		throw new Error('Not implemented');
	}
	async executeTransaction(
		options: Experimental_SuiClientTypes.ExecuteTransactionOptions,
	): Promise<Experimental_SuiClientTypes.ExecuteTransactionResponse> {
		throw new Error('Not implemented');
	}
	async dryRunTransaction(
		options: Experimental_SuiClientTypes.DryRunTransactionOptions,
	): Promise<Experimental_SuiClientTypes.DryRunTransactionResponse> {
		throw new Error('Not implemented');
	}
	async getReferenceGasPrice(): Promise<Experimental_SuiClientTypes.GetReferenceGasPriceResponse> {
		throw new Error('Not implemented');
	}

	async getDynamicFields(
		options: Experimental_SuiClientTypes.GetDynamicFieldsOptions,
	): Promise<Experimental_SuiClientTypes.GetDynamicFieldsResponse> {
		throw new Error('Not implemented');
	}
}

export type GraphQLResponseErrors = Array<{
	message: string;
	locations?: { line: number; column: number }[];
	path?: (string | number)[];
}>;

function handleGraphQLErrors(errors: GraphQLResponseErrors | undefined): void {
	if (!errors || errors.length === 0) return;

	const errorInstances = errors.map((error) => new GraphQLResponseError(error));

	if (errorInstances.length === 1) {
		throw errorInstances[0];
	}

	throw new AggregateError(errorInstances);
}

class GraphQLResponseError extends Error {
	locations?: Array<{ line: number; column: number }>;

	constructor(error: GraphQLResponseErrors[0]) {
		super(error.message);
		this.locations = error.locations;
	}
}
