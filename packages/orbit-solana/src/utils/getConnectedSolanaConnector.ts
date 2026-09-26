import { lastConnectedConnectorHelpers } from '@tuwaio/orbit-core';

import { getAvailableSolanaConnectors } from './getAvailableSolanaConnectors';

/**
 * Finds the Wallet Standard wallet that holds the last connected address.
 * The address is read from `lastConnectedConnectorHelpers` in `@tuwaio/orbit-core` (localStorage) and matched
 * case-insensitively against the accounts of {@link getAvailableSolanaConnectors}.
 *
 * @returns The connected wallet as a `UiWallet`.
 * @throws {Error} "Connector not provided. Cannot perform chain check." if no available wallet holds that address.
 */
export function getConnectedSolanaConnector() {
  const lastConnectedConnector = lastConnectedConnectorHelpers.getLastConnectedConnector();
  const connectors = getAvailableSolanaConnectors();
  const connectedConnector = connectors.find((w) =>
    w.accounts.find((a) => a.address.toLowerCase() === lastConnectedConnector?.address?.toLowerCase()),
  );
  if (!connectedConnector) {
    throw new Error('Connector not provided. Cannot perform chain check.');
  }
  return connectedConnector;
}
