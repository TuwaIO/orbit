import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { clearSolanaNameCache, getSolanaAddressName, getSolanaNameCacheSize } from './getSolanaAddressName';

describe('getSolanaAddressName', () => {
  beforeEach(() => {
    clearSolanaNameCache();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    clearSolanaNameCache();
    vi.restoreAllMocks();
  });

  it('returns empty string if address is empty', async () => {
    expect(await getSolanaAddressName('')).toBe('');
  });

  it('returns the input as fallback if address is not a valid Solana address', async () => {
    const invalid = 'not-a-solana-address';
    expect(await getSolanaAddressName(invalid)).toBe(invalid);
  });

  it('fetches and caches SNS name for valid address', async () => {
    const validAddress = '11111111111111111111111111111111';

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        result: {
          [validAddress]: 'satoshisystem.sol',
        },
      }),
    } as unknown as Response);

    const name1 = await getSolanaAddressName(validAddress);
    expect(name1).toBe('satoshisystem.sol');
    expect(getSolanaNameCacheSize()).toBe(1);

    // Second call should hit cache without another fetch call
    const name2 = await getSolanaAddressName(validAddress);
    expect(name2).toBe('satoshisystem.sol');
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('falls back to address when SNS returns null/empty', async () => {
    const validAddress = '11111111111111111111111111111111';

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
    } as unknown as Response);

    const name = await getSolanaAddressName(validAddress);
    expect(name).toBe(validAddress);
  });
});
