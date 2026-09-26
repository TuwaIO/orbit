/**
 * @file This file contains a utility function for generating Solana transaction explorer links.
 */

import { getCluster } from './clusterHelpers';

/**
 * Base URL for the official Solana Explorer.
 */
const SOLANA_EXPLORER_BASE_URL = 'https://explorer.solana.com';

/**
 * Cluster monikers the explorer shows by default, so they need no `cluster` query parameter.
 */
const DEFAULT_EXPLORER_CLUSTERS = new Set(['mainnet', 'mainnet-beta']);

/**
 * Generates a full URL to an account, transaction, or block on the Solana explorer.
 *
 * @param url - The path after baseUrl (e.g. '/tx/...' or '/address/...').
 * @param chainId - Chain ID or cluster name (e.g. 'devnet' or 'solana:devnet').
 * Mainnet ('mainnet', 'mainnet-beta') or an omitted value produces a link without a `cluster` query parameter.
 * @returns The full URL on the Solana explorer.
 */
export const getSolanaExplorerLink = (url?: string, chainId?: string | number | undefined): string => {
  const cluster = getCluster({ cluster: chainId === undefined ? undefined : String(chainId) });
  const sanitizedBaseUrl = SOLANA_EXPLORER_BASE_URL;
  // Only non-mainnet clusters need an explicit query parameter.
  const clusterParam = DEFAULT_EXPLORER_CLUSTERS.has(cluster) ? '' : `?cluster=${cluster}`;

  const path = url ? (url.startsWith('/') ? url : `/${url}`) : '/';
  return `${sanitizedBaseUrl}${path}${clusterParam}`;
};
