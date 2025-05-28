#!/usr/bin/env node
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { run } from '@stricli/core';
import { buildContext } from '../cli/context.js';
import { buildCli } from '../cli/cli.js';

const { version }: { version: string } = require(
	__dirname.endsWith('src/bin') ? '../../package.json' : '../../../package.json',
);

async function main() {
	await run(buildCli(version), process.argv.slice(2), buildContext(process));
}

main().then(
	() => process.exit(0),
	(error) => {
		console.error(error);
		process.exit(1);
	},
);
