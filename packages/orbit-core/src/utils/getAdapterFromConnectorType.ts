import { ConnectorType, OrbitAdapter } from '../types';

/**
 * Extracts the adapter type from a connector type string
 *
 * @example
 * ```typescript
 * // Returns OrbitAdapter.EVM
 * getAdapterFromConnectorType('evm:metamask');
 *
 * // Returns OrbitAdapter.SOLANA
 * getAdapterFromConnectorType('solana:phantom');
 *
 * // Returns OrbitAdapter.EVM (default)
 * getAdapterFromConnectorType('unknown');
 * ```
 *
 * @param connectorType - Connector type in format "orbit-adapter:connector" (e.g. "evm:metamask", "solana:phantom")
 * @returns The corresponding {@link OrbitAdapter} type or EVM as default
 *
 * @remarks
 * The function splits the connector type string by ":" and takes the first part as the adapter type.
 * If the split fails or the first part is empty, it defaults to EVM adapter.
 */
export function getAdapterFromConnectorType(connectorType: ConnectorType): OrbitAdapter {
  return (connectorType?.split(':')[0] as OrbitAdapter.EVM) ?? OrbitAdapter.EVM;
}
