/** The connector ID of the impersonated wallet. It is saved in the last connection, so it can never change. */
export const IMPERSONATED_CONNECTOR_ID = 'impersonatedwallet';

/** The connector ID of Safe{Wallet}. It is saved in the last connection, so it can never change. */
export const SAFE_CONNECTOR_ID = 'safe';

const CONNECTOR_MAPPINGS = new Map([
  ['Impersonated Connector', IMPERSONATED_CONNECTOR_ID],
  ['Safe', SAFE_CONNECTOR_ID],
  ['Trust', 'trust'],
  ['Trust Wallet', 'trust'],
  ['Brave Кошелек', 'brave'],
  ['Brave Wallet', 'brave'],
  ['Base Account', 'coinbase'],
]);

/**
 * Normalizes a wallet connector display name into a stable identifier.
 * Known names are mapped explicitly (e.g. "Trust Wallet" → "trust", "Base Account" → "coinbase");
 * any other name has its whitespace removed and is lowercased.
 *
 * @example
 * ```typescript
 * formatConnectorName('Trust Wallet'); // "trust"
 * formatConnectorName('Rabby Wallet'); // "rabbywallet"
 * ```
 *
 * @param connectorName - Display name reported by the wallet connector.
 * @returns The normalized connector identifier.
 */
export const formatConnectorName = (connectorName: string): string => {
  return CONNECTOR_MAPPINGS.get(connectorName) ?? connectorName.replace(/\s+/g, '').toLowerCase();
};
