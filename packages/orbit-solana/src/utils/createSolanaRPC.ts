// --- RPC Client Caching ---

import { createSolanaRpc, type Rpc, type SolanaRpcApi } from '@solana/kit';

import type { SolanaClusterMoniker } from '../types';
import { resolveSolanaRpcUrl } from './resolveSolanaRpcUrl';

/**
 * An in-memory cache for RPC clients to avoid redundant instance creation.
 * @internal
 */
const rpcCache = new Map<string, Rpc<SolanaRpcApi>>();

/**
 * Retrieves a cached RPC client for a given URL or cluster moniker.
 * If no cached client exists, it creates a new instance.
 *
 * @param params - Object containing rpcUrlOrMoniker and optional rpcUrls map.
 * @param params.rpcUrlOrMoniker - Either a full RPC URL or a cluster moniker like 'mainnet'.
 * @param params.rpcUrls - Optional custom mapping of cluster monikers to RPC endpoints.
 * @returns The RPC client instance.
 */
export const createSolanaRPC = ({
  rpcUrlOrMoniker,
  rpcUrls,
}: {
  rpcUrlOrMoniker: string;
  rpcUrls?: Partial<Record<SolanaClusterMoniker, string>>;
}): Rpc<SolanaRpcApi> => {
  // Check the cache first for an existing RPC instance.
  if (rpcCache.has(rpcUrlOrMoniker)) {
    return rpcCache.get(rpcUrlOrMoniker)!;
  }
  const rpcUrl = resolveSolanaRpcUrl(rpcUrlOrMoniker, rpcUrls);

  // Create a new RPC client instance.
  const newRpc = createSolanaRpc(rpcUrl);

  // Cache the new instance and return it.
  rpcCache.set(rpcUrlOrMoniker, newRpc);
  return newRpc;
};

/**
 * Clears the Solana RPC client cache.
 * @internal
 */
export const clearSolanaRpcCache = (): void => {
  rpcCache.clear();
};
