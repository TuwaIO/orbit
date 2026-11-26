import type {
  DevnetUrl,
  MainnetUrl,
  Rpc,
  RpcSubscriptions,
  SolanaRpcApi,
  SolanaRpcSubscriptionsApi,
  TestnetUrl,
} from '@solana/kit';

/**
 * Solana cluster moniker type inferred directly from @solana/kit branded cluster URLs plus localnet.
 */
export type SolanaClusterMoniker = (MainnetUrl | DevnetUrl | TestnetUrl)['~cluster'] | 'localnet';

/**
 * The RPC URL of a cluster, or several, the preferred one first: a read goes to the next when one does not answer.
 */
export type SolanaRpcUrl = string | readonly string[];

/**
 * Configuration mapping Solana clusters to their RPC URLs.
 */
export type SolanaRPCUrls = {
  rpcUrls: Partial<Record<SolanaClusterMoniker, SolanaRpcUrl>>;
};

/**
 * Alias for Solana RPC methods interface.
 */
export type SolanaRpcMethods = SolanaRpcApi;

/**
 * Lightweight Solana client wrapper holding RPC and optional subscriptions clients.
 */
export interface SolanaClient {
  rpc: Rpc<SolanaRpcApi>;
  rpcSubscriptions?: RpcSubscriptions<SolanaRpcSubscriptionsApi>;
}
