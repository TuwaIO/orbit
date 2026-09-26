import { OrbitAdapter } from '../types';

/**
 * Formats a chain ID for use in connector identifiers.
 * String chain IDs (e.g. Solana cluster names) are prefixed with the adapter key; numeric EVM chain IDs are kept as is.
 *
 * @example
 * ```typescript
 * formatConnectorChainId('devnet', OrbitAdapter.SOLANA); // "solana:devnet"
 * formatConnectorChainId(1, OrbitAdapter.EVM); // 1
 * ```
 *
 * @param chainId - Numeric EVM chain ID or string chain identifier.
 * @param connectedAdapter - Adapter of the connected wallet.
 * @returns `"<adapter>:<chainId>"` for string chain IDs, otherwise the numeric chain ID unchanged.
 */
export function formatConnectorChainId(chainId: string | number, connectedAdapter: OrbitAdapter) {
  if (typeof chainId === 'string') {
    return `${connectedAdapter}:${chainId}`;
  } else {
    return chainId;
  }
}
