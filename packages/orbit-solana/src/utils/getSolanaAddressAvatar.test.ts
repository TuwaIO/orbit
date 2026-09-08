import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { clearSolanaAvatarCache, getSolanaAddressAvatar, getSolanaAvatarCacheSize } from './getSolanaAddressAvatar';

describe('getSolanaAddressAvatar', () => {
  beforeEach(() => {
    clearSolanaAvatarCache();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    clearSolanaAvatarCache();
    vi.restoreAllMocks();
  });

  it('returns default avatar if input is empty', async () => {
    expect(await getSolanaAddressAvatar('')).toBe('https://api.dicebear.com/7.x/identicon/svg?seed=default');
  });

  it('generates dicebear fallback avatar for Solana address', async () => {
    const address = '11111111111111111111111111111111';
    const avatar = await getSolanaAddressAvatar(address);

    expect(avatar).toContain('https://api.dicebear.com/7.x/identicon/svg?seed=');
    expect(avatar).toContain(address.toLowerCase());
    expect(getSolanaAvatarCacheSize()).toBe(1);
  });

  it('fetches and caches SNS avatar for domain', async () => {
    const domain = 'test.sol';
    const fakeAvatarUrl = 'https://arweave.net/avatar-image.png';

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        result: [{ domain, image: fakeAvatarUrl }],
      }),
    } as unknown as Response);

    const avatar1 = await getSolanaAddressAvatar(domain);
    expect(avatar1).toBe(fakeAvatarUrl);

    // Second call should return cached avatar without calling fetch again
    const avatar2 = await getSolanaAddressAvatar(domain);
    expect(avatar2).toBe(fakeAvatarUrl);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
