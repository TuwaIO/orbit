const CONNECTOR_MAPPINGS = new Map([
  ['Impersonated Connector', 'impersonatedwallet'],
  ['Safe', 'safe'],
  ['Trust', 'trust'],
  ['Trust Wallet', 'trust'],
  ['Brave Кошелек', 'brave'],
  ['Brave Wallet', 'brave'],
  ['Base Account', 'coinbase'],
]);

export const formatConnectorName = (connectorName: string): string => {
  return CONNECTOR_MAPPINGS.get(connectorName) ?? connectorName.replace(/\s+/g, '').toLowerCase();
};
