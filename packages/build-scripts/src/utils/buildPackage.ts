// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import * as child_process from 'child_process';
import { existsSync, promises as fs } from 'fs';
import util from 'node:util';
import * as path from 'path';
import type { BuildOptions } from 'esbuild';
import { build } from 'esbuild';
import { findUp } from 'find-up';

interface PackageJSON {
	name?: string;
	type?: 'module' | 'commonjs';
	exports?: Record<string, string | Record<string, string>>;
	files?: string[];
	types?: string;
	import?: string;
	main?: string;
	private?: boolean;
	sideEffects?: boolean;
}

const ignorePatterns = [/\.test.ts$/, /\.graphql$/];

const exec = util.promisify(child_process.exec);

export async function buildPackage(buildOptions?: BuildOptions) {
	const allFiles = await findAllFiles(path.join(process.cwd(), 'src'));
	const packageJson = await readPackageJson();
	await clean();
	await buildCJS(allFiles, packageJson, buildOptions);
	await buildESM(allFiles, packageJson, buildOptions);
	await buildImportDirectories(packageJson);
}

async function findAllFiles(dir: string, files: string[] = []) {
	const dirFiles = await fs.readdir(dir);
	for (const file of dirFiles) {
		const filePath = path.join(dir, file);
		const fileStat = await fs.stat(filePath);
		if (fileStat.isDirectory()) {
			await findAllFiles(filePath, files);
		} else if (!ignorePatterns.some((pattern) => pattern.test(filePath))) {
			files.push(filePath);
		}
	}
	return files;
}

async function clean() {
	await createEmptyDir(path.join(process.cwd(), 'dist'));
}

async function buildCJS(
	entryPoints: string[],
	{ sideEffects }: PackageJSON,
	buildOptions?: BuildOptions,
) {
	await Promise.all([
		build({
			format: 'cjs',
			logLevel: 'error',
			target: 'es2020',
			entryPoints,
			outdir: 'dist/cjs',
			sourcemap: true,
			outbase: 'src',
			...buildOptions,
		}),
		buildTypes('tsconfig.json'),
	]);

	const pkg: PackageJSON = {
		private: true,
		type: 'commonjs',
	};

	if (sideEffects === false) {
		pkg.sideEffects = false;
	}

	await fs.writeFile(
		path.join(process.cwd(), 'dist/cjs/package.json'),
		JSON.stringify(pkg, null, 2),
	);
}

async function buildESM(
	entryPoints: string[],
	{ sideEffects }: PackageJSON,
	buildOptions?: BuildOptions,
) {
	await build({
		format: 'esm',
		logLevel: 'error',
		target: 'es2020',
		entryPoints,
		outdir: 'dist/esm',
		outbase: 'src',
		sourcemap: true,

		...buildOptions,
	});
	await buildTypes('tsconfig.esm.json');

	const pkg: PackageJSON = {
		private: true,
		type: 'module',
	};

	if (sideEffects === false) {
		pkg.sideEffects = false;
	}

	await fs.writeFile(
		path.join(process.cwd(), 'dist/esm/package.json'),
		JSON.stringify(pkg, null, 2),
	);
}

async function buildTypes(config: string) {
	return exec(`pnpm tsc --project ${config}`);
}

async function buildImportDirectories({ exports, sideEffects }: PackageJSON) {
	if (!exports) {
		return;
	}

	const exportDirs = new Set<string>();
	const workspaceRoot = await getWorkspaceConfigPath();
	const ignoredWorkspaces = [];

	for (const [exportName, exportMap] of Object.entries(exports)) {
		if (typeof exportMap !== 'object' || !exportName.match(/^\.\/[\w\-_/]+/)) {
			continue;
		}

		const exportDir = path.join(process.cwd(), exportName);
		const parts = exportName.split('/');
		exportDirs.add(parts[1]);

		if (parts.length >= 2 && !exportDir.endsWith('.css')) {
			ignoredWorkspaces.push(path.relative(path.dirname(workspaceRoot), exportDir));
		}

		await createEmptyDir(exportDir);

		const pkg: PackageJSON = {
			private: true,
			types:
				exportMap.types && path.relative(exportDir, path.resolve(process.cwd(), exportMap.types)),
			import:
				exportMap.import && path.relative(exportDir, path.resolve(process.cwd(), exportMap.import)),
			main: path.relative(
				exportDir,
				path.resolve(process.cwd(), exportMap.require ?? exportMap.default),
			),
		};

		if (sideEffects === false) {
			pkg.sideEffects = false;
		}

		await fs.writeFile(
			path.join(exportDir, 'package.json'),
			`${JSON.stringify(pkg, null, '\t')}\n`,
		);
	}

	await addPackageFiles([...exportDirs]);
	await addIgnoredWorkspaces(ignoredWorkspaces);
}

async function createEmptyDir(path: string) {
	if (existsSync(path)) {
		await fs.rm(path, { recursive: true, force: true, maxRetries: 5 });
	}

	await fs.mkdir(path, { recursive: true });
}

async function readPackageJson() {
	return JSON.parse(
		await fs.readFile(path.join(process.cwd(), 'package.json'), 'utf-8'),
	) as PackageJSON;
}

async function addPackageFiles(paths: string[]) {
	const json = await readPackageJson();

	if (!json.files) {
		return;
	}

	for (const path of paths) {
		if (!json.files.includes(path)) {
			json.files.push(path);
		}
	}

	json.files.sort();

	await fs.writeFile(
		path.join(process.cwd(), 'package.json'),
		`${JSON.stringify(json, null, '\t')}\n`,
	);
}

async function addIgnoredWorkspaces(paths: string[]) {
	const workspacePath = await getWorkspaceConfigPath();

	const file = await fs.readFile(workspacePath, 'utf-8');
	const lines = file.split('\n').filter(Boolean);
	let changed = false;

	for (const path of paths) {
		if (!lines.find((line) => line.includes(`!${path}`))) {
			changed = true;
			lines.push(`  - '!${path}'`);
		}
	}

	if (changed) {
		lines.push('');
		await fs.writeFile(workspacePath, lines.join('\n'));
	}
}

async function getWorkspaceConfigPath() {
	const workspacePath = await findUp('pnpm-workspace.yaml');

	if (!workspacePath) {
		throw new Error('Failed to find `pnpm-workspace.yaml`.');
	}

	return workspacePath;
}
