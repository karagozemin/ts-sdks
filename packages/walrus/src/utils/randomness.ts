// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

type WeightedItem<T> = {
	value: T;
	weight: number;
};

export function weightedShuffle<T>(array: WeightedItem<T>[]): T[] {
	const result: T[] = [];
	const remainingItems = [...array];

	for (let i = 0; i < array.length; i += 1) {
		let totalWeight = remainingItems.reduce((sum, { weight }) => sum + weight, 0);
		let randomValue = Math.random() * totalWeight;
		let cumulativeWeight = 0;

		for (let j = 0; j < remainingItems.length; j) {
			const { value, weight } = remainingItems[j];
			cumulativeWeight += weight;

			if (randomValue <= cumulativeWeight) {
				result.push(value);
				remainingItems.splice(j, 1);
				break;
			}
		}
	}

	return result;
}

export function shuffle<T>(arr: readonly T[]): T[] {
	const result = [...arr];

	for (let i = result.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}

	return result;
}
