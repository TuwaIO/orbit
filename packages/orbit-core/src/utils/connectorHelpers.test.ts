import { describe, expect, it } from 'vitest';

import { OrbitAdapter } from '../types';
import { formatConnectorChainId } from './formatConnectorChainId';
import { formatConnectorName } from './formatConnectorName';
import { getAdapterFromConnectorType } from './getAdapterFromConnectorType';
import { getConnectorTypeFromName } from './getConnectorTypeFromName';

describe('connectorHelpers', () => {
  describe('formatConnectorName', () => {
    it('formats known connector mappings correctly', () => {
      expect(formatConnectorName('Impersonated Connector')).toBe('impersonatedwallet');
      expect(formatConnectorName('Safe')).toBe('safe');
      expect(formatConnectorName('Trust Wallet')).toBe('trust');
      expect(formatConnectorName('Brave Wallet')).toBe('brave');
      expect(formatConnectorName('Base Account')).toBe('coinbase');
    });

    it('removes whitespace and converts to lowercase for unknown names', () => {
      expect(formatConnectorName('MetaMask Wallet')).toBe('metamaskwallet');
      expect(formatConnectorName('Phantom App')).toBe('phantomapp');
    });
  });

  describe('formatConnectorChainId', () => {
    it('turns Solana clusters into genesis-hash chain IDs', () => {
      expect(formatConnectorChainId('mainnet', OrbitAdapter.SOLANA)).toBe('solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp');
      expect(formatConnectorChainId('devnet', OrbitAdapter.SOLANA)).toBe('solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1');
      expect(formatConnectorChainId('solana:devnet', OrbitAdapter.SOLANA)).toBe(
        'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
      );
      expect(formatConnectorChainId('solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1', OrbitAdapter.SOLANA)).toBe(
        'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
      );
    });

    it('prefixes other string chainIds with the adapter once', () => {
      expect(formatConnectorChainId('custom', OrbitAdapter.SOLANA)).toBe('solana:custom');
      expect(formatConnectorChainId('solana:custom', OrbitAdapter.SOLANA)).toBe('solana:custom');
      expect(formatConnectorChainId('mainnet', OrbitAdapter.Starknet)).toBe('starknet:mainnet');
    });

    it('returns numeric chainId untouched', () => {
      expect(formatConnectorChainId(1, OrbitAdapter.EVM)).toBe(1);
      expect(formatConnectorChainId(137, OrbitAdapter.EVM)).toBe(137);
    });
  });

  describe('getConnectorTypeFromName', () => {
    it('creates standardized connector type identifier', () => {
      expect(getConnectorTypeFromName(OrbitAdapter.EVM, 'MetaMask')).toBe('evm:metamask');
      expect(getConnectorTypeFromName(OrbitAdapter.SOLANA, 'Phantom')).toBe('solana:phantom');
    });
  });

  describe('getAdapterFromConnectorType', () => {
    it('extracts adapter from formatted connector type', () => {
      expect(getAdapterFromConnectorType('evm:metamask')).toBe(OrbitAdapter.EVM);
      expect(getAdapterFromConnectorType('solana:phantom')).toBe(OrbitAdapter.SOLANA);
    });
  });
});
