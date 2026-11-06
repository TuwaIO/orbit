import type { SolanaClusterMoniker } from '../types';
import { defaultRpcUrlsByMoniker } from './defaultRpcUrlsByMoniker';

const isValidUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

/**
 * The RPC URL of a URL or a cluster moniker.
 *
 * @param rpcUrlOrMoniker - Either a full RPC URL or a cluster moniker like 'mainnet'.
 * @param rpcUrls - Optional custom mapping of cluster monikers to RPC endpoints.
 * @returns The URL as given, or the endpoint of the moniker: from `rpcUrls`, otherwise the public one of the cluster.
 * @throws When the value is neither a URL nor a known moniker.
 * @internal
 */
export const resolveSolanaRpcUrl = (
  rpcUrlOrMoniker: string,
  rpcUrls?: Partial<Record<SolanaClusterMoniker, string>>,
): string => {
  const rpcUrl = isValidUrl(rpcUrlOrMoniker)
    ? rpcUrlOrMoniker
    : (rpcUrls?.[rpcUrlOrMoniker as SolanaClusterMoniker] ??
      defaultRpcUrlsByMoniker[rpcUrlOrMoniker as SolanaClusterMoniker]);

  if (!rpcUrl) {
    throw new Error(
      `Unable to resolve RPC URL for input: "${rpcUrlOrMoniker}". Ensure it's a valid URL or known moniker.`,
    );
  }
  return rpcUrl;
};
