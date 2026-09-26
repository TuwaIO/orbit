import type { SolanaClusterMoniker, SolanaRPCUrls } from '../types';

/**
 * Safely extracts the cluster moniker from a chain identifier.
 * Handles both full chain IDs ('solana:mainnet-beta') and simple monikers ('mainnet-beta').
 *
 * @param params - Cluster sources.
 * @param params.cluster - Chain identifier or cluster moniker. Takes precedence when provided.
 * @param params.walletCluster - Cluster of the connected wallet, used when `cluster` is omitted.
 * @returns The extracted cluster moniker, falling back to `walletCluster` and then to `'mainnet'`.
 */
export const getCluster = ({ cluster, walletCluster }: { cluster?: string; walletCluster?: string }) => {
  const defaultCluster: SolanaClusterMoniker = 'mainnet';
  if (!cluster) {
    return walletCluster ?? defaultCluster;
  }
  return (cluster.includes(':') ? cluster.split(':')[1] : cluster) as SolanaClusterMoniker;
};

/**
 * Retrieves the configured RPC URL for a given cluster moniker.
 *
 * @param params - Cluster selection and the configured RPC URLs.
 * @param params.cluster - The target cluster, used when `walletCluster` is not provided.
 * @param params.walletCluster - The cluster of the connected wallet. Takes precedence over `cluster`.
 * @param params.rpcUrls - Mapping of cluster monikers to RPC URLs.
 * @returns The configured RPC URL, or the public mainnet-beta endpoint if the cluster has no URL configured.
 */
export const getRpcUrlForCluster = ({
  cluster,
  walletCluster,
  rpcUrls,
}: { cluster: SolanaClusterMoniker; walletCluster?: SolanaClusterMoniker } & SolanaRPCUrls) => {
  const targetCluster = walletCluster ?? cluster;
  return rpcUrls[targetCluster] ?? 'https://api.mainnet-beta.solana.com/';
};
