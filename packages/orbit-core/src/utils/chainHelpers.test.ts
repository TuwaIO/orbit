import { describe, expect, it } from 'vitest';

import { OrbitAdapter } from '../types';
import { isSolanaChain, setChainId } from './chainHelpers';
import { getNetworkData } from './getNetworkData';

const MAINNET = 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp';
const DEVNET = 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1';
const TESTNET = 'solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z';

describe('chainHelpers', () => {
  describe('isSolanaChain', () => {
    it('returns true for recognized Solana chain monikers', () => {
      expect(isSolanaChain('mainnet')).toBe(true);
      expect(isSolanaChain('mainnet-beta')).toBe(true);
      expect(isSolanaChain('devnet')).toBe(true);
      expect(isSolanaChain('testnet')).toBe(true);
      expect(isSolanaChain('localnet')).toBe(true);
    });

    it('returns true for prefixed monikers and genesis-hash chain IDs', () => {
      expect(isSolanaChain('solana:devnet')).toBe(true);
      expect(isSolanaChain(DEVNET)).toBe(true);
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
    it('turns every form of a Solana chain into its genesis-hash chain ID', () => {
      expect(setChainId('mainnet')).toBe(MAINNET);
      expect(setChainId('mainnet-beta')).toBe(MAINNET);
      expect(setChainId('devnet')).toBe(DEVNET);
      expect(setChainId('solana:devnet')).toBe(DEVNET);
      expect(setChainId('testnet')).toBe(TESTNET);
      expect(setChainId(DEVNET)).toBe(DEVNET);
    });

    it('returns original chainId for EVM and other non-Solana chains', () => {
      expect(setChainId(1)).toBe(1);
      expect(setChainId(11155111)).toBe(11155111);
      expect(setChainId('polygon')).toBe('polygon');
    });
  });

  describe('getNetworkData', () => {
    it('describes Solana with the mainnet genesis-hash chain ID', () => {
      expect(getNetworkData(OrbitAdapter.SOLANA)?.chain.chainId).toBe(MAINNET);
      expect(getNetworkData(OrbitAdapter.EVM)?.chain.chainId).toBe(1);
    });
  });
});
