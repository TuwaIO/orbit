import { afterEach, beforeEach, describe, expect, it, type MockInstance, vi } from 'vitest';

import { clearSolanaNameCache, getSolanaAddressName, getSolanaNameCacheSize } from './getSolanaAddressName';

const ADDRESS = '11111111111111111111111111111111';

describe('getSolanaAddressName', () => {
  // A test reaches no network: a request it does not answer itself fails
  let fetchSpy: MockInstance<typeof fetch>;

  beforeEach(() => {
    clearSolanaNameCache();
    vi.restoreAllMocks();
    fetchSpy = vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('A test sends nothing over the network'));
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

  it('asks no name service unless snsName is on, and returns the address', async () => {
    expect(await getSolanaAddressName(ADDRESS)).toBe(ADDRESS);
    expect(await getSolanaAddressName(ADDRESS, { snsName: false })).toBe(ADDRESS);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(getSolanaNameCacheSize()).toBe(0);
  });

  it('with snsName, takes the favorite domain of the address from the Bonfida SNS API and keeps it', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: { [ADDRESS]: 'satoshisystem.sol' } }),
    } as unknown as Response);

    expect(await getSolanaAddressName(ADDRESS, { snsName: true })).toBe('satoshisystem.sol');
    expect(getSolanaNameCacheSize()).toBe(1);
    expect(fetchSpy).toHaveBeenCalledWith(`https://sns-api.bonfida.com/v2/user/fav-domains/${ADDRESS}`);

    // Second call should hit cache without another fetch call
    expect(await getSolanaAddressName(ADDRESS, { snsName: true })).toBe('satoshisystem.sol');
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    // Without the option the name it kept is not read either: the answer does not depend on an earlier call
    expect(await getSolanaAddressName(ADDRESS)).toBe(ADDRESS);
  });

  it('with snsName, falls back to the address when SNS has no name', async () => {
    fetchSpy.mockResolvedValueOnce({ ok: false } as unknown as Response);

    expect(await getSolanaAddressName(ADDRESS, { snsName: true })).toBe(ADDRESS);
  });
});
