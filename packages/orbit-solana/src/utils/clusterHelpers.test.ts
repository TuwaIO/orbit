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

    it('reads CAIP-2 chain IDs with the genesis hash', () => {
      expect(getCluster({ cluster: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp' })).toBe('mainnet');
      expect(getCluster({ cluster: 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1' })).toBe('devnet');
      expect(getCluster({ cluster: 'solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z' })).toBe('testnet');
      expect(getCluster({ cluster: 'solana:4uhcVJyU9pJkvQyS88uRfhDSfZSm8DoR' })).toBe('testnet');
    });

    it('reports mainnet-beta as mainnet, the key of rpcUrls', () => {
      expect(getCluster({ cluster: 'solana:mainnet-beta' })).toBe('mainnet');
      expect(getCluster({ cluster: 'mainnet-beta' })).toBe('mainnet');
    });

    it('keeps the reference of an unknown cluster', () => {
      expect(getCluster({ cluster: 'solana:custom' })).toBe('custom');
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

    it('falls back to the public endpoint of the same cluster if not specified in rpcUrls', () => {
      expect(getRpcUrlForCluster({ cluster: 'devnet', rpcUrls: {} })).toBe('https://api.devnet.solana.com');
      expect(getRpcUrlForCluster({ cluster: 'testnet', rpcUrls: { devnet: 'https://custom-devnet.solana.com' } })).toBe(
        'https://api.testnet.solana.com',
      );
      expect(getRpcUrlForCluster({ cluster: 'mainnet', walletCluster: 'devnet', rpcUrls: {} })).toBe(
        'https://api.devnet.solana.com',
      );
    });

    it('falls back to default mainnet URL for localnet if not specified in rpcUrls', () => {
      const url = getRpcUrlForCluster({
        cluster: 'localnet',
        rpcUrls: {},
      });
      expect(url).toBe('https://api.mainnet-beta.solana.com/');
    });
  });
});
