const CONNECTOR_MAPPINGS = new Map([
  ['Impersonated Connector', 'impersonatedwallet'],
  ['Safe', 'safewallet'],
  ['Trust', 'trustwallet'],
  ['Trust Wallet', 'trustwallet'],
  ['Brave Кошелек', 'bravewallet'],
  ['Brave Wallet', 'bravewallet'],
  ['Base Account', 'coinbasewallet'], // TODO: need fix
]);

export const formatConnectorName = (connectorName: string): string => {
  return CONNECTOR_MAPPINGS.get(connectorName) ?? connectorName.replace(/\s+/g, '').toLowerCase();
};
