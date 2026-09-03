import { describe, expect, it } from 'vitest';

import { getCluster, getRpcUrlForCluster } from './clusterHelpers';

describe('clusterHelpers', () => {
  describe('getCluster', () => {
    it('extracts cluster moniker from solana: prefixed chain string', () => {
      expect(getCluster({ cluster: 'solana:devnet' })).toBe('devnet');
      expect(getCluster({ cluster: 'solana:testnet' })).toBe('testnet');
    });

    it('returns direct cluster moniker when no prefix', () => {
      expect(getCluster({ cluster: 'mainnet' })).toBe('mainnet');
    });

    it('falls back to walletCluster or mainnet default', () => {
      expect(getCluster({ walletCluster: 'devnet' })).toBe('devnet');
      expect(getCluster({})).toBe('mainnet');
    });
  });

  describe('getRpcUrlForCluster', () => {
    it('returns configured RPC URL for cluster', () => {
      const url = getRpcUrlForCluster({
        cluster: 'devnet',
        rpcUrls: {
          devnet: 'https://custom-devnet.solana.com',
        },
      });
      expect(url).toBe('https://custom-devnet.solana.com');
    });

    it('falls back to default mainnet URL if not specified in rpcUrls', () => {
      const url = getRpcUrlForCluster({
        cluster: 'localnet',
        rpcUrls: {},
      });
      expect(url).toBe('https://api.mainnet-beta.solana.com/');
    });
  });
});
