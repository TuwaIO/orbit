import { lastConnectedConnectorHelpers } from '@tuwaio/orbit-core';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { getAvailableSolanaConnectors } from './getAvailableSolanaConnectors';
import { getConnectedSolanaConnector } from './getConnectedSolanaConnector';

vi.mock('./getAvailableSolanaConnectors', () => ({ getAvailableSolanaConnectors: vi.fn() }));

const ADDRESS = '4aye4uNAafCDn4L7EBGXhwjDTxEHMMFYcGD169e4Udv8';

const connectedTo = (saved: string) => {
  vi.spyOn(lastConnectedConnectorHelpers, 'getLastConnectedConnector').mockReturnValue({
    connectorType: 'solana:phantom',
    chainId: 'devnet',
    address: saved,
  });
  const wallet = { name: 'Phantom', accounts: [{ address: ADDRESS }] };
  vi.mocked(getAvailableSolanaConnectors).mockReturnValue([wallet] as never);
  return wallet;
};

describe('getConnectedSolanaConnector', () => {
  afterEach(() => vi.restoreAllMocks());

  it('finds the wallet that holds the saved address', () => {
    const wallet = connectedTo(ADDRESS);
    expect(getConnectedSolanaConnector()).toBe(wallet);
  });

  // A base58 address in another case is another account, and this picks the wallet that signs
  it('does not take an address in another case for the same account', () => {
    connectedTo(ADDRESS.toLowerCase());
    expect(() => getConnectedSolanaConnector()).toThrow('Connector not provided');
  });
});
