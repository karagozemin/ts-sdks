// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { isValidNamedPackage, isValidNamedType } from '../../utils/move-registry.js';
import { normalizeStructTag, parseStructTag } from '../../utils/sui-types.js';
import type { StructTag } from '../../utils/sui-types.js';
import type { TransactionDataBuilder } from '../TransactionData.js';

export type NamedPackagesPluginCache = {
	packages: Record<string, string>;
	types: Record<string, string>;
};

const NAME_SEPARATOR = '/';

export type NameResolutionRequest = {
	id: number;
	type: 'package' | 'moveType';
	name: string;
};

/**
 * Looks up all `.move` names in a transaction block.
 * Returns a list of all the names found.
 */
export function findTransactionBlockNames(builder: TransactionDataBuilder): {
	packages: string[];
	types: string[];
} {
	const packages: Set<string> = new Set();
	const types: Set<string> = new Set();

	for (const command of builder.commands) {
		if (command.MakeMoveVec?.type) {
			getNamesFromTypeList([command.MakeMoveVec.type]).forEach((type) => {
				types.add(type);
			});
			continue;
		}
		if (!('MoveCall' in command)) continue;
		const tx = command.MoveCall;

		if (!tx) continue;

		const pkg = tx.package.split('::')[0];
		if (hasMvrName(pkg)) {
			if (!isValidNamedPackage(pkg)) throw new Error(`Invalid package name: ${pkg}`);
			packages.add(pkg);
		}

		getNamesFromTypeList(tx.typeArguments ?? []).forEach((type) => {
			types.add(type);
		});
	}

	return {
		packages: [...packages],
		types: [...types],
	};
}

// /**
//  * Allows partial replacements of known types with their resolved equivalents.
//  * E.g. `@mvr/demo::a::A<@mvr/demo::b::B>` can be resolved, if we already have
//  * the address for `@mvr/demo::b::B` and the address for `@mvr/demo::a::A`,
//  * without the need to have the full type in the cache.
//  *
//  * Returns the fully composed resolved types (if any) in a `named-type -> normalized-type` map.
//  */
export function composeCachedTypes(types: string[], typeCache: Record<string, string>) {
	const composedTypes: Record<string, string> = {};

	types.forEach((type) => {
		const normalized = normalizeStructTag(findAndReplaceCachedTypes(type, typeCache));
		// we only store composed types IF they no longer have any names in them.
		// Otherwise, we will need to resolve them regardless, as part of the query step.
		if (!hasMvrName(normalized)) composedTypes[type] = normalized;
	});

	return composedTypes;
}

/**
 * Traverses a type, and replaces any found names with their resolved equivalents,
 * based on the supplied type cache.
 */
function findAndReplaceCachedTypes(tag: string | StructTag, typeCache: Record<string, string>) {
	const type = isStructTag(tag) ? tag : parseStructTag(tag);

	let typeTag = `${type.address}::${type.module}::${type.name}`;
	const cacheHit = typeCache[typeTag];

	if (cacheHit) {
		let [mvrName, module, name] = cacheHit.split('::');
		type.address = mvrName;
		type.module = module;
		type.name = name;
	}

	for (const param of type.typeParams.filter((x) => isStructTag(x))) {
		findAndReplaceCachedTypes(param, typeCache);
	}

	return type;
}

/**
 * Given two equivalent types, one with names, and one without,
 * we create a "mapping" of `name -> address`
 *
 * E.g. `@mvr/demo::a::A<@mvr/another-demo::b::B>` -> `0x5::a::A<0x6::b::B>`
 * will result in `{ '@mvr/demo': '0x5', '@mvr/another-demo': '0x6' }`
 */
export function getNameMappingFromResult(
	old: StructTag,
	resolved: StructTag,
	results: Record<string, string> = {},
) {
	if (isValidNamedPackage(old.address)) {
		results[`${old.address}::${old.module}::${old.name}`] =
			`${resolved.address}::${resolved.module}::${resolved.name}`;
	}

	if (old.typeParams.length !== resolved.typeParams.length) {
		throw new Error('Type params length mismatch. You may have supplied non-equivalent types.');
	}

	for (let i = 0; i < old.typeParams.length; i++) {
		const oldParam = old.typeParams[i];
		const resolvedParam = resolved.typeParams[i];

		if (isStructTag(oldParam) && isStructTag(resolvedParam)) {
			getNameMappingFromResult(oldParam, resolvedParam, results);
		}
	}

	return results;
}

/**
 * Replace all names & types in a transaction block
 * with their resolved names/types.
 */
export function replaceNames(builder: TransactionDataBuilder, cache: NamedPackagesPluginCache) {
	for (const command of builder.commands) {
		// Replacements for `MakeMoveVec` commands (that can include types)
		if (command.MakeMoveVec?.type) {
			if (!hasMvrName(command.MakeMoveVec.type)) continue;
			if (!cache.types[command.MakeMoveVec.type])
				throw new Error(`No resolution found for type: ${command.MakeMoveVec.type}`);
			command.MakeMoveVec.type = cache.types[command.MakeMoveVec.type];
		}
		// Replacements for `MoveCall` commands (that can include packages & types)
		const tx = command.MoveCall;
		if (!tx) continue;

		const nameParts = tx.package.split('::');
		const name = nameParts[0];

		if (hasMvrName(name) && !cache.packages[name])
			throw new Error(`No address found for package: ${name}`);

		// Replace package name with address.
		if (hasMvrName(name)) {
			nameParts[0] = cache.packages[name];
			tx.package = nameParts.join('::');
		}

		const types = tx.typeArguments;
		if (!types) continue;

		for (let i = 0; i < types.length; i++) {
			if (!hasMvrName(types[i])) continue;

			if (!cache.types[types[i]]) throw new Error(`No resolution found for type: ${types[i]}`);
			types[i] = cache.types[types[i]];
		}

		tx.typeArguments = types;
	}
}

export function batch<T>(arr: T[], size: number): T[][] {
	const batches = [];
	for (let i = 0; i < arr.length; i += size) {
		batches.push(arr.slice(i, i + size));
	}
	return batches;
}

/**
 * Returns a list of unique types that include a name
 * from the given list. This list is retrieved from the Transaction Data.
 */
function getNamesFromTypeList(types: string[]) {
	const names = new Set<string>();
	for (const type of types) {
		if (hasMvrName(type)) {
			if (!isValidNamedType(type)) throw new Error(`Invalid type with names: ${type}`);
			names.add(type);
		}
	}
	return [...names];
}

function hasMvrName(nameOrType: string) {
	return (
		nameOrType.includes(NAME_SEPARATOR) || nameOrType.includes('@') || nameOrType.includes('.sui')
	);
}

function isStructTag(type: string | StructTag): type is StructTag {
	return (
		typeof type === 'object' &&
		'address' in type &&
		'module' in type &&
		'name' in type &&
		'typeParams' in type
	);
}
