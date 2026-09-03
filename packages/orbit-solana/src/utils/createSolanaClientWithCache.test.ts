import { beforeEach, describe, expect, it } from 'vitest';

import { clearSolanaClientCache, createSolanaClientWithCache } from './createSolanaClientWithCache';

describe('createSolanaClientWithCache', () => {
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

  it('throws descriptive error when input cannot be resolved', () => {
    expect(() => createSolanaClientWithCache({ rpcUrlOrMoniker: 'invalid-moniker' })).toThrowError(
      /Unable to resolve RPC URL/,
    );
  });
});
