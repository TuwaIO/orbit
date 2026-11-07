/**
 * RPC Client Caching Module
 *
 * This module provides a caching mechanism for Solana RPC clients to optimize
 * performance and resource usage by reusing existing client instances.
 *
 * @module RpcClientCache
 */

import { createSolanaRpc, createSolanaRpcSubscriptions } from '@solana/kit';

import type { SolanaClient, SolanaClusterMoniker } from '../types';
import { resolveSolanaRpcUrl } from './resolveSolanaRpcUrl';

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
 * Maps Solana URLs or monikers to their corresponding client instances
 *
 * @internal
 */
const clientsCache = new Map<string, SolanaClient>();

/**
 * Creates or retrieves a cached Solana RPC client instance
 *
 * This function implements a caching mechanism for Solana RPC clients to:
 * - Avoid redundant client instance creation
 * - Optimize memory usage
 * - Maintain consistent client instances throughout the application
 *
 * @param params - Object containing rpcUrlOrMoniker and optional rpcUrls
 * @param params.rpcUrlOrMoniker - RPC endpoint URL or cluster moniker (e.g., 'mainnet', 'devnet')
 * @param params.rpcUrls - Optional custom mapping of cluster monikers to RPC endpoints
 * @returns Cached or newly created Solana RPC client instance
 * @throws Error if unable to resolve a valid RPC URL
 */
export const createSolanaClientWithCache = ({
  rpcUrlOrMoniker,
  rpcUrls,
}: {
  rpcUrlOrMoniker: string;
  rpcUrls?: Partial<Record<SolanaClusterMoniker, string>>;
}): SolanaClient => {
  // Return existing client instance if available in cache
  if (clientsCache.has(rpcUrlOrMoniker)) {
    return clientsCache.get(rpcUrlOrMoniker)!;
  }

  const rpcUrl = resolveSolanaRpcUrl(rpcUrlOrMoniker, rpcUrls);

  // Create new client instance with resolved URL
  const rpc = createSolanaRpc(rpcUrl);
  let rpcSubscriptions;
  try {
    rpcSubscriptions = createSolanaRpcSubscriptions(toWebSocketUrl(rpcUrl));
  } catch {
    // If WebSocket transport cannot be initialized, omit rpcSubscriptions
  }

  const newClient: SolanaClient = {
    rpc,
    ...(rpcSubscriptions ? { rpcSubscriptions } : {}),
  };

  // Cache and return the new instance
  clientsCache.set(rpcUrlOrMoniker, newClient);
  return newClient;
};

/**
 * Clears the Solana client cache.
 * @internal
 */
export const clearSolanaClientCache = (): void => {
  clientsCache.clear();
};
