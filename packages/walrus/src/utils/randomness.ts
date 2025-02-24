// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

type WeightedItem<T> = {
	value: T;
	weight: number;
};

export function weightedShuffle<T>(arr: WeightedItem<T>[]): T[] {
	const totalWeight = arr.reduce((sum, element) => sum + element.weight, 0);

	function getRandomWeightedIndex() {
		const randomWeight = Math.random() * totalWeight;
		let cumulativeWeight = 0;

		for (let i = 0; i < arr.length; i += 1) {
			cumulativeWeight += arr[i].weight;
			if (randomWeight <= cumulativeWeight) {
				return i;
			}
		}

		return arr.length - 1;
	}

	const selectedIndexes = new Set<number>();
	const result: T[] = [];

	while (result.length < arr.length) {
		const index = getRandomWeightedIndex();
		if (!selectedIndexes.has(index)) {
			selectedIndexes.add(index);
			result.push(arr[index].value);
		}
	}

	return result;
}

export function shuffle<T>(arr: T[]): T[] {
	const result = [...arr];

	for (let i = result.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}

	return result;
}
