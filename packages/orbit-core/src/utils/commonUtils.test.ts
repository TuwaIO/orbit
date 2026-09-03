import { describe, expect, it, vi } from 'vitest';

import { OrbitAdapter } from '../types';
import { delay } from './delay';
import { filterUniqueByKey } from './filterUniqueByKey';
import { normalizeError } from './normalizeError';
import { selectAdapterByKey } from './selectAdapterByKey';
import { waitFor } from './waitFor';

describe('commonUtils', () => {
  describe('filterUniqueByKey', () => {
    it('removes duplicate objects by specified key', () => {
      const items = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 1, name: 'Alice Duplicate' },
        { id: 3, name: 'Charlie' },
      ];

      const filtered = filterUniqueByKey(items, 'id');
      expect(filtered).toHaveLength(3);
      expect(filtered.map((item) => item.id)).toEqual([1, 2, 3]);
    });
  });

  describe('delay', () => {
    it('resolves properly after delay with provided value', async () => {
      await expect(delay('ready', 10)).resolves.toBe('ready');
    });
  });

  describe('waitFor', () => {
    it('resolves when predicate returns true', async () => {
      let count = 0;
      setTimeout(() => {
        count = 5;
      }, 30);

      await waitFor(() => count === 5, 200, 10);
      expect(count).toBe(5);
    });

    it('rejects if timeout is reached', async () => {
      await expect(waitFor(() => false, 50, 10)).rejects.toThrow('Predicate not fulfilled in time');
    });
  });

  describe('normalizeError', () => {
    it('normalizes standard Error instance', () => {
      const err = new Error('User rejected');
      const normalized = normalizeError(err);
      expect(normalized.message).toBe('User rejected');
    });

    it('normalizes string error', () => {
      const normalized = normalizeError('Network error');
      expect(normalized.message).toBe('Network error');
    });

    it('normalizes unknown error types', () => {
      const normalized = normalizeError(null);
      expect(normalized).toBeDefined();
      expect(normalized.message).toBeDefined();
    });
  });

  describe('selectAdapterByKey', () => {
    it('selects adapter from list matching key', () => {
      const evmAdapter = { key: OrbitAdapter.EVM, name: 'evm' };
      const solanaAdapter = { key: OrbitAdapter.SOLANA, name: 'solana' };

      const selected = selectAdapterByKey({
        adapterKey: OrbitAdapter.SOLANA,
        adapter: [evmAdapter, solanaAdapter],
      });

      expect(selected).toBe(solanaAdapter);
    });

    it('falls back to first adapter with warning when key is not found', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const evmAdapter = { key: OrbitAdapter.EVM, name: 'evm' };

      const selected = selectAdapterByKey({
        adapterKey: OrbitAdapter.SOLANA,
        adapter: [evmAdapter],
      });

      expect(selected).toBe(evmAdapter);
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });
});
