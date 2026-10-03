import { getSolanaChainId, getSolanaCluster } from './solanaChainIds';

/**
 * Checks whether the given chain ID belongs to a Solana network: a cluster moniker (`mainnet`, `mainnet-beta`,
 * `devnet`, `testnet`, `localnet`), a Wallet Standard chain such as `solana:devnet`, or a CAIP-2 chain ID with the
 * genesis hash. See {@link getSolanaCluster}.
 *
 * @param chainId - The chain ID or chain name.
 * @returns `true` if the chain ID corresponds to a known Solana network, `false` otherwise.
 */
export function isSolanaChain(chainId: number | string): boolean {
  return getSolanaCluster(chainId) !== undefined;
}

/**
 * Turns a Solana chain, in any form accepted by {@link isSolanaChain}, into its CAIP-2 chain ID with the genesis hash
 * (see {@link getSolanaChainId}): `devnet` and `solana:devnet` become `solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1`. Other
 * chain IDs are returned unchanged.
 *
 * @param chainId - The original chain ID or name.
 * @returns The CAIP-2 chain ID for Solana networks, otherwise the original value.
 */
export function setChainId(chainId: number | string): string | number {
  return getSolanaChainId(chainId) ?? chainId;
}
