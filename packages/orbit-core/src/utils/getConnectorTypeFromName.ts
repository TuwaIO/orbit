import { OrbitAdapter } from '../types';

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
 * ```
 *
 * @param adapter - The blockchain adapter type (e.g. EVM, SOLANA)
 * @param name - The connector name (e.g. "MetaMask", "Phantom")
 * @returns A formatted connector type string in format "orbit-adapter:connector"
 *
 * @remarks
 * The function:
 * 1. Combines adapter type with connector name using ":" as separator
 * 2. Removes all whitespace from connector name
 * 3. Converts connector name to lowercase
 * This ensures consistent connector type identifiers across the application
 * and normalizes connector names for better UX/consistency.
 */
export function getConnectorTypeFromName(adapter: OrbitAdapter, name: string): string {
  return `${adapter}:${name.replace(/\s+/g, '').toLowerCase()}`;
}
