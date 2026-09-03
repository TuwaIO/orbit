import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getParsedStorageItem } from './getParsedStorageItem';
import { lastConnectedConnectorHelpers } from './lastConnectedConnectorHelpers';

describe('storageHelpers', () => {
  let store: Record<string, string> = {};

  const localStorageMock = {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };

  beforeEach(() => {
    store = {};
    vi.stubGlobal('window', {
      localStorage: localStorageMock,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('getParsedStorageItem', () => {
    it('returns undefined if item does not exist', () => {
      expect(getParsedStorageItem('non_existent_key')).toBeUndefined();
    });

    it('correctly parses valid JSON from localStorage', () => {
      localStorageMock.setItem('test_key', JSON.stringify({ a: 1, b: 'two' }));
      expect(getParsedStorageItem<{ a: number; b: string }>('test_key')).toEqual({
        a: 1,
        b: 'two',
      });
    });

    it('returns undefined and handles invalid JSON gracefully', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      localStorageMock.setItem('invalid_json_key', '{not valid json');
      expect(getParsedStorageItem('invalid_json_key')).toBeUndefined();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('lastConnectedConnectorHelpers', () => {
    it('sets and retrieves last connected connector', () => {
      lastConnectedConnectorHelpers.setLastConnectedConnector({
        connectorType: 'evm:metamask',
        chainId: 1,
        address: '0x123',
      });

      const stored = lastConnectedConnectorHelpers.getLastConnectedConnector();
      expect(stored).toEqual({
        connectorType: 'evm:metamask',
        chainId: 1,
        address: '0x123',
      });
    });

    it('removes last connected connector', () => {
      lastConnectedConnectorHelpers.setLastConnectedConnector({
        connectorType: 'solana:phantom',
        chainId: 'mainnet',
      });

      lastConnectedConnectorHelpers.removeLastConnectedConnector();
      expect(lastConnectedConnectorHelpers.getLastConnectedConnector()).toBeUndefined();
    });
  });
});
