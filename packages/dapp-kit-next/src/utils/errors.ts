// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

export class DAppKitError extends Error {}

/**
 * Thrown when someone attempts to perform an action that requires an active wallet connection.
 */
export class WalletNotConnectedError extends DAppKitError {}

/**
 * Thrown when a wallet is connected but no accounts are authorized.
 */
export class WalletNoAccountsConnectedError extends DAppKitError {}

/**
 * Thrown when a wallet account attempts to invoke a feature on a chain it does not support.
 */
export class ChainNotSupportedError extends DAppKitError {}

/**
 * Thrown when a wallet account attempts to invoke a feature that is not supported.
 */
export class FeatureNotSupportedError extends DAppKitError {}

/**
 * Thrown when an account can't be found for a specific wallet.
 */
export class WalletAccountNotFoundError extends DAppKitError {}
