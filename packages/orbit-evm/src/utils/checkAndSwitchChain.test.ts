import type { Config } from '@wagmi/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { checkAndSwitchChain } from './checkAndSwitchChain';

const mockGetConnection = vi.fn();
const mockSwitchChain = vi.fn();

vi.mock('@wagmi/core', () => ({
  getConnection: (...args: unknown[]) => mockGetConnection(...args),
  switchChain: (...args: unknown[]) => mockSwitchChain(...args),
}));

describe('checkAndSwitchChain', () => {
  const dummyConfig = {} as Config;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does nothing if no wallet connector is active', async () => {
    mockGetConnection.mockReturnValue({
      connector: undefined,
      chainId: 1,
    });

    await checkAndSwitchChain(137, dummyConfig);
    expect(mockSwitchChain).not.toHaveBeenCalled();
  });

  it('does nothing if wallet is already on the desired chain', async () => {
    mockGetConnection.mockReturnValue({
      connector: { id: 'mock' },
      chainId: 1,
    });

    await checkAndSwitchChain(1, dummyConfig);
    expect(mockSwitchChain).not.toHaveBeenCalled();
  });

  it('calls switchChain if wallet is on a different chain', async () => {
    mockGetConnection.mockReturnValue({
      connector: { id: 'mock' },
      chainId: 1,
    });
    mockSwitchChain.mockResolvedValue({});

    await checkAndSwitchChain(137, dummyConfig);
    expect(mockSwitchChain).toHaveBeenCalledWith(expect.anything(), { chainId: 137 });
  });

  it('throws a specific error if user rejected the network switch request', async () => {
    mockGetConnection.mockReturnValue({
      connector: { id: 'mock' },
      chainId: 1,
    });

    const rejectionError = new Error('User rejected', {
      cause: { name: 'UserRejectedRequestError' },
    });
    mockSwitchChain.mockRejectedValue(rejectionError);

    await expect(checkAndSwitchChain(137, dummyConfig)).rejects.toThrow('User rejected the request to switch network.');
  });
});
