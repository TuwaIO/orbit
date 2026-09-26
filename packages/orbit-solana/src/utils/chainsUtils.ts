import type { ChainIdentifierArray } from '@tuwaio/orbit-core';

import type { SolanaClusterMoniker } from '../types';
import { defaultRpcUrlsByMoniker } from './defaultRpcUrlsByMoniker';

// Use a local type definition to avoid direct imports
type SolanaRPCUrlsType = {
  rpcUrls: Partial<Record<string, string>>;
};

/**
 * Extracts Solana cluster from chain identifier
 */
function extractSolanaCluster(chainId: string): SolanaClusterMoniker | null {
  const parts = chainId.split(':');
  if (parts.length < 2) return null;

  let cluster = parts[1];
  // Map mainnet-beta to mainnet to match orbit-solana keys
  if (cluster === 'mainnet-beta') {
    cluster = 'mainnet';
  }

  const moniker = cluster as SolanaClusterMoniker;
  // Validate that it's a known cluster
  return moniker in defaultRpcUrlsByMoniker ? moniker : null;
}

/**
 * Builds available Solana RPC URLs from chain identifiers
 */
function buildSolanaRpcUrls(
  chains: ChainIdentifierArray,
  solanaRPCUrls?: SolanaRPCUrlsType['rpcUrls'],
): SolanaRPCUrlsType['rpcUrls'] {
  const availableRpcUrls: SolanaRPCUrlsType['rpcUrls'] = {};

  // If config is provided, we only consider clusters defined in it.
  // If not provided, we consider all default clusters.
  const allowedClusters = solanaRPCUrls ? Object.keys(solanaRPCUrls) : Object.keys(defaultRpcUrlsByMoniker);

  for (const chainId of chains) {
    if (typeof chainId !== 'string') continue;

    const cluster = extractSolanaCluster(chainId);
    if (!cluster) continue;

    // Check if this cluster is allowed by app config
    if (!allowedClusters.includes(cluster)) continue;

    // Get RPC URL with fallback to default
    const rpcUrl = solanaRPCUrls?.[cluster] ?? defaultRpcUrlsByMoniker[cluster];

    if (rpcUrl) {
      availableRpcUrls[cluster] = rpcUrl;
    }
  }

  return availableRpcUrls;
}

/**
 * Resolves the Solana clusters an app can use.
 *
 * @param solanaRPCUrls - Optional mapping of cluster monikers to RPC URLs. When provided, only these clusters are allowed.
 * @param chains - Optional chain identifiers (e.g. `'solana:devnet'`, `'solana:mainnet-beta'`); when provided, only
 * clusters present in this list (and allowed by `solanaRPCUrls`) are returned.
 * @returns Cluster monikers, e.g. `['mainnet', 'devnet']`. Defaults to every cluster with a default RPC URL.
 */
export function getSolanaClusters(
  solanaRPCUrls?: Partial<Record<SolanaClusterMoniker, string>>,
  chains?: ChainIdentifierArray,
): string[] {
  if (chains && chains.length > 0) {
    // For Solana, build RPC URLs and return cluster names
    const availableRpcUrls = buildSolanaRpcUrls(chains, solanaRPCUrls);
    return Object.keys(availableRpcUrls);
  }
  // Return configured clusters or defaults
  return Object.keys(solanaRPCUrls || defaultRpcUrlsByMoniker);
}

/**
 * Type guard to check if a chain list contains Solana cluster names.
 *
 * @param chains - Mixed list of chain identifiers.
 * @returns `true` if the list is non-empty and contains only strings.
 */
export function isSolanaChainList(chains: (string | number)[]): chains is string[] {
  return chains.length > 0 && chains.every((chain) => typeof chain === 'string');
}

/**
 * Gets the Solana clusters that have a default public RPC URL.
 *
 * @returns `['mainnet', 'devnet', 'testnet']`.
 */
export function getAvailableSolanaClusters(): SolanaClusterMoniker[] {
  return Object.keys(defaultRpcUrlsByMoniker) as SolanaClusterMoniker[];
}

/**
 * Validates if a string is a Solana cluster moniker with a default RPC URL.
 *
 * @param cluster - Value to check.
 * @returns `true` for `'mainnet'`, `'devnet'` and `'testnet'`.
 */
export function isValidSolanaCluster(cluster: string): boolean {
  return cluster in defaultRpcUrlsByMoniker;
}
