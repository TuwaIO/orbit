/**
 * CAIP-2 chain IDs of the public Solana clusters. By CAIP-30, the reference is the first 32 characters of the base58
 * genesis hash of the cluster.
 *
 * Wallet Standard wallets name the same clusters `solana:mainnet`, `solana:devnet` and `solana:testnet`: pass those to
 * wallet calls, and these IDs everywhere a chain is identified (sessions, transactions, APIs).
 */
export const SOLANA_CHAIN_IDS = {
  mainnet: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
  devnet: 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
  testnet: 'solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z',
} as const;

/**
 * A Solana cluster moniker recognized by {@link getSolanaCluster}.
 */
export type SolanaCluster = keyof typeof SOLANA_CHAIN_IDS | 'localnet';

const SOLANA_PREFIX = 'solana:';

// Every accepted reference (the part after `solana:`) and its cluster
const CLUSTER_BY_REFERENCE: Readonly<Record<string, SolanaCluster>> = {
  mainnet: 'mainnet',
  'mainnet-beta': 'mainnet',
  devnet: 'devnet',
  testnet: 'testnet',
  localnet: 'localnet',
  '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp': 'mainnet',
  EtWTRABZaYq6iMfeYKouRu166VU2xqa1: 'devnet',
  '4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z': 'testnet',
  // Testnet before its genesis reset, still listed by WalletConnect and Reown
  '4uhcVJyU9pJkvQyS88uRfhDSfZSm8DoR': 'testnet',
};

/**
 * Returns the cluster of a Solana chain identifier, in any of its forms: a cluster moniker (`devnet`, `mainnet-beta`),
 * a Wallet Standard chain (`solana:devnet`), a CAIP-2 chain ID with the genesis hash
 * (`solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1`) or its bare reference. `mainnet-beta` is reported as `mainnet`; the
 * testnet ID from before the testnet genesis reset (`solana:4uhcVJyU9pJkvQyS88uRfhDSfZSm8DoR`) as `testnet`.
 *
 * @example
 * ```typescript
 * getSolanaCluster('solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1'); // "devnet"
 * getSolanaCluster('solana:mainnet-beta'); // "mainnet"
 * getSolanaCluster(1); // undefined
 * ```
 *
 * @param chainId - Chain identifier to read. Monikers are case-sensitive, as in the Wallet Standard.
 * @returns `mainnet`, `devnet`, `testnet` or `localnet`, or `undefined` when the value is not a known Solana chain
 * (numbers, other namespaces, custom clusters).
 */
export function getSolanaCluster(chainId: string | number): SolanaCluster | undefined {
  if (typeof chainId !== 'string') return undefined;
  const reference = chainId.startsWith(SOLANA_PREFIX) ? chainId.slice(SOLANA_PREFIX.length) : chainId;
  return Object.hasOwn(CLUSTER_BY_REFERENCE, reference) ? CLUSTER_BY_REFERENCE[reference] : undefined;
}

/**
 * Returns the CAIP-2 chain ID of a Solana chain identifier in any form accepted by {@link getSolanaCluster}: the
 * genesis-hash ID from {@link SOLANA_CHAIN_IDS} for the public clusters, and `solana:localnet` for `localnet`, which
 * has no fixed genesis hash.
 *
 * @example
 * ```typescript
 * getSolanaChainId('devnet'); // "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1"
 * getSolanaChainId('solana:mainnet-beta'); // "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp"
 * getSolanaChainId('eip155:1'); // undefined
 * ```
 *
 * @param chainId - Chain identifier to convert.
 * @returns The CAIP-2 chain ID, or `undefined` when the value is not a known Solana chain.
 */
export function getSolanaChainId(chainId: string | number): string | undefined {
  const cluster = getSolanaCluster(chainId);
  if (!cluster) return undefined;
  return cluster === 'localnet' ? `${SOLANA_PREFIX}localnet` : SOLANA_CHAIN_IDS[cluster];
}
