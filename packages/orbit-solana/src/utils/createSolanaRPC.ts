// --- RPC Client Caching ---

import type { Rpc, SolanaRpcApi } from '@solana/kit';

import type { SolanaClusterMoniker, SolanaRpcUrl } from '../types';
import { createClientCache } from './clientCache';
import { createRpcOver } from './createRpcOver';

/**
 * An in-memory cache for RPC clients to avoid redundant instance creation.
 * @internal
 */
const rpcCache = createClientCache(createRpcOver);

/**
 * Retrieves a cached RPC client for a given URL or cluster moniker.
 * If no cached client exists, it creates a new instance. Clients are cached by their URLs; a cluster without URLs in `rpcUrls` gets the
 * client it already has, otherwise one over its public endpoint. A cluster with several URLs reads the next one when one fails or
 * answers with an HTTP error, and leaves it alone for a minute.
 *
 * @param params - Object containing rpcUrlOrMoniker and optional rpcUrls map.
 * @param params.rpcUrlOrMoniker - Either a full RPC URL or a cluster moniker like 'mainnet'.
 * @param params.rpcUrls - Optional custom mapping of cluster monikers to RPC endpoints, one or several a cluster.
 * @returns The RPC client instance.
 * @throws When the value is neither a URL nor a known moniker.
 */
export const createSolanaRPC = ({
  rpcUrlOrMoniker,
  rpcUrls,
}: {
  rpcUrlOrMoniker: string;
  rpcUrls?: Partial<Record<SolanaClusterMoniker, SolanaRpcUrl>>;
}): Rpc<SolanaRpcApi> => rpcCache.get(rpcUrlOrMoniker, rpcUrls);

/**
 * Clears the Solana RPC client cache.
 * @internal
 */
export const clearSolanaRpcCache = (): void => {
  rpcCache.clear();
};
