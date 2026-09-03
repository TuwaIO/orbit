/**
 * @file Utilities for Pimlico and ERC-4337 Bundler client instantiation with local in-memory caching.
 */

import { http, type HttpTransport } from 'viem';
import { type BundlerClient, type BundlerClientConfig, createBundlerClient } from 'viem/account-abstraction';

/**
 * Configuration options for generating Pimlico Bundler RPC URLs.
 */
export interface PimlicoUrlConfig {
  /** Target EVM chain ID (e.g. 1 for Ethereum Mainnet, 11155111 for Sepolia). */
  chainId: number;
  /** Optional Pimlico API key. If omitted, falls back to public RPC or bundlerUrl. */
  apiKey?: string;
  /** Optional explicit custom bundler RPC URL that takes precedence. */
  bundlerUrl?: string;
}

/**
 * Optional additional configuration forwarded to Viem's createBundlerClient.
 */
export type BundlerRpcClientConfig = PimlicoUrlConfig & Partial<Omit<BundlerClientConfig<HttpTransport>, 'transport'>>;

/**
 * In-memory cache for resolved Pimlico RPC URLs.
 * @internal
 */
const pimlicoUrlCache = new Map<string, string>();

/**
 * In-memory cache for Bundler Client instances.
 * @internal
 */
const bundlerClientCache = new Map<string, BundlerClient<HttpTransport>>();

/**
 * Computes a unique cache key for a PimlicoUrlConfig.
 */
function getPimlicoCacheKey(config: PimlicoUrlConfig): string {
  if (config.bundlerUrl) {
    return `custom:${config.bundlerUrl.trim()}`;
  }
  return `${config.chainId}:${config.apiKey?.trim() ?? 'public'}`;
}

/**
 * Creates and caches a Pimlico RPC URL based on provided configuration.
 *
 * Priority order:
 * 1. Explicit `bundlerUrl` (if provided, returned directly).
 * 2. Dedicated Pimlico endpoint `https://api.pimlico.io/v2/${chainId}/rpc?apikey=${apiKey}` (if apiKey provided).
 * 3. Public community endpoint `https://public.pimlico.io/v2/${chainId}/rpc` (fallback).
 *
 * @param config - The Pimlico URL configuration.
 * @returns The resolved Bundler RPC URL string.
 */
export function createPimlicoRpcUrl(config: PimlicoUrlConfig): string {
  const cacheKey = getPimlicoCacheKey(config);
  const cachedUrl = pimlicoUrlCache.get(cacheKey);
  if (cachedUrl) {
    return cachedUrl;
  }

  let resolvedUrl: string;
  if (config.bundlerUrl) {
    resolvedUrl = config.bundlerUrl.trim();
  } else if (config.apiKey) {
    resolvedUrl = `https://api.pimlico.io/v2/${config.chainId}/rpc?apikey=${config.apiKey.trim()}`;
  } else {
    resolvedUrl = `https://public.pimlico.io/v2/${config.chainId}/rpc`;
  }

  pimlicoUrlCache.set(cacheKey, resolvedUrl);
  return resolvedUrl;
}

/**
 * Creates or retrieves a cached Viem Bundler Client configured for the resolved Pimlico endpoint.
 *
 * @param config - Bundler URL and optional client configuration parameters.
 * @returns Cached or newly instantiated BundlerClient.
 */
export function createBundlerRpcClient(config: BundlerRpcClientConfig): BundlerClient<HttpTransport> {
  const rpcUrl = createPimlicoRpcUrl(config);
  const cachedClient = bundlerClientCache.get(rpcUrl);
  if (cachedClient) {
    return cachedClient;
  }

  const bundlerOptions = { ...config };
  delete bundlerOptions.bundlerUrl;
  delete bundlerOptions.apiKey;

  const client = createBundlerClient({
    ...bundlerOptions,
    transport: http(rpcUrl),
  });

  bundlerClientCache.set(rpcUrl, client);
  return client;
}

/**
 * Clears the in-memory cache of Pimlico URLs and Bundler clients.
 * Useful for testing and resetting runtime state.
 */
export function clearBundlerCache(): void {
  pimlicoUrlCache.clear();
  bundlerClientCache.clear();
}
