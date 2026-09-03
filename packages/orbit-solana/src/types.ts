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
 * Configuration mapping Solana clusters to their RPC URLs.
 */
export type SolanaRPCUrls = {
  rpcUrls: Partial<Record<SolanaClusterMoniker, string>>;
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
