import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { clearSolanaClientCache, createSolanaClientWithCache } from './createSolanaClientWithCache';

describe('createSolanaClientWithCache', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  beforeEach(() => {
    clearSolanaClientCache();
  });

  it('creates a Solana client instance containing rpc', () => {
    const client = createSolanaClientWithCache({ rpcUrlOrMoniker: 'devnet' });

    expect(client).toBeDefined();
    expect(client.rpc).toBeDefined();
    expect(typeof client.rpc.getSlot).toBe('function');
  });

  it('returns cached client instance for identical input', () => {
    const client1 = createSolanaClientWithCache({ rpcUrlOrMoniker: 'mainnet' });
    const client2 = createSolanaClientWithCache({ rpcUrlOrMoniker: 'mainnet' });

    expect(client1).toBe(client2);
  });

  it('clears client cache with clearSolanaClientCache', () => {
    const client1 = createSolanaClientWithCache({ rpcUrlOrMoniker: 'devnet' });
    clearSolanaClientCache();
    const client2 = createSolanaClientWithCache({ rpcUrlOrMoniker: 'devnet' });

    expect(client1).not.toBe(client2);
  });

  it('keeps a client for each list of URLs of a cluster, whoever asked first', () => {
    const over = (devnet?: string | string[]) =>
      createSolanaClientWithCache({ rpcUrlOrMoniker: 'devnet', rpcUrls: { devnet } });
    const publicOne = over();
    const own = over('https://a.example');

    expect(own).not.toBe(publicOne);
    expect(over('https://a.example')).toBe(own);
    expect(over(['https://a.example', 'https://b.example'])).not.toBe(own);
    expect(createSolanaClientWithCache({ rpcUrlOrMoniker: 'https://a.example' })).toBe(own);
    expect(over()).toBe(publicOne);
  });

  it('gives a cluster asked for without URLs the client it already has', () => {
    const own = createSolanaClientWithCache({ rpcUrlOrMoniker: 'devnet', rpcUrls: { devnet: 'https://a.example' } });

    expect(createSolanaClientWithCache({ rpcUrlOrMoniker: 'devnet' })).toBe(own);
    expect(createSolanaClientWithCache({ rpcUrlOrMoniker: 'devnet', rpcUrls: { devnet: [] } })).toBe(own);
    expect(createSolanaClientWithCache({ rpcUrlOrMoniker: 'testnet' })).not.toBe(own);
  });

  it('reads the next URL of a cluster with several, when the first does not answer', async () => {
    const asked: string[] = [];
    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: string | URL | Request) => {
        asked.push(String(input instanceof Request ? input.url : input));
        if (asked.length === 1) return new Response('', { status: 429 });
        return Response.json({ jsonrpc: '2.0', id: '0', result: 7 });
      }),
    );
    const rpcUrls = { devnet: ['https://main.example/', 'https://spare.example/'] };

    expect(await createSolanaClientWithCache({ rpcUrlOrMoniker: 'devnet', rpcUrls }).rpc.getSlot().send()).toBe(7n);
    expect(asked).toEqual(['https://main.example/', 'https://spare.example/']);
  });

  it('throws descriptive error when input cannot be resolved', () => {
    expect(() => createSolanaClientWithCache({ rpcUrlOrMoniker: 'invalid-moniker' })).toThrowError(
      /Unable to resolve RPC URL/,
    );
  });
});
