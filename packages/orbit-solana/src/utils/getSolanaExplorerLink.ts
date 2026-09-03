/**
 * @file This file contains a utility function for generating Solana transaction explorer links.
 */

import { getCluster } from './clusterHelpers';

/**
 * Base URL for the official Solana Explorer.
 */
const SOLANA_EXPLORER_BASE_URL = 'https://explorer.solana.com';

/**
 * Generates a full URL to an account, transaction, or block on the Solana explorer.
 *
 * @param url - The path after baseUrl (e.g. '/tx/...' or '/address/...').
 * @param chainId - Chain ID or cluster name.
 * @returns The full URL on the Solana explorer.
 */
export const getSolanaExplorerLink = (url?: string, chainId?: string | number | undefined): string => {
  const cluster = getCluster({ cluster: String(chainId) }) ?? 'mainnet';
  const sanitizedBaseUrl = SOLANA_EXPLORER_BASE_URL;
  // Build the cluster query parameter if provided.
  const clusterParam = cluster && cluster !== 'mainnet' ? `?cluster=${cluster}` : '';

  const path = url ? (url.startsWith('/') ? url : `/${url}`) : '/';
  return `${sanitizedBaseUrl}${path}${clusterParam}`;
};
