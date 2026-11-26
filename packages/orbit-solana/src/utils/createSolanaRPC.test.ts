import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { clearSolanaRpcCache, createSolanaRPC } from './createSolanaRPC';

describe('createSolanaRPC', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  beforeEach(() => {
    clearSolanaRpcCache();
  });

  it('creates RPC client for valid cluster monikers', () => {
    const rpcMainnet = createSolanaRPC({ rpcUrlOrMoniker: 'mainnet' });
    const rpcDevnet = createSolanaRPC({ rpcUrlOrMoniker: 'devnet' });

    expect(rpcMainnet).toBeDefined();
    expect(rpcDevnet).toBeDefined();
    expect(typeof rpcMainnet.getSlot).toBe('function');
  });

  it('creates RPC client for custom full URL', () => {
    const customRpc = createSolanaRPC({
      rpcUrlOrMoniker: 'https://my-custom-solana-rpc.com',
    });

    expect(customRpc).toBeDefined();
    expect(typeof customRpc.getSlot).toBe('function');
  });

  it('returns cached RPC instance on subsequent calls', () => {
    const first = createSolanaRPC({ rpcUrlOrMoniker: 'devnet' });
    const second = createSolanaRPC({ rpcUrlOrMoniker: 'devnet' });

    expect(first).toBe(second);
  });

  it('clears cache with clearSolanaRpcCache', () => {
    const first = createSolanaRPC({ rpcUrlOrMoniker: 'devnet' });
    clearSolanaRpcCache();
    const second = createSolanaRPC({ rpcUrlOrMoniker: 'devnet' });

    expect(first).not.toBe(second);
  });

  it('keeps a client for each list of URLs of a cluster, whoever asked first', () => {
    const over = (devnet?: string | string[]) => createSolanaRPC({ rpcUrlOrMoniker: 'devnet', rpcUrls: { devnet } });
    const publicOne = over();
    const own = over('https://a.example');

    expect(own).not.toBe(publicOne);
    expect(over('https://a.example')).toBe(own);
    expect(over(['https://a.example', 'https://b.example'])).not.toBe(own);
    expect(createSolanaRPC({ rpcUrlOrMoniker: 'https://a.example' })).toBe(own);
    expect(over()).toBe(publicOne);
  });

  it('gives a cluster asked for without URLs the client it already has', () => {
    const own = createSolanaRPC({ rpcUrlOrMoniker: 'devnet', rpcUrls: { devnet: 'https://a.example' } });

    expect(createSolanaRPC({ rpcUrlOrMoniker: 'devnet' })).toBe(own);
    expect(createSolanaRPC({ rpcUrlOrMoniker: 'devnet', rpcUrls: { devnet: [] } })).toBe(own);
    expect(createSolanaRPC({ rpcUrlOrMoniker: 'testnet' })).not.toBe(own);
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

    expect(await createSolanaRPC({ rpcUrlOrMoniker: 'devnet', rpcUrls }).getSlot().send()).toBe(7n);
    expect(asked).toEqual(['https://main.example/', 'https://spare.example/']);
  });

  it('throws descriptive error for unresolvable moniker or invalid URL', () => {
    expect(() => createSolanaRPC({ rpcUrlOrMoniker: 'unknown_cluster_name' })).toThrowError(
      /Unable to resolve RPC URL/,
    );
  });
});
