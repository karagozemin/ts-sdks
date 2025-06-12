// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { FileBuilder } from './file-builder.js';
import { readFile } from 'node:fs/promises';
import { deserialize } from '@mysten/move-bytecode-template';
import { normalizeSuiAddress, SUI_FRAMEWORK_ADDRESS } from '@mysten/sui/utils';
import { getSafeName, renderTypeSignature } from './render-types.js';
import { mapToObject, parseTS } from './utils.js';
import type { ModuleSummary, Type } from './types/summary.js';
import { summaryFromDeserializedModule } from './summary.js';
import { basename } from 'node:path';
import type { DeserializedModule } from './types/deserialized.js';

export class MoveModuleBuilder extends FileBuilder {
	summary: ModuleSummary;
	module: string;
	address: string;

	constructor({
		summary,
		module,
		address,
	}: {
		summary: ModuleSummary;
		module: string;
		address: string;
	}) {
		super();
		this.summary = summary;
		this.module = module;
		this.address = address;
	}

	static async fromFile(file: string) {
		const bytes = await readFile(file);
		const deserialized: DeserializedModule = deserialize(bytes);

		return new MoveModuleBuilder({
			summary: summaryFromDeserializedModule(deserialized),
			module: basename(file, '.mv'),
			address: normalizeSuiAddress(
				deserialized.address_identifiers[deserialized.self_module_handle_idx],
			),
		});
	}

	renderBCSTypes() {
		this.addImport('@mysten/sui/bcs', 'bcs');
		this.renderStructs();
		this.renderEnums();
	}

	hasBcsTypes() {
		return (
			Object.keys(this.summary.structs).length > 0 || Object.keys(this.summary.enums).length > 0
		);
	}

	hasTypesOrFunctions() {
		return this.hasBcsTypes() || Object.keys(this.summary.functions).length > 0;
	}

	renderStructs() {
		for (const [name, struct] of Object.entries(this.summary.structs)) {
			this.exports.push(name);

			const fields = Object.entries(struct.fields.fields);
			const fieldObject = mapToObject(fields, ([name, field]) => [
				name,
				renderTypeSignature(field.type_, {
					format: 'bcs',
					summary: this.summary,
					onDependency: (address, mod) =>
						this.addStarImport(
							address === this.summary.id.address
								? `./${mod}.js`
								: `~root/deps/${address}/${mod}.js`,
							mod,
						),
				}),
			]);

			const params = struct.type_parameters.filter((param) => !param.phantom);

			if (params.length === 0) {
				this.statements.push(
					...parseTS/* ts */ `export function ${name}() {
						return bcs.struct('${name}', ${fieldObject})
					}`,
				);
			} else {
				this.addImport('@mysten/sui/bcs', 'type BcsType');

				const typeParams = `...typeParameters: [${params.map((_, i) => `T${i}`).join(', ')}]`;
				const typeGenerics = `${params.map((_, i) => `T${i} extends BcsType<any>`).join(', ')}`;

				this.statements.push(
					...parseTS/* ts */ `export function ${name}<${typeGenerics}>(${typeParams}) {
						return bcs.struct('${name}', ${fieldObject})
					}`,
				);
			}
		}
	}

