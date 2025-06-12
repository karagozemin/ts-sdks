// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { normalizeSuiAddress } from '@mysten/sui/utils';

import type { Datatype, ModuleSummary, Type } from './types/summary.js';

const MOVE_STDLIB_ADDRESS = normalizeSuiAddress('0x1');
const SUI_FRAMEWORK_ADDRESS = normalizeSuiAddress('0x2');

type TypeSignatureFormat = 'typescriptArg' | 'bcs' | 'typeTag';
interface RenderTypeSignatureOptions {
	format: TypeSignatureFormat;
	summary: ModuleSummary;
	onDependency?: (address: string, name: string) => void;
	onTypeParameter?: (typeParameter: number) => void;
}

export function renderTypeSignature(type: Type, options: RenderTypeSignatureOptions): string {
	switch (type) {
		case 'address':
			switch (options.format) {
				case 'typescriptArg':
					return 'string';
				case 'typeTag':
					return `address`;
				case 'bcs':
					return 'bcs.Address';
				default:
					throw new Error(`Unknown format: ${options.format}`);
			}
		case 'bool':
			switch (options.format) {
				case 'typescriptArg':
					return 'boolean';
				case 'typeTag':
					return `bool`;
				case 'bcs':
					return 'bcs.bool()';
				default:
					throw new Error(`Unknown format: ${options.format}`);
			}
		case 'u8':
		case 'u16':
		case 'u32':
			switch (options.format) {
				case 'typescriptArg':
					return 'number';
				case 'typeTag':
					return type.toLowerCase();
				case 'bcs':
					return `bcs.${type.toLowerCase()}()`;
				default:
					throw new Error(`Unknown format: ${options.format}`);
			}
		case 'u64':
		case 'u128':
		case 'u256':
			switch (options.format) {
				case 'typescriptArg':
					return `number | bigint`;
				case 'typeTag':
					return type.toLowerCase();
				case 'bcs':
					return `bcs.${type.toLowerCase()}()`;
				default:
					throw new Error(`Unknown format: ${options.format}`);
			}
		case 'signer':
			throw new Error('Signer is not supported');
		case '_':
			throw new Error('Macro placeholder is not supported');
	}

	if ('Datatype' in type) {
		return renderDataType(type.Datatype, options);
	}

	if ('Reference' in type) {
		return renderTypeSignature(type.Reference[1], options);
	}

	if ('vector' in type) {
		switch (options.format) {
			case 'typescriptArg':
				return `${renderTypeSignature(type.vector, options)}[]`;
			case 'typeTag':
				return `vector<${renderTypeSignature(type.vector, options)}>`;
			case 'bcs':
				return `bcs.vector(${renderTypeSignature(type.vector, options)})`;
			default:
				throw new Error(`Unknown format: ${options.format}`);
		}
	}

	if ('TypeParameter' in type) {
		options.onTypeParameter?.(type.TypeParameter);
		switch (options.format) {
			case 'typescriptArg':
				return `T${type.TypeParameter}`;
			case 'typeTag':
				return `\${options.typeArguments[${type.TypeParameter}]}`;
			case 'bcs':
				return `typeParameters[${type.TypeParameter}]`;
			default:
				throw new Error(`Unknown format: ${options.format}`);
		}
	}

	throw new Error(`Unknown type signature: ${JSON.stringify(type, null, 2)}`);
}

export function isPureSignature(type: Type): boolean {
	if (typeof type === 'string') {
		return true;
	}

	if ('Reference' in type) {
		return isPureSignature(type.Reference[1]);
	}

	if ('Datatype' in type) {
		return isPureDataType(type.Datatype);
	}

	if ('vector' in type) {
		return isPureSignature(type.vector);
	}

	if ('TypeParameter' in type) {
		return false;
	}

	throw new Error(`Unknown type signature: ${JSON.stringify(type, null, 2)}`);
}

