import type { SolanaClusterMoniker, SolanaRpcUrl } from '../types';
import { resolveSolanaRpcUrls, rpcUrlList } from './resolveSolanaRpcUrl';

/**
 * Clients by their URLs, so a caller who reads a cluster over its own nodes never gets a client over another caller's. A cluster asked
 * for without URLs gets the client it already has, the first one made for it.
 *
 * @param create - Makes a client over these URLs.
 * @returns The cache: `get` takes a URL or a moniker with the optional URLs of the clusters, `clear` forgets every client.
 * @internal
 */
export function createClientCache<TClient>(create: (urls: readonly [string, ...string[]]) => TClient) {
  const clients = new Map<string, TClient>();
  return {
    get(rpcUrlOrMoniker: string, rpcUrls?: Partial<Record<SolanaClusterMoniker, SolanaRpcUrl>>): TClient {
      const key = rpcUrlList(rpcUrls?.[rpcUrlOrMoniker as SolanaClusterMoniker]).join(' ') || rpcUrlOrMoniker;
      const cached = clients.get(key);
      if (cached) return cached;

      const client = create(resolveSolanaRpcUrls(rpcUrlOrMoniker, rpcUrls));
      clients.set(key, client);
      if (!clients.has(rpcUrlOrMoniker)) clients.set(rpcUrlOrMoniker, client);
      return client;
    },
    clear(): void {
      clients.clear();
    },
  };
}
