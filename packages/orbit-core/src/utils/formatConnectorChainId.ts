import { OrbitAdapter } from '../types';
import { getSolanaChainId } from './solanaChainIds';

/**
 * Formats a chain ID for use in connector identifiers.
 * Solana clusters become CAIP-2 chain IDs with the genesis hash (see {@link getSolanaChainId}); other string chain
 * IDs are prefixed with the adapter key unless they already have it; numeric EVM chain IDs are kept as is.
 *
 * @example
 * ```typescript
 * formatConnectorChainId('devnet', OrbitAdapter.SOLANA); // "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1"
 * formatConnectorChainId(1, OrbitAdapter.EVM); // 1
 * ```
 *
 * @param chainId - Numeric EVM chain ID or string chain identifier.
 * @param connectedAdapter - Adapter of the connected wallet.
 * @returns The CAIP-2 chain ID for known Solana clusters, `"<adapter>:<chainId>"` for other string chain IDs, otherwise
 * the numeric chain ID unchanged.
 */
export function formatConnectorChainId(chainId: string | number, connectedAdapter: OrbitAdapter) {
  if (typeof chainId !== 'string') return chainId;
  if (connectedAdapter === OrbitAdapter.SOLANA) {
    const solanaChainId = getSolanaChainId(chainId);
    if (solanaChainId) return solanaChainId;
  }
  return chainId.startsWith(`${connectedAdapter}:`) ? chainId : `${connectedAdapter}:${chainId}`;
}
