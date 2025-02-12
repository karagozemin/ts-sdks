// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

export async function* runTasks<T>(
	maxConcurrency: number,
	taskIterator: IterableIterator<() => Promise<T>>,
) {
	async function* createWorkerIterator() {
		for (const task of taskIterator) {
			try {
				yield { result: await task(), error: null };
			} catch (error) {
				yield { result: null, error };
			}
		}
	}

	const asyncIterators = new Array(maxConcurrency);
	for (let i = 0; i < maxConcurrency; i++) {
		asyncIterators[i] = createWorkerIterator();
	}

	yield* raceAsyncIterators(asyncIterators);
}

async function* raceAsyncIterators<T>(asyncIterators: AsyncIterator<T>[]) {
	async function nextResultWithItsIterator(iterator: AsyncIterator<T>) {
		return { result: await iterator.next(), iterator };
	}

	const promises = new Map<
		AsyncIterator<T>,
		Promise<{ result: IteratorResult<T>; iterator: AsyncIterator<T> }>
	>();

	for (const iterator of asyncIterators) {
		promises.set(iterator, nextResultWithItsIterator(iterator));
	}

	while (promises.size > 0) {
		const { result, iterator } = await Promise.race(promises.values());

		if (result.done) {
			promises.delete(iterator);
		} else {
			promises.set(iterator, nextResultWithItsIterator(iterator));
			yield result.value;
		}
	}
}
