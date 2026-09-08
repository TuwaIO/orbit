/**
 * @file Utilities for Pimlico and ERC-4337 Bundler client instantiation with local in-memory caching.
 */

import { type Config, getWalletClient } from '@wagmi/core';
import {
  type Chain,
  type Client,
  createPublicClient,
  type Hex,
  http,
  type HttpTransport,
  pad,
  type PublicClient,
  type WalletClient,
} from 'viem';
import {
  type BundlerClient,
  type BundlerClientConfig,
  createBundlerClient,
  createPaymasterClient,
  type PaymasterClient,
  toSoladySmartAccount,
  type ToSoladySmartAccountReturnType,
} from 'viem/account-abstraction';
import { toAccount } from 'viem/accounts';

/**
 * Exported alias for Solady Smart Account type.
 */
export type SoladySmartAccount = ToSoladySmartAccountReturnType;

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
export type BundlerRpcClientConfig = PimlicoUrlConfig &
  Partial<Omit<BundlerClientConfig<HttpTransport>, 'transport' | 'client'>> & {
    /** Optional execution client or public client used for fee estimation. */
    client?: Client | PublicClient;
  };

/**
 * Parameters for creating a Solady ERC-4337 Smart Account.
 */
export interface CreateSoladySmartAccountParams {
  /** The client used to interact with the blockchain. */
  client: Parameters<typeof toSoladySmartAccount>[0]['client'];
  /** The connected WalletClient (e.g. from Wagmi or browser provider) representing the EOA owner. */
  walletClient: WalletClient;
  /**
   * Optional 32-byte salt for deterministic counterfactual deployment.
   * Defaults to right-padded EOA address to satisfy Solady factory owner-prefix verification.
   */
  salt?: Hex;
}

/**
 * Configuration options for instantiating a Pimlico-powered ERC-4337 Smart Account client.
 */
export interface PimlicoSmartAccountClientConfig {
  /** Target EVM chain. */
  chain: Chain;
  /** The connected WalletClient representing the EOA signer. */
  walletClient?: WalletClient;
  /** Wagmi Config used to resolve the walletClient if not explicitly provided. */
  wagmiConfig?: Config;
  /** Optional public client for reading chain state. If omitted, one is created automatically. */
  client?: PublicClient | Client;
  /** Optional Pimlico API key. */
  apiKey?: string;
  /** Optional explicit custom bundler RPC URL. */
  bundlerUrl?: string;
  /** Optional RPC URL for public client execution transport (e.g., Alchemy / Infura). */
  rpcUrl?: string;
  /**
   * Whether to configure and attach Pimlico paymaster for gas sponsorship.
   * Defaults to true if apiKey or bundlerUrl is provided.
   */
  sponsor?: boolean;
  /** Optional 32-byte salt for Solady smart account. */
  salt?: Hex;
}

/**
 * Result object returned by `createPimlicoSmartAccountClient`.
 */
export interface PimlicoSmartAccountClientResult {
  /** The instantiated Solady smart account instance. */
  account: SoladySmartAccount;
  /** The configured Viem Bundler client. */
  bundlerClient: BundlerClient<HttpTransport>;
  /** The public client used for chain state reads and fee estimation. */
  publicClient: PublicClient;
  /** The Pimlico paymaster client if gas sponsorship is enabled. */
  paymasterClient?: PaymasterClient;
}

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
 * Computes a unique cache key for a BundlerRpcClientConfig.
 */
function getBundlerCacheKey(config: BundlerRpcClientConfig): string {
  const rpcUrl = createPimlicoRpcUrl(config);
  const hasPaymaster = Boolean(config.paymaster);
  const hasClient = Boolean(config.client);
  return `${rpcUrl}:pm=${hasPaymaster}:client=${hasClient}`;
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
  const cacheKey = getBundlerCacheKey(config);
  const cachedClient = bundlerClientCache.get(cacheKey);
  if (cachedClient) {
    return cachedClient;
  }

  const rpcUrl = createPimlicoRpcUrl(config);
  const bundlerOptions = { ...config };
  delete bundlerOptions.bundlerUrl;
  delete bundlerOptions.apiKey;

  const client = createBundlerClient({
    ...bundlerOptions,
    transport: http(rpcUrl),
  });

  bundlerClientCache.set(cacheKey, client);
  return client;
}

