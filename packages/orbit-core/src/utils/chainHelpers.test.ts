import { describe, expect, it } from 'vitest';

import { isSolanaChain, setChainId } from './chainHelpers';

describe('chainHelpers', () => {
  describe('isSolanaChain', () => {
    it('returns true for recognized Solana chain monikers', () => {
      expect(isSolanaChain('mainnet')).toBe(true);
      expect(isSolanaChain('mainnet-beta')).toBe(true);
      expect(isSolanaChain('devnet')).toBe(true);
      expect(isSolanaChain('testnet')).toBe(true);
    });

    it('returns false for EVM chain IDs or unsupported strings', () => {
      expect(isSolanaChain(1)).toBe(false);
      expect(isSolanaChain(137)).toBe(false);
      expect(isSolanaChain('ethereum')).toBe(false);
      expect(isSolanaChain('polygon')).toBe(false);
      expect(isSolanaChain('')).toBe(false);
    });
  });

  describe('setChainId', () => {
    it('prefixes Solana chains with solana:', () => {
      expect(setChainId('mainnet')).toBe('solana:mainnet');
      expect(setChainId('devnet')).toBe('solana:devnet');
      expect(setChainId('testnet')).toBe('solana:testnet');
      expect(setChainId('mainnet-beta')).toBe('solana:mainnet-beta');
    });

    it('returns original chainId for EVM and other non-Solana chains', () => {
      expect(setChainId(1)).toBe(1);
      expect(setChainId(11155111)).toBe(11155111);
      expect(setChainId('polygon')).toBe('polygon');
    });
  });
});
