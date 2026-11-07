import { ConnectorType, OrbitAdapter } from '../types';
import { formatConnectorName } from './formatConnectorName';

/**
 * Generates a standardized connector type identifier from adapter type and connector name
 *
 * @example
 * ```typescript
 * // Returns "evm:metamask"
 * getConnectorTypeFromName(OrbitAdapter.EVM, "MetaMask");
 *
 * // Returns "solana:phantom"
 * getConnectorTypeFromName(OrbitAdapter.SOLANA, "Phantom");
 *
 * // Returns "evm:coinbasewallet" (removes spaces)
 * getConnectorTypeFromName(OrbitAdapter.EVM, "Coinbase Wallet");
 *
 * // Returns "evm:coinbase" (a known name, by formatConnectorName)
 * getConnectorTypeFromName(OrbitAdapter.EVM, "Base Account");
 * ```
 *
 * @param adapter - The blockchain adapter type (e.g. EVM, SOLANA)
 * @param name - The connector name (e.g. "MetaMask", "Phantom"), as the wallet reports it or as {@link formatConnectorName} gave it
 * @returns A formatted connector type string in format "orbit-adapter:connector"
 *
 * @remarks
 * The function goes through {@link formatConnectorName}: known names are mapped, any other has its whitespace removed
 * and is lowercased. So one wallet has one type wherever it is read, on its connection and on its transactions, and a
 * value that already went through the mapping stays as it is.
 */
export function getConnectorTypeFromName(adapter: OrbitAdapter, name: string): ConnectorType {
  return `${adapter}:${formatConnectorName(name)}`;
}
