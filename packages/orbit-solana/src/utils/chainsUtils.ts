import type { ChainIdentifierArray } from '@tuwaio/orbit-core';
import type { SolanaClusterMoniker } from 'gill';

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
 * Get Solana clusters from configuration
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
 * Type guard to check if a chain list contains Solana cluster names
 */
export function isSolanaChainList(chains: (string | number)[]): chains is string[] {
  return chains.length > 0 && chains.every((chain) => typeof chain === 'string');
}

/**
 * Gets available Solana clusters from the default configuration
 */
export function getAvailableSolanaClusters(): SolanaClusterMoniker[] {
  return Object.keys(defaultRpcUrlsByMoniker) as SolanaClusterMoniker[];
}

/**
 * Validates if a string is a valid Solana cluster moniker
 */
export function isValidSolanaCluster(cluster: string): boolean {
  return cluster in defaultRpcUrlsByMoniker;
}
