import { type Chain, mainnet, sepolia } from 'viem/chains';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { createViemClient } from './createViemClient';

/** A chain with these RPC URLs. Every call of one of `down` is refused; the others answer block 7. */
function chainOver(urls: [string, ...string[]], down: string[]) {
  const asked: string[] = [];
  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: string | URL | Request) => {
      const url = String(input instanceof Request ? input.url : input).replace(/\/$/, '');
      asked.push(url);
      if (down.includes(url)) return new Response('{}', { status: 403 });
      return Response.json({ jsonrpc: '2.0', id: 1, result: '0x7' });
    }),
  );
  return { asked, chain: { ...sepolia, rpcUrls: { default: { http: urls } } } as Chain };
}

describe('createViemClient', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('reads a chain through its next URL when the first does not answer', async () => {
    const { asked, chain } = chainOver(['https://main.example', 'https://spare.example'], ['https://main.example']);

    expect(await createViemClient(chain.id, [chain])!.getBlockNumber()).toBe(7n);
    expect(asked[0]).toBe('https://main.example');
    expect(asked.at(-1)).toBe('https://spare.example');
  });

  it('makes another client once any URL of the chain is another', () => {
    const client = (urls: [string, ...string[]]) => {
      const { chain } = chainOver(urls, []);
      return createViemClient(chain.id, [chain]);
    };
    const first = client(['https://a.example', 'https://b.example']);
    expect(client(['https://a.example', 'https://b.example'])).toBe(first);
    expect(client(['https://a.example', 'https://c.example'])).not.toBe(first);
    expect(client(['https://a.example'])!.transport.type).toBe('http');
  });

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
