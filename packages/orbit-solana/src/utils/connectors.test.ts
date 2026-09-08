import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getAvailableSolanaConnectors } from './getAvailableSolanaConnectors';
import { getConnectedSolanaConnector } from './getConnectedSolanaConnector';

interface MockStandardWallet {
  name: string;
  chains: string[];
  features: readonly string[];
  accounts: { address: string }[];
}

const mockStandardWallets: MockStandardWallet[] = [];

vi.mock('@wallet-standard/app', () => ({
  getWallets: () => ({
    get: () => mockStandardWallets,
  }),
}));

vi.mock('@wallet-standard/ui-registry', () => ({
  getOrCreateUiWalletForStandardWallet: (w: unknown) => w,
}));

describe('Solana Connectors', () => {
  beforeEach(() => {
    mockStandardWallets.length = 0;
    vi.clearAllMocks();
  });

  describe('getAvailableSolanaConnectors', () => {
    it('filters out wallets that do not have all required features', () => {
      mockStandardWallets.push({
        name: 'Incomplete Wallet',
        chains: ['solana:mainnet'],
        features: ['standard:connect'],
        accounts: [],
      });

      const connectors = getAvailableSolanaConnectors();
      expect(connectors).toHaveLength(0);
    });

    it('returns wallets having all required Solana features and chains', () => {
      mockStandardWallets.push({
        name: 'Phantom Standard',
        chains: ['solana:mainnet'],
        features: [
          'standard:connect',
          'standard:disconnect',
          'standard:events',
          'solana:signAndSendTransaction',
          'solana:signTransaction',
          'solana:signMessage',
        ],
        accounts: [{ address: '11111111111111111111111111111111' }],
      });

      const connectors = getAvailableSolanaConnectors();
      expect(connectors).toHaveLength(1);
      expect(connectors[0].name).toBe('Phantom Standard');
    });
  });

  describe('getConnectedSolanaConnector', () => {
    it('throws error when no matching connected wallet is found', () => {
      expect(() => getConnectedSolanaConnector()).toThrow('Connector not provided. Cannot perform chain check.');
    });
  });
});
