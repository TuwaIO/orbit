import { describe, expect, it } from 'vitest';

import {
  formatCaip10AccountId,
  formatCaip19AssetId,
  parseCaip2ChainId,
  parseCaip10AccountId,
  parseCaip19AssetId,
  toCaip2ChainId,
} from './caip';

const SOL_MAINNET = 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp';
const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

describe('caip', () => {
  describe('parseCaip2ChainId', () => {
    it('splits valid chain IDs', () => {
      expect(parseCaip2ChainId('eip155:8453')).toEqual({ namespace: 'eip155', reference: '8453' });
      expect(parseCaip2ChainId(SOL_MAINNET)).toEqual({
        namespace: 'solana',
        reference: '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
      });
    });

    it('rejects malformed chain IDs', () => {
      for (const bad of ['8453', 'eip155', ':1', 'EIP155:1', 'ab:1', 'eip155:', `eip155:${'1'.repeat(33)}`]) {
        expect(parseCaip2ChainId(bad)).toBeUndefined();
      }
    });
  });

  describe('toCaip2ChainId', () => {
    it('turns EVM chain numbers and digit strings into eip155 IDs', () => {
      expect(toCaip2ChainId(1)).toBe('eip155:1');
      expect(toCaip2ChainId('8453')).toBe('eip155:8453');
    });

    it('normalizes Solana monikers to the genesis-hash ID', () => {
      expect(toCaip2ChainId('mainnet-beta')).toBe(SOL_MAINNET);
      expect(toCaip2ChainId('solana:mainnet')).toBe(SOL_MAINNET);
    });

    it('keeps valid CAIP-2 IDs and rejects the rest', () => {
      expect(toCaip2ChainId('eip155:10')).toBe('eip155:10');
      expect(toCaip2ChainId(0)).toBeUndefined();
      expect(toCaip2ChainId(1.5)).toBeUndefined();
      expect(toCaip2ChainId('base')).toBeUndefined();
    });
  });

  describe('CAIP-10', () => {
    it('formats and parses EVM and Solana accounts', () => {
      expect(formatCaip10AccountId(8453, USDC_BASE)).toBe(`eip155:8453:${USDC_BASE}`);
      expect(formatCaip10AccountId('mainnet', USDC_MINT)).toBe(`${SOL_MAINNET}:${USDC_MINT}`);
      expect(parseCaip10AccountId(`eip155:8453:${USDC_BASE}`)).toEqual({
        chainId: 'eip155:8453',
        namespace: 'eip155',
        reference: '8453',
        address: USDC_BASE,
      });
    });

    it('rejects malformed addresses', () => {
      expect(formatCaip10AccountId(1, '0x1234')).toBeUndefined();
      expect(formatCaip10AccountId(1, USDC_MINT)).toBeUndefined();
      expect(formatCaip10AccountId('devnet', USDC_BASE)).toBeUndefined();
      expect(parseCaip10AccountId('eip155:8453')).toBeUndefined();
    });
  });

  describe('CAIP-19', () => {
    it('formats and parses ERC-20, SPL and native assets', () => {
      expect(formatCaip19AssetId(8453, 'erc20', USDC_BASE)).toBe(`eip155:8453/erc20:${USDC_BASE}`);
      expect(formatCaip19AssetId('mainnet', 'token', USDC_MINT)).toBe(`${SOL_MAINNET}/token:${USDC_MINT}`);
      expect(formatCaip19AssetId(1, 'slip44', '60')).toBe('eip155:1/slip44:60');
      expect(parseCaip19AssetId(`${SOL_MAINNET}/slip44:501`)).toEqual({
        chainId: SOL_MAINNET,
        assetNamespace: 'slip44',
        assetReference: '501',
      });
    });

    it('rejects malformed asset IDs', () => {
      for (const bad of ['eip155:1', 'eip155:1/erc20', 'eip155:1/ERC20:0x1', 'eip155:1/erc20:a/b', '1/erc20:0x1']) {
        expect(parseCaip19AssetId(bad)).toBeUndefined();
      }
      expect(formatCaip19AssetId('base', 'erc20', USDC_BASE)).toBeUndefined();
    });
  });
});