	renderEnums() {
		for (const [name, enumDef] of Object.entries(this.summary.enums)) {
			this.exports.push(name);

			const variants = Object.entries(enumDef.variants).map(([variantName, variant]) => ({
				name: variantName,
				fields: Object.entries(variant.fields.fields).map(([fieldName, field]) => ({
					name: fieldName,
					signature: renderTypeSignature(field.type_, {
						format: 'bcs',
						summary: this.summary,
						onDependency: (address, mod) =>
							this.addStarImport(
								address === this.summary.id.address
									? `./${mod}.js`
									: `~root/deps/${address}/${mod}.js`,
								mod,
							),
					}),
				})),
			}));

			const variantsObject = mapToObject(variants, (variant) => [
				variant.name,
				variant.fields.length === 0
					? 'null'
					: variant.fields.length === 1
						? variant.fields[0].signature
						: `bcs.tuple([${variant.fields.map((field) => field.signature).join(', ')}])`,
			]);

			const params = enumDef.type_parameters.filter((param) => !param.phantom);

			if (params.length === 0) {
				this.statements.push(
					...parseTS/* ts */ `
					export function ${name}( ) {
						return bcs.enum('${name}', ${variantsObject})
					}`,
				);
			} else {
				this.addImport('@mysten/sui/bcs', 'type BcsType');

				const typeParams = `...typeParameters: [${params.map((_, i) => `T${i}`).join(', ')}]`;
				const typeGenerics = `${params.map((_, i) => `T${i} extends BcsType<any>`).join(', ')}`;

				this.statements.push(
					...parseTS/* ts */ `
					export function ${name}<${typeGenerics}>(${typeParams}) {
						return bcs.enum('${name}', ${variantsObject})
					}`,
				);
			}
		}
	}

	renderFunctions() {
		const statements = [];
		const names = [];

		if (Object.keys(this.summary.functions).length !== 0) {
			this.addImport('@mysten/sui/transactions', 'type Transaction');
		}

		for (const [name, func] of Object.entries(this.summary.functions)) {
			const parameters = func.parameters.filter((param) => !this.isContextReference(param.type_));
			const fnName = getSafeName(name);

			this.addImport('~root/utils/index.js', 'normalizeMoveArguments');
			this.addImport('~root/utils/index.js', 'type RawTransactionArgument');

			names.push(fnName);

			const usedTypeParameters = new Set<number>();
			const argumentsTypes = parameters
				.map((param) =>
					renderTypeSignature(param.type_, {
						format: 'typescriptArg',
						summary: this.summary,
						onTypeParameter: (typeParameter) => usedTypeParameters.add(typeParameter),
					}),
				)
				.map((type) => `RawTransactionArgument<${type}>`)
				.join(',\n');

			const typeParameters = func.type_parameters.filter((_, i) => usedTypeParameters.has(i));

			if (usedTypeParameters.size > 0) {
				this.addImport('@mysten/sui/bcs', 'type BcsType');
			}

			statements.push(
				...parseTS/* ts */ `function
					${fnName}${
						typeParameters.length
							? `<
							${typeParameters.map((_, i) => `T${i} extends BcsType<any>`)}
						>`
							: ''
					}(options: {
						arguments: [
						${argumentsTypes}],

						${
							func.type_parameters.length
								? `typeArguments: [${func.type_parameters.map(() => 'string').join(', ')}]`
								: ''
						}
				}) {
					const argumentsTypes = [
						${parameters
							.map((param) =>
								renderTypeSignature(param.type_, {
									format: 'typeTag',
									summary: this.summary,
								}),
							)
							.map((tag) => (tag.includes('{') ? `\`${tag}\`` : `'${tag}'`))
							.join(',\n')}
					]
					return (tx: Transaction) => tx.moveCall({
						package: packageAddress,
						module: '${this.module}',
						function: '${name}',
						arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
						${func.type_parameters.length ? 'typeArguments: options.typeArguments' : ''}
					})
				}`,
			);
		}

		this.statements.push(
			...parseTS/* ts */ `
			export function init(packageAddress: string) {
				${statements}

				return { ${names.join(', ')} }
			}`,
		);
	}

	isContextReference(type: Type): boolean {
		if (typeof type === 'string') {
			return false;
		}

		if ('Reference' in type) {
			return this.isContextReference(type.Reference[1]);
		}

		if ('Datatype' in type) {
			return (
				normalizeSuiAddress(type.Datatype.module.address) ===
					normalizeSuiAddress(SUI_FRAMEWORK_ADDRESS) && type.Datatype.name === 'TxContext'
			);
		}

		return false;
	}
}
