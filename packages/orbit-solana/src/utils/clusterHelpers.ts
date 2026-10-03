import { getSolanaCluster } from '@tuwaio/orbit-core';

import type { SolanaClusterMoniker, SolanaRPCUrls } from '../types';
import { defaultRpcUrlsByMoniker } from './defaultRpcUrlsByMoniker';

/**
 * Safely extracts the cluster moniker from a chain identifier.
 * Handles CAIP-2 chain IDs with the genesis hash (`'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1'`), Wallet Standard chains
 * (`'solana:devnet'`) and simple monikers (`'devnet'`), through `getSolanaCluster` from `@tuwaio/orbit-core`.
 * `mainnet-beta` becomes `mainnet`, the key of `rpcUrls`.
 *
 * @param params - Cluster sources.
 * @param params.cluster - Chain identifier or cluster moniker. Takes precedence when provided.
 * @param params.walletCluster - Cluster of the connected wallet, used when `cluster` is omitted.
 * @returns The extracted cluster moniker (the part after `solana:` for an unknown cluster), falling back to
 * `walletCluster` and then to `'mainnet'`.
 */
export const getCluster = ({ cluster, walletCluster }: { cluster?: string; walletCluster?: string }) => {
  const defaultCluster: SolanaClusterMoniker = 'mainnet';
  if (!cluster) {
    return walletCluster ?? defaultCluster;
  }
  return (getSolanaCluster(cluster) ??
    (cluster.includes(':') ? cluster.split(':')[1] : cluster)) as SolanaClusterMoniker;
};

/**
 * Retrieves the configured RPC URL for a given cluster moniker.
 *
 * @param params - Cluster selection and the configured RPC URLs.
 * @param params.cluster - The target cluster, used when `walletCluster` is not provided.
 * @param params.walletCluster - The cluster of the connected wallet. Takes precedence over `cluster`.
 * @param params.rpcUrls - Mapping of cluster monikers to RPC URLs.
 * @returns The configured RPC URL. When the cluster has no URL configured, the public endpoint of the same cluster
 * (`https://api.mainnet-beta.solana.com`, `https://api.devnet.solana.com` or `https://api.testnet.solana.com`); for
 * `localnet`, which has no public endpoint, `https://api.mainnet-beta.solana.com/`.
 */
export const getRpcUrlForCluster = ({
  cluster,
  walletCluster,
  rpcUrls,
}: { cluster: SolanaClusterMoniker; walletCluster?: SolanaClusterMoniker } & SolanaRPCUrls) => {
  const targetCluster = walletCluster ?? cluster;
  return rpcUrls[targetCluster] ?? defaultRpcUrlsByMoniker[targetCluster] ?? 'https://api.mainnet-beta.solana.com/';
};
