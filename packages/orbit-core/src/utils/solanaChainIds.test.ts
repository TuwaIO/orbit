import { describe, expect, it } from 'vitest';

import { getSolanaChainId, getSolanaCluster, SOLANA_CHAIN_IDS } from './solanaChainIds';

const MAINNET = 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp';
const DEVNET = 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1';
const TESTNET = 'solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z';
// Testnet before its genesis reset, still listed by WalletConnect
const OLD_TESTNET = 'solana:4uhcVJyU9pJkvQyS88uRfhDSfZSm8DoR';

describe('solanaChainIds', () => {
  it('holds the genesis-hash chain IDs of the public clusters', () => {
    expect(SOLANA_CHAIN_IDS).toEqual({ mainnet: MAINNET, devnet: DEVNET, testnet: TESTNET });
  });

  describe('getSolanaChainId', () => {
    it('maps cluster monikers, with or without the solana: prefix, to the genesis-hash chain ID', () => {
      expect(getSolanaChainId('mainnet')).toBe(MAINNET);
      expect(getSolanaChainId('mainnet-beta')).toBe(MAINNET);
      expect(getSolanaChainId('solana:mainnet-beta')).toBe(MAINNET);
      expect(getSolanaChainId('devnet')).toBe(DEVNET);
      expect(getSolanaChainId('solana:devnet')).toBe(DEVNET);
      expect(getSolanaChainId('solana:testnet')).toBe(TESTNET);
    });

    it('keeps genesis-hash chain IDs and accepts their bare references', () => {
      expect(getSolanaChainId(DEVNET)).toBe(DEVNET);
      expect(getSolanaChainId('EtWTRABZaYq6iMfeYKouRu166VU2xqa1')).toBe(DEVNET);
    });

    it('maps the testnet ID from before the genesis reset to the current one', () => {
      expect(getSolanaChainId(OLD_TESTNET)).toBe(TESTNET);
    });

    it('returns solana:localnet for localnet, which has no fixed genesis hash', () => {
      expect(getSolanaChainId('localnet')).toBe('solana:localnet');
      expect(getSolanaChainId('solana:localnet')).toBe('solana:localnet');
    });

    it('returns undefined for EVM chains and unknown strings', () => {
      expect(getSolanaChainId(1)).toBeUndefined();
      expect(getSolanaChainId('ethereum')).toBeUndefined();
      expect(getSolanaChainId('eip155:1')).toBeUndefined();
      expect(getSolanaChainId('solana:unknown')).toBeUndefined();
      expect(getSolanaChainId('Devnet')).toBeUndefined();
      expect(getSolanaChainId('')).toBeUndefined();
    });
  });

  describe('getSolanaCluster', () => {
    it('returns the cluster moniker of every form of a Solana chain ID', () => {
      expect(getSolanaCluster(MAINNET)).toBe('mainnet');
      expect(getSolanaCluster('solana:mainnet-beta')).toBe('mainnet');
      expect(getSolanaCluster('mainnet-beta')).toBe('mainnet');
      expect(getSolanaCluster(DEVNET)).toBe('devnet');
      expect(getSolanaCluster('solana:devnet')).toBe('devnet');
      expect(getSolanaCluster('devnet')).toBe('devnet');
      expect(getSolanaCluster(TESTNET)).toBe('testnet');
      expect(getSolanaCluster(OLD_TESTNET)).toBe('testnet');
      expect(getSolanaCluster('solana:localnet')).toBe('localnet');
    });

    it('returns undefined for EVM chains and unknown strings', () => {
      expect(getSolanaCluster(1)).toBeUndefined();
      expect(getSolanaCluster('eip155:1')).toBeUndefined();
      expect(getSolanaCluster('solana:unknown')).toBeUndefined();
    });
  });
});
