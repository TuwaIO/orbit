import { mainnet, sepolia } from 'viem/chains';
import { describe, expect, it, vi } from 'vitest';

import { createViemClient } from './createViemClient';

describe('createViemClient', () => {
  it('creates and caches a Viem public client for supported chains', () => {
    const client1 = createViemClient(mainnet.id, [mainnet, sepolia]);
    const client2 = createViemClient(mainnet.id, [mainnet, sepolia]);

    expect(client1).toBeDefined();
    expect(client1?.chain?.id).toBe(mainnet.id);
    expect(client1).toBe(client2);
  });

  it('returns undefined and logs a warning when chain is not found', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const client = createViemClient(999999, [mainnet]);

    expect(client).toBeUndefined();
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('createViemClient: No chain configuration found'));
    warnSpy.mockRestore();
  });
});
