// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import queryPlugin from '@tanstack/eslint-plugin-query';

import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import headerPlugin from 'eslint-plugin-header';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import importExtensionsPlugin from 'eslint-plugin-import-extensions';
import litPlugin from 'eslint-plugin-lit';
import globals from 'globals';

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.recommended,
	//litPlugin.configs['flat/recommended'],
	//queryPlugin.configs.recommended,
	//prettierConfig,
	//prettierPlugin.configs.recommended,
	//importPlugin.configs.typescript,
	{
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: 'module',
			globals: {
				...globals.es2020,
			},
		},
		settings: {
			react: {
				version: '18',
			},
			'import/resolver': {
				typescript: true,
			},
		},
		plugins: {
			// '@tanstack/query': queryPlugin,
			// 'unused-imports': unusedImportsPlugin,
			// prettier: prettierPlugin,
			header: headerPlugin,
			// '@typescript-eslint': tseslint.plugin,
			// 'import-extensions': importExtensionsPlugin,
			// lit: litPlugin,
			// //import: importPlugin,
		},
		ignores: [
			'node_modules',
			'build',
			'dist',
			'coverage',
			'next-env.d.ts',
			'doc/book',
			'external-crates',
			'storybook-static',
			'.next',
			'packages/docs/public/typedoc',
			'packages/move-bytecode-template/pkg',
			'packages/walrus-wasm',
			'packages/walrus/src/node-api',
			'generated',
		],
		rules: {
			'prefer-const': 'error',
			'no-case-declarations': 'off',
			'no-implicit-coercion': [2, { number: true, string: true, boolean: false }],
			'@typescript-eslint/no-redeclare': 'off',
			'@typescript-eslint/no-restricted-types': [
				'error',
				{
					types: {
						Buffer:
							'Buffer usage increases bundle size and is not consistently implemented on web.',
					},
				},
			],
			'no-restricted-globals': [
				'error',
				{
					name: 'Buffer',
					message: 'Buffer usage increases bundle size and is not consistently implemented on web.',
				},
			],
			'header/header': [
				2,
				'line',
				[' Copyright (c) Mysten Labs, Inc.', ' SPDX-License-Identifier: Apache-2.0'],
			],
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					vars: 'all',
					args: 'none',
					ignoreRestSiblings: true,
				},
			],
		},
	},
	{
		files: ['packages/**/*'],
		rules: {
			'require-extensions/require-extensions': 'error',
			'require-extensions/require-index': 'error',
			'@typescript-eslint/consistent-type-imports': ['error'],
			'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
			'import/no-cycle': ['error'],
		},
	},
	{
		files: ['dapps/kiosk/**/*'],
		rules: {
			'no-unused-vars': 'off',
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],
		},
	},
	{
		files: ['packages/ledgerjs-hw-app-sui/**/*', 'apps/wallet/**/*'],
		rules: {
			'no-restricted-globals': ['off'],
			'@typescript-eslint/ban-types': ['off'],
		},
	},
	{
		files: ['*.test.*', '*.spec.*'],
		rules: {
			'require-extensions/require-extensions': 'off',
			'require-extensions/require-index': 'off',
			'@typescript-eslint/consistent-type-imports': ['off'],
			'import/consistent-type-specifier-style': ['off'],
			'no-restricted-globals': ['off'],
			'@typescript-eslint/ban-types': ['error'],
		},
	},
	{
		files: ['packages/create-dapp/templates/**/*'],
		rules: {
			'header/header': 'off',
			'require-extensions/require-extensions': 'off',
		},
	},
);
