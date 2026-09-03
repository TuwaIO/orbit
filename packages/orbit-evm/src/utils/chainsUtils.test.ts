import { mainnet, polygon, sepolia } from 'viem/chains';
import { describe, expect, it } from 'vitest';

import { getEvmChains, isEvmChainList } from './chainsUtils';

describe('chainsUtils', () => {
  describe('getEvmChains', () => {
    it('extracts chain IDs from chain list', () => {
      const ids = getEvmChains([mainnet, polygon, sepolia]);
      expect(ids).toEqual([1, 137, 11155111]);
    });

    it('returns empty array if no chains are provided', () => {
      expect(getEvmChains(undefined)).toEqual([]);
    });
  });

  describe('isEvmChainList', () => {
    it('returns true if all items in array are numbers', () => {
      expect(isEvmChainList([1, 137, 8453])).toBe(true);
    });

    it('returns false if array contains non-numbers or is empty', () => {
      expect(isEvmChainList([])).toBe(false);
      expect(isEvmChainList([1, 'solana:mainnet', 137])).toBe(false);
    });
  });
});