/**
 * Creates a Viem Paymaster Client configured with the resolved Pimlico RPC endpoint.
 *
 * @param config - Pimlico URL configuration.
 * @returns PaymasterClient instance configured for Pimlico gas sponsorship.
 */
export function createPimlicoPaymasterClient(config: PimlicoUrlConfig): PaymasterClient {
  const rpcUrl = createPimlicoRpcUrl(config);
  return createPaymasterClient({
    transport: http(rpcUrl),
  });
}

/**
 * Instantiates a Solady ERC-4337 smart account with automatic wallet signing delegation
 * and Solady factory-compliant deterministic salt.
 *
 * @param params - Configuration parameters including client and walletClient.
 * @returns Promise resolving to the initialized SoladySmartAccount.
 */
export async function createSoladySmartAccount({
  client,
  walletClient,
  salt,
}: CreateSoladySmartAccountParams): Promise<SoladySmartAccount> {
  if (!walletClient.account) {
    throw new Error('WalletClient must have an active account.');
  }

  const ownerAccount = walletClient.account;

  const owner = toAccount({
    address: ownerAccount.address,
    async signMessage({ message }) {
      return walletClient.signMessage({
        account: ownerAccount,
        message,
      });
    },
    async signTransaction(tx) {
      return walletClient.signTransaction({
        account: ownerAccount,
        ...tx,
      } as Parameters<typeof walletClient.signTransaction>[0]);
    },
    async signTypedData(typedData) {
      return walletClient.signTypedData({
        account: ownerAccount,
        ...typedData,
      } as Parameters<typeof walletClient.signTypedData>[0]);
    },
  });

  const accountSalt = salt ?? pad(ownerAccount.address, { dir: 'right', size: 32 });

  return toSoladySmartAccount({
    client,
    owner,
    salt: accountSalt,
  });
}

/**
 * High-level orchestration utility that instantiates a Solady smart account,
 * configures a Pimlico paymaster (sponsorship), and binds them to a Pimlico Bundler client.
 *
 * @param config - Configuration options including chain, wallet/wagmi, and Pimlico credentials.
 * @returns Promise resolving to { account, bundlerClient, publicClient, paymasterClient }.
 */
export async function createPimlicoSmartAccountClient(
  config: PimlicoSmartAccountClientConfig,
): Promise<PimlicoSmartAccountClientResult> {
  const { chain, apiKey, bundlerUrl, rpcUrl, salt, sponsor = Boolean(apiKey || bundlerUrl) } = config;

  let resolvedWalletClient = config.walletClient;
  if (!resolvedWalletClient && config.wagmiConfig) {
    resolvedWalletClient = (await getWalletClient(config.wagmiConfig, {
      chainId: chain.id,
    })) as WalletClient | undefined;
  }

  if (!resolvedWalletClient || !resolvedWalletClient.account) {
    throw new Error('Active wallet connection with account is required (provide walletClient or wagmiConfig).');
  }

  const publicClient =
    (config.client as PublicClient | undefined) ??
    createPublicClient({
      chain,
      transport: rpcUrl ? http(rpcUrl) : http(),
    });

  const account = await createSoladySmartAccount({
    client: publicClient,
    walletClient: resolvedWalletClient,
    salt,
  });

  const paymasterClient =
    sponsor && (apiKey || bundlerUrl)
      ? createPimlicoPaymasterClient({
          chainId: chain.id,
          apiKey,
          bundlerUrl,
        })
      : undefined;

  const bundlerClient = createBundlerRpcClient({
    chainId: chain.id,
    apiKey,
    bundlerUrl,
    client: publicClient,
    ...(paymasterClient ? { paymaster: paymasterClient } : {}),
  });

  return {
    account,
    bundlerClient,
    publicClient,
    paymasterClient,
  };
}

/**
 * Clears the in-memory cache of Pimlico URLs and Bundler clients.
 * Useful for testing and resetting runtime state.
 */
export function clearBundlerCache(): void {
  pimlicoUrlCache.clear();
  bundlerClientCache.clear();
}
