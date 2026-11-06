import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const refused = () => {
  throw new DOMException('The operation is insecure.', 'SecurityError');
};

/** A page's window, not in a frame, with the given fields. */
const pageWindow = (fields: PropertyDescriptorMap) => {
  const page = Object.defineProperties({ location: { protocol: 'https:' } }, fields);
  return Object.assign(page, { parent: page });
};

// A browser that blocks site data throws on reaching `window.localStorage`, not on what is called on it. These helpers
// run when the module loads, so an app importing Orbit would fail before anything of its own could catch it
describe('a browser that blocks storage', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal('window', pageWindow({ localStorage: { get: refused }, sessionStorage: { get: refused } }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('can load Orbit, and finds nothing saved', async () => {
    const orbit = await import('../index');

    expect(orbit.impersonatedHelpers.impersonatedAddress).toBe('');
    expect(orbit.lastConnectedConnectorHelpers.lastConnectedConnector).toBeUndefined();
    expect(orbit.recentlyConnectedConnectorsListHelpers.recentlyConnectedConnectorsList).toBeUndefined();
    expect(orbit.getBrowserStorage()).toBeNull();
    expect(orbit.readBrowserStorage('key')).toBeNull();
    expect(orbit.getParsedStorageItem('key')).toBeUndefined();
  });

  it('runs every helper without throwing, as the store awaits them on connect and disconnect', async () => {
    const { impersonatedHelpers, lastConnectedConnectorHelpers, recentlyConnectedConnectorsListHelpers } =
      await import('../index');
    const connection = { connectorType: 'evm:metamask', chainId: 1 } as const;
    const recent = { address: '0x1', disconnectedTimestamp: 1 };

    expect(impersonatedHelpers.getImpersonated()).toBeNull();
    impersonatedHelpers.setImpersonated('0x1');
    impersonatedHelpers.removeImpersonated();

    lastConnectedConnectorHelpers.setLastConnectedConnector(connection);
    lastConnectedConnectorHelpers.setLastConnectedConnector(connection, { remember: false });
    expect(lastConnectedConnectorHelpers.getLastConnectedConnector()).toBeUndefined();
    expect(lastConnectedConnectorHelpers.isLastConnectedConnectorRemembered()).toBeUndefined();
    lastConnectedConnectorHelpers.removeLastConnectedConnector();

    recentlyConnectedConnectorsListHelpers.setRecentlyConnectedConnectorsList({ 'evm:metamask': recent });
    recentlyConnectedConnectorsListHelpers.addConnector('evm:metamask', recent);
    recentlyConnectedConnectorsListHelpers.addConnector('evm:metamask', recent, { remember: false });
    expect(recentlyConnectedConnectorsListHelpers.getRecentlyConnectedConnectorsList()).toBeUndefined();
    expect(recentlyConnectedConnectorsListHelpers.hasConnector('evm:metamask')).toBe(false);
    recentlyConnectedConnectorsListHelpers.removeConnector('evm:metamask');
    recentlyConnectedConnectorsListHelpers.removeRecentlyConnectedConnectorsList();
  });

  it('treats a storage that refuses to read as empty', async () => {
    vi.stubGlobal('window', pageWindow({ localStorage: { value: { getItem: refused } } }));
    const { impersonatedHelpers, readBrowserStorage } = await import('../index');

    expect(readBrowserStorage('key')).toBeNull();
    expect(impersonatedHelpers.impersonatedAddress).toBe('');
  });

  it('still reports a full storage: a lost write must not pass as saved', async () => {
    const full = () => {
      throw new DOMException('Quota exceeded', 'QuotaExceededError');
    };
    vi.stubGlobal('window', pageWindow({ localStorage: { value: { getItem: () => null, setItem: full } } }));
    const { impersonatedHelpers } = await import('../index');

    expect(() => impersonatedHelpers.setImpersonated('0x1')).toThrow('Quota exceeded');
  });
});

describe('without a browser', () => {
  it('has no storage', async () => {
    vi.resetModules();
    const { getBrowserStorage, readBrowserStorage, impersonatedHelpers } = await import('../index');

    expect(getBrowserStorage()).toBeNull();
    expect(readBrowserStorage('key')).toBeNull();
    expect(impersonatedHelpers.getImpersonated()).toBeUndefined();
  });
});
