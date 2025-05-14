export type NonEmptyArray<T> = readonly [T, ...T[]] | readonly [...T[], T] | readonly [T, ...T[], T];
export type Simplify<T> = {
    [K in keyof T]: T[K];
} & {};
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
