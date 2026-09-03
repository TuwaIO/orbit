import { describe, expect, it } from 'vitest';

import { getAvailableSolanaClusters, getSolanaClusters, isSolanaChainList, isValidSolanaCluster } from './chainsUtils';

describe('chainsUtils', () => {
  describe('getAvailableSolanaClusters', () => {
    it('returns default available clusters', () => {
      const clusters = getAvailableSolanaClusters();
      expect(clusters).toContain('mainnet');
      expect(clusters).toContain('devnet');
      expect(clusters).toContain('testnet');
    });
  });

  describe('isValidSolanaCluster', () => {
    it('returns true for known clusters', () => {
      expect(isValidSolanaCluster('mainnet')).toBe(true);
      expect(isValidSolanaCluster('devnet')).toBe(true);
      expect(isValidSolanaCluster('testnet')).toBe(true);
    });

    it('returns false for unknown clusters', () => {
      expect(isValidSolanaCluster('ethereum')).toBe(false);
      expect(isValidSolanaCluster('')).toBe(false);
    });
  });

  describe('isSolanaChainList', () => {
    it('returns true for array of strings', () => {
      expect(isSolanaChainList(['solana:mainnet', 'solana:devnet'])).toBe(true);
    });

    it('returns false for empty array or array containing numbers', () => {
      expect(isSolanaChainList([])).toBe(false);
      expect(isSolanaChainList([1, 'solana:devnet'])).toBe(false);
    });
  });

  describe('getSolanaClusters', () => {
    it('extracts clusters from chain array and config', () => {
      const clusters = getSolanaClusters({ devnet: 'https://api.devnet.solana.com' }, ['solana:devnet']);
      expect(clusters).toEqual(['devnet']);
    });
  });
});
