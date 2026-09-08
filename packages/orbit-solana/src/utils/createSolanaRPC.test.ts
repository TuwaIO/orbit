import { beforeEach, describe, expect, it } from 'vitest';

import { clearSolanaRpcCache, createSolanaRPC } from './createSolanaRPC';

describe('createSolanaRPC', () => {
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

  it('throws descriptive error for unresolvable moniker or invalid URL', () => {
    expect(() => createSolanaRPC({ rpcUrlOrMoniker: 'unknown_cluster_name' })).toThrowError(
      /Unable to resolve RPC URL/,
    );
  });
});
