import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getParsedStorageItem } from './getParsedStorageItem';
import { lastConnectedConnectorHelpers } from './lastConnectedConnectorHelpers';
import { recentlyConnectedConnectorsListHelpers } from './recentlyConnectedConnectorsListHelpers';

describe('storageHelpers', () => {
  let store: Record<string, string> = {};
  let session: Record<string, string> = {};

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

  const sessionStorageMock = {
    getItem: vi.fn((key: string) => session[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      session[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete session[key];
    }),
  };

  beforeEach(() => {
    store = {};
    session = {};
    vi.stubGlobal('window', {
      localStorage: localStorageMock,
      sessionStorage: sessionStorageMock,
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

    // A wallet the person did not ask to remember is kept only until the tab closes (Session Storage)
    it('keeps a connection that is not remembered in Session Storage only', () => {
      lastConnectedConnectorHelpers.setLastConnectedConnector(
        { connectorType: 'evm:metamask', chainId: 1, address: '0x123' },
        { remember: false },
      );

      expect(store[lastConnectedConnectorHelpers.STORAGE_KEY]).toBeUndefined();
      expect(JSON.parse(session[lastConnectedConnectorHelpers.STORAGE_KEY])).toMatchObject({
        connectorType: 'evm:metamask',
      });
      expect(lastConnectedConnectorHelpers.getLastConnectedConnector()).toMatchObject({
        connectorType: 'evm:metamask',
      });
      expect(lastConnectedConnectorHelpers.isLastConnectedConnectorRemembered()).toBe(false);
    });

    it('moves the connection to Local Storage when the person asks to remember it, and back', () => {
      lastConnectedConnectorHelpers.setLastConnectedConnector(
        { connectorType: 'evm:metamask', chainId: 1 },
        { remember: false },
      );
      lastConnectedConnectorHelpers.setLastConnectedConnector(
        { connectorType: 'evm:metamask', chainId: 1 },
        { remember: true },
      );
      expect(session[lastConnectedConnectorHelpers.STORAGE_KEY]).toBeUndefined();
      expect(lastConnectedConnectorHelpers.isLastConnectedConnectorRemembered()).toBe(true);

      lastConnectedConnectorHelpers.setLastConnectedConnector(
        { connectorType: 'evm:metamask', chainId: 1 },
        { remember: false },
      );
      expect(store[lastConnectedConnectorHelpers.STORAGE_KEY]).toBeUndefined();

      lastConnectedConnectorHelpers.removeLastConnectedConnector();
      expect(lastConnectedConnectorHelpers.getLastConnectedConnector()).toBeUndefined();
      expect(lastConnectedConnectorHelpers.isLastConnectedConnectorRemembered()).toBeUndefined();
    });

    it('remembers by default, as before', () => {
      lastConnectedConnectorHelpers.setLastConnectedConnector({ connectorType: 'solana:phantom', chainId: 'devnet' });
      expect(store[lastConnectedConnectorHelpers.STORAGE_KEY]).toBeDefined();
    });
  });

  describe('recentlyConnectedConnectorsListHelpers', () => {
    const data = (address: string, disconnectedTimestamp: number) => ({ address, disconnectedTimestamp });

    it('keeps a wallet that is not remembered in the session list, and lists both together', () => {
      recentlyConnectedConnectorsListHelpers.addConnector('evm:metamask', data('0x1', 100));
      recentlyConnectedConnectorsListHelpers.addConnector('solana:phantom', data('So1', 200), { remember: false });

      expect(Object.keys(JSON.parse(store[recentlyConnectedConnectorsListHelpers.STORAGE_KEY]))).toEqual([
        'evm:metamask',
      ]);
      expect(Object.keys(JSON.parse(session[recentlyConnectedConnectorsListHelpers.STORAGE_KEY]))).toEqual([
        'solana:phantom',
      ]);
      expect(recentlyConnectedConnectorsListHelpers.getConnectorsSortedByTime().map(([type]) => type)).toEqual([
        'solana:phantom',
        'evm:metamask',
      ]);
    });

    it('moves a wallet between the lists and removes it from both', () => {
      recentlyConnectedConnectorsListHelpers.addConnector('evm:metamask', data('0x1', 100));
      recentlyConnectedConnectorsListHelpers.addConnector('evm:metamask', data('0x1', 300), { remember: false });
      expect(JSON.parse(store[recentlyConnectedConnectorsListHelpers.STORAGE_KEY])).toEqual({});
      expect(recentlyConnectedConnectorsListHelpers.getConnector('evm:metamask')).toMatchObject({
        disconnectedTimestamp: 300,
      });

      recentlyConnectedConnectorsListHelpers.removeConnector('evm:metamask');
      expect(recentlyConnectedConnectorsListHelpers.hasConnector('evm:metamask')).toBe(false);
    });

    it('drops old wallets from both lists', () => {
      recentlyConnectedConnectorsListHelpers.addConnector('evm:metamask', data('0x1', 100));
      recentlyConnectedConnectorsListHelpers.addConnector('solana:phantom', data('So1', 100), { remember: false });
      recentlyConnectedConnectorsListHelpers.removeConnectorsOlderThan(150);
      expect(recentlyConnectedConnectorsListHelpers.getConnectorCount()).toBe(0);
    });
  });
});
