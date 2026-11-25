import type { SolanaClusterMoniker, SolanaRpcUrl } from '../types';
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
 * The RPC URLs of one entry of `rpcUrls`, in their order.
 *
 * @param rpcUrl - The URL, the URLs, or nothing.
 * @returns The URLs, none when there is none.
 * @internal
 */
export const rpcUrlList = (rpcUrl: SolanaRpcUrl | undefined): readonly string[] =>
  (typeof rpcUrl === 'string' ? [rpcUrl] : (rpcUrl ?? [])).filter(Boolean);

/**
 * The RPC URLs of a URL or a cluster moniker.
 *
 * @param rpcUrlOrMoniker - Either a full RPC URL or a cluster moniker like 'mainnet'.
 * @param rpcUrls - Optional custom mapping of cluster monikers to RPC endpoints, one or several a cluster.
 * @returns The URL as given, or the endpoints of the moniker: from `rpcUrls`, otherwise the public one of the cluster.
 * @throws When the value is neither a URL nor a known moniker.
 * @internal
 */
export const resolveSolanaRpcUrls = (
  rpcUrlOrMoniker: string,
  rpcUrls?: Partial<Record<SolanaClusterMoniker, SolanaRpcUrl>>,
): readonly [string, ...string[]] => {
  if (isValidUrl(rpcUrlOrMoniker)) return [rpcUrlOrMoniker];
  const moniker = rpcUrlOrMoniker as SolanaClusterMoniker;
  const own = rpcUrlList(rpcUrls?.[moniker]);
  const [first, ...rest] = own.length > 0 ? own : rpcUrlList(defaultRpcUrlsByMoniker[moniker]);

  if (!first) {
    throw new Error(
      `Unable to resolve RPC URL for input: "${rpcUrlOrMoniker}". Ensure it's a valid URL or known moniker.`,
    );
  }
  return [first, ...rest];
};

/**
 * The RPC URL of a URL or a cluster moniker: the first of {@link resolveSolanaRpcUrls}.
 *
 * @param rpcUrlOrMoniker - Either a full RPC URL or a cluster moniker like 'mainnet'.
 * @param rpcUrls - Optional custom mapping of cluster monikers to RPC endpoints, one or several a cluster.
 * @returns The URL.
 * @throws When the value is neither a URL nor a known moniker.
 * @internal
 */
export const resolveSolanaRpcUrl = (
  rpcUrlOrMoniker: string,
  rpcUrls?: Partial<Record<SolanaClusterMoniker, SolanaRpcUrl>>,
): string => resolveSolanaRpcUrls(rpcUrlOrMoniker, rpcUrls)[0];
