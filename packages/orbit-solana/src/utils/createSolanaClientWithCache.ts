/**
 * RPC Client Caching Module
 *
 * This module provides a caching mechanism for Solana RPC clients to optimize
 * performance and resource usage by reusing existing client instances.
 *
 * @module RpcClientCache
 */

import { createSolanaRpcSubscriptions } from '@solana/kit';

import type { SolanaClient, SolanaClusterMoniker, SolanaRpcUrl } from '../types';
import { createClientCache } from './clientCache';
import { createRpcOver } from './createRpcOver';

/**
 * Converts an HTTP/HTTPS URL to a WS/WSS URL for subscriptions.
 *
 * @param httpUrl - The HTTP URL to convert.
 * @returns The converted WebSocket URL.
 */
function toWebSocketUrl(httpUrl: string): string {
  return httpUrl.replace(/^http/, 'ws');
}

/**
 * In-memory cache storage for Solana client instances
 *
 * @internal
 */
const clientsCache = createClientCache((urls): SolanaClient => {
  const rpc = createRpcOver(urls);
  let rpcSubscriptions;
  try {
    rpcSubscriptions = createSolanaRpcSubscriptions(toWebSocketUrl(urls[0]));
  } catch {
    // If WebSocket transport cannot be initialized, omit rpcSubscriptions
  }

  return {
    rpc,
    ...(rpcSubscriptions ? { rpcSubscriptions } : {}),
  };
});

/**
 * Creates or retrieves a cached Solana RPC client instance
 *
 * This function implements a caching mechanism for Solana RPC clients to:
 * - Avoid redundant client instance creation
 * - Optimize memory usage
 * - Maintain consistent client instances throughout the application
 *
 * Clients are cached by their URLs; a cluster without URLs in `rpcUrls` gets the client it already has, otherwise one over its public
 * endpoint. A cluster with several URLs reads the next one when one fails or answers with an HTTP error, and leaves it alone for a
 * minute; its subscriptions go to the first.
 *
 * @param params - Object containing rpcUrlOrMoniker and optional rpcUrls
 * @param params.rpcUrlOrMoniker - RPC endpoint URL or cluster moniker (e.g., 'mainnet', 'devnet')
 * @param params.rpcUrls - Optional custom mapping of cluster monikers to RPC endpoints, one or several a cluster
 * @returns Cached or newly created Solana RPC client instance
 * @throws Error if unable to resolve a valid RPC URL
 */
export const createSolanaClientWithCache = ({
  rpcUrlOrMoniker,
  rpcUrls,
}: {
  rpcUrlOrMoniker: string;
  rpcUrls?: Partial<Record<SolanaClusterMoniker, SolanaRpcUrl>>;
}): SolanaClient => clientsCache.get(rpcUrlOrMoniker, rpcUrls);

/**
 * Clears the Solana client cache.
 * @internal
 */
export const clearSolanaClientCache = (): void => {
  clientsCache.clear();
};
