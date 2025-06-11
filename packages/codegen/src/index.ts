// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { normalizeSuiAddress } from '@mysten/sui/utils';
import { MoveModuleBuilder } from './move-module-builder.js';

export async function generatePackage({
	source,
	destination,
	name,
}: {
	source: string;
	destination: string;
	name: string;
}) {
	const modules = (await readdir(join(source, 'build', name, 'bytecode_modules')))
		.map((mod) => join(source, 'build', name, 'bytecode_modules', mod))
		.filter((mod) => mod.endsWith('.mv'));

	const builders = await Promise.all(modules.map((mod) => MoveModuleBuilder.fromFile(mod)));

	for (const builder of builders) {
		if (!builder.hasTypesOrFunctions()) {
			continue;
		}

		builder.renderBCSTypes();
		builder.renderFunctions();

		await mkdir(destination, { recursive: true });
		await writeFile(
			join(destination, `${builder.module}.ts`),
			builder.toString('./', `./${builder.module}.ts`),
		);
	}

	const depsPath = join(source, 'build', name, 'bytecode_modules', 'dependencies');
	const depDirs = await readdir(depsPath);

	for (const dir of depDirs) {
		const modules = await readdir(join(depsPath, dir));

		for (const modFile of modules) {
			const builder = await MoveModuleBuilder.fromFile(join(depsPath, dir, modFile));

			if (!builder.hasBcsTypes()) {
				continue;
			}

			const moduleAddress = normalizeSuiAddress(builder.address);
			builder.renderBCSTypes();
			await mkdir(join(destination, 'deps', moduleAddress), { recursive: true });
			await writeFile(
				join(destination, 'deps', moduleAddress, `${builder.module}.ts`),
				builder.toString('./', `./deps/${moduleAddress}/${builder.module}.ts`),
			);
		}
	}
}