function isPureDataType(type: Datatype) {
	if (type.module.address === MOVE_STDLIB_ADDRESS) {
		if ((type.module.name === 'ascii' || type.module.name === 'string') && type.name === 'String') {
			return true;
		}

		if (type.module.name === 'option' && type.name === 'Option') {
			return true;
		}
	}

	if (type.module.address === SUI_FRAMEWORK_ADDRESS) {
		if (type.module.name === 'object' && type.name === 'ID') {
			return true;
		}
	}

	return false;
}

function renderDataType(type: Datatype, options: RenderTypeSignatureOptions): string {
	if (options.format === 'typeTag') {
		const typeArgs = type.type_arguments.map((type) => renderTypeSignature(type.argument, options));

		if (typeArgs.length === 0) {
			// eslint-disable-next-line no-template-curly-in-string
			return `${type.module.address === options.summary.id.address ? '${packageAddress}' : type.module.address}::${type.module.name}::${type.name}`;
		}

		// eslint-disable-next-line no-template-curly-in-string
		return `${type.module.address === options.summary.id.address ? '${packageAddress}' : type.module.address}::${type.module.name}::${type.name}<${typeArgs.join(', ')}>`;
	}

	if (type.module.address === MOVE_STDLIB_ADDRESS) {
		if ((type.module.name === 'ascii' || type.module.name === 'string') && type.name === 'String') {
			switch (options.format) {
				case 'typescriptArg':
					return 'string';
				case 'bcs':
					return 'bcs.string()';
				default:
					throw new Error(`Unknown format: ${options.format}`);
			}
		}

		if (type.module.name === 'option' && type.name === 'Option') {
			switch (options.format) {
				case 'typescriptArg':
					if (isPureDataType(type)) {
						return `${renderTypeSignature(type.type_arguments[0].argument, options)} | null`;
					}
					break;
				case 'bcs':
					return `bcs.option(${renderTypeSignature(type.type_arguments[0].argument, options)})`;
				default:
					throw new Error(`Unknown format: ${options.format}`);
			}
		}
	}

	if (type.module.address === SUI_FRAMEWORK_ADDRESS) {
		if (type.module.name === 'object' && type.name === 'ID') {
			switch (options.format) {
				case 'typescriptArg':
					return 'string';
				case 'bcs':
					return 'bcs.Address';
				default:
					throw new Error(`Unknown format: ${options.format}`);
			}
		}
	}

	const isCurrentModule =
		type.module.address === options.summary.id.address &&
		type.module.name === options.summary.id.module;

	const typeNameRef = isCurrentModule
		? type.name
		: `${getSafeName(type.module.name)}.${getSafeName(type.name)}`;

	if (!isCurrentModule) {
		options.onDependency?.(type.module.address, type.module.name);
	}

	switch (options.format) {
		case 'typescriptArg':
			return 'string';
		case 'bcs':
			return `${typeNameRef}(
                ${type.type_arguments
									.filter((arg) => !arg.is_phantom)
									.map((type) => renderTypeSignature(type.argument, options))
									.join(', ')})`;
		default:
			throw new Error(`Unknown format: ${options.format}`);
	}
}

const JS_RESERVED_NAMES = [
	'new',
	'delete',
	'class',
	'function',
	'import',
	'export',
	'return',
	'this',
	'super',
	'arguments',
	'eval',
	'void',
	'typeof',
	'instanceof',
	'delete',
	'in',
	'from',
	'of',
	'as',
	'async',
	'await',
	'break',
	'case',
	'catch',
	'continue',
	'debugger',
	'default',
	'do',
	'else',
	'finally',
	'for',
	'function',
	'if',
	'import',
	'in',
	'instanceof',
	'new',
	'return',
	'switch',
	'throw',
	'try',
	'typeof',
	'var',
	'void',
	'while',
	'with',
	'yield',
	'package',
];

export function getSafeName(name: string) {
	return JS_RESERVED_NAMES.includes(name) ? `_${name}` : name;
}
