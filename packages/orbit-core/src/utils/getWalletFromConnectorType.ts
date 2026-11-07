/**
 * The wallet part of a connector type.
 *
 * @example
 * ```typescript
 * getWalletFromConnectorType('evm:metamask'); // "metamask"
 * getWalletFromConnectorType('metamask'); // undefined
 * ```
 *
 * @param connectorType - A connector type, in the format "orbit-adapter:connector".
 * @returns The part after the adapter, or `undefined` when there is no adapter or no value.
 */
export function getWalletFromConnectorType(connectorType: string | null | undefined): string | undefined {
  return connectorType?.split(':')[1];
}
