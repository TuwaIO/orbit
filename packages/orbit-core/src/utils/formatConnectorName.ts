const CONNECTOR_MAPPINGS = new Map([['Impersonated Connector', 'impersonatedwallet']]);

export const formatConnectorName = (connectorName: string): string => {
  return CONNECTOR_MAPPINGS.get(connectorName) ?? connectorName.replace(/\s+/g, '').toLowerCase();
};
