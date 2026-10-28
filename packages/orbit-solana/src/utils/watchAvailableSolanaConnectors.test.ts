import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { watchAvailableSolanaConnectors } from './watchAvailableSolanaConnectors';

type RegistryEvent = 'register' | 'unregister';
type RegistryListener = (...wallets: unknown[]) => void;

const registry = vi.hoisted(() => {
  const listeners = new Map<string, RegistryListener>();
  const offs = new Map<string, ReturnType<typeof vi.fn>>();
  return {
    listeners,
    offs,
    getWallets: vi.fn(),
  };
});

vi.mock('@wallet-standard/app', () => ({
  getWallets: registry.getWallets,
}));

describe('watchAvailableSolanaConnectors', () => {
  beforeEach(() => {
    registry.listeners.clear();
    registry.offs.clear();
    registry.getWallets.mockReset();
    registry.getWallets.mockImplementation(() => ({
      on: (event: RegistryEvent, listener: RegistryListener) => {
        registry.listeners.set(event, listener);
        const off = vi.fn();
        registry.offs.set(event, off);
        return off;
      },
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('in the browser', () => {
    beforeEach(() => {
      vi.stubGlobal('window', {});
    });

    it('subscribes to the register and unregister events of the registry', () => {
      watchAvailableSolanaConnectors(() => undefined);

      expect(registry.getWallets).toHaveBeenCalledTimes(1);
      expect([...registry.listeners.keys()].sort()).toEqual(['register', 'unregister']);
    });

    it('calls onChange with no arguments when a wallet registers or unregisters', () => {
      const onChange = vi.fn();
      watchAvailableSolanaConnectors(onChange);

      registry.listeners.get('register')?.({ name: 'Phantom' });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith();

      registry.listeners.get('unregister')?.({ name: 'Phantom' }, { name: 'Solflare' });
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith();
    });

    it('stops both subscriptions when the returned function is called', () => {
      const stop = watchAvailableSolanaConnectors(() => undefined);

      expect(registry.offs.get('register')).not.toHaveBeenCalled();
      expect(registry.offs.get('unregister')).not.toHaveBeenCalled();

      stop();

      expect(registry.offs.get('register')).toHaveBeenCalledTimes(1);
      expect(registry.offs.get('unregister')).toHaveBeenCalledTimes(1);
    });
  });

  describe('on the server', () => {
    it('subscribes to nothing and returns a function that does nothing', () => {
      expect(typeof window).toBe('undefined');
      const onChange = vi.fn();

      const stop = watchAvailableSolanaConnectors(onChange);

      expect(registry.getWallets).not.toHaveBeenCalled();
      expect(() => stop()).not.toThrow();
      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
