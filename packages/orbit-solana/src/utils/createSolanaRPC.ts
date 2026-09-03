// --- RPC Client Caching ---

import { createSolanaRpc, type Rpc, type SolanaRpcApi } from '@solana/kit';

import type { SolanaClusterMoniker } from '../types';
import { defaultRpcUrlsByMoniker } from './defaultRpcUrlsByMoniker';

/**
 * Validates whether a string is a properly formatted URL.
 * @param str - The string to validate.
 * @returns True if the string is a valid URL, otherwise false.
 */
function isValidUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

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
  // Determine the RPC URL: validate if it's a full URL or fall back to default list.
  const rpcUrl = isValidUrl(rpcUrlOrMoniker)
    ? rpcUrlOrMoniker
    : rpcUrls
      ? (rpcUrls[rpcUrlOrMoniker as SolanaClusterMoniker] ??
        defaultRpcUrlsByMoniker[rpcUrlOrMoniker as SolanaClusterMoniker])
      : defaultRpcUrlsByMoniker[rpcUrlOrMoniker as SolanaClusterMoniker];

  // If no valid RPC URL could be resolved, throw descriptive error.
  if (!rpcUrl) {
    throw new Error(
      `Unable to resolve RPC URL for input: "${rpcUrlOrMoniker}". Ensure it's a valid URL or known moniker.`,
    );
  }

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
