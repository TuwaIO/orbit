import { lastConnectedConnectorHelpers } from '@tuwaio/orbit-core';

import { getAvailableSolanaConnectors } from './getAvailableSolanaConnectors';

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
