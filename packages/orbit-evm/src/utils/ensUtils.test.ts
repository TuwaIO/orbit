import { mainnet, sepolia } from 'viem/chains';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getAddress, getAvatar, getName, isEnsName } from './ensUtils';

const ensModule = vi.hoisted(() => ({ loaded: false }));

const mockGetEnsName = vi.fn();
const mockGetEnsAddress = vi.fn();
const mockGetEnsAvatar = vi.fn();
const mockNormalize = vi.fn((str: string) => str.toLowerCase());

vi.mock('viem/actions', () => ({
  getEnsName: (...args: unknown[]) => mockGetEnsName(...args),
  getEnsAddress: (...args: unknown[]) => mockGetEnsAddress(...args),
  getEnsAvatar: (...args: unknown[]) => mockGetEnsAvatar(...args),
}));

vi.mock('viem/ens', () => {
  ensModule.loaded = true;
  return {
    normalize: (str: string) => mockNormalize(str),
  };
});

describe('ensUtils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('isEnsName', () => {
    it('returns true for names with dots that are not addresses', () => {
      expect(isEnsName('vitalik.eth')).toBe(true);
      expect(isEnsName('sub.domain.eth')).toBe(true);
    });

    it('returns false for EVM addresses even if they have weird characters', () => {
      expect(isEnsName('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')).toBe(false);
    });

    it('returns false for plain strings without dots', () => {
      expect(isEnsName('vitalik')).toBe(false);
      expect(isEnsName('')).toBe(false);
    });
  });

  describe('getName and getAddress with mock', () => {
    // Keep this test first: the flag records whether anything has imported `viem/ens` so far
    it('loads the ENS normalization code only when there is a name to normalize', async () => {
      mockGetEnsName.mockResolvedValue(null);
      mockGetEnsAddress.mockResolvedValue(null);

      await getName('0x0000000000000000000000000000000000000003', [mainnet]);
      expect(ensModule.loaded).toBe(false);

      await getAddress('lazy.eth', [mainnet]);
      expect(ensModule.loaded).toBe(true);
    });

    it('fetches and caches ENS name', async () => {
      mockGetEnsName.mockResolvedValue('vitalik.eth');

      const name1 = await getName('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', [mainnet]);
      const name2 = await getName('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', [mainnet]);

      expect(name1).toBe('vitalik.eth');
      expect(name2).toBe('vitalik.eth');
      expect(mockGetEnsName).toHaveBeenCalledTimes(1); // Cached on second call
    });

    it('fetches and caches ENS address', async () => {
      mockGetEnsAddress.mockResolvedValue('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');

      const addr1 = await getAddress('vitalik.eth', [mainnet]);
      const addr2 = await getAddress('vitalik.eth', [mainnet]);

      expect(addr1).toBe('0xd8da6bf26964af9d7eed9e03e53415d37aa96045');
      expect(addr2).toBe('0xd8da6bf26964af9d7eed9e03e53415d37aa96045');
      expect(mockGetEnsAddress).toHaveBeenCalledTimes(1); // Cached on second call
    });

    it('fetches and caches the avatar of a normalized name', async () => {
      mockGetEnsAvatar.mockResolvedValue('https://example.com/a.png');

      expect(await getAvatar('Avatar.eth', [mainnet])).toBe('https://example.com/a.png');
      expect(await getAvatar('avatar.eth', [mainnet])).toBe('https://example.com/a.png');

      expect(mockGetEnsAvatar).toHaveBeenCalledTimes(1);
      expect(mockGetEnsAvatar.mock.calls[0][1]).toEqual({ name: 'avatar.eth' });
    });

    it('passes a client without public actions, so they stay out of the bundle', async () => {
      mockGetEnsName.mockResolvedValue(null);

      await getName('0x0000000000000000000000000000000000000001', [mainnet]);

      const client = mockGetEnsName.mock.calls[0][0];
      expect(client.chain.id).toBe(mainnet.id);
      expect(client).not.toHaveProperty('getBalance');
    });

    it('uses the mainnet RPC URL from the chains of the app', async () => {
      mockGetEnsName.mockResolvedValue(null);
      const customMainnet = { ...mainnet, rpcUrls: { default: { http: ['https://rpc.example.com'] } } };

      await getName('0x0000000000000000000000000000000000000002', [sepolia, customMainnet]);

      expect(mockGetEnsName.mock.calls[0][0].chain.rpcUrls.default.http[0]).toBe('https://rpc.example.com');
    });

    it('uses viem mainnet when the chains of the app do not include it', async () => {
      mockGetEnsName.mockResolvedValue(null);

      await getName('0x0000000000000000000000000000000000000004', [sepolia]);

      const client = mockGetEnsName.mock.calls[0][0];
      expect(client.chain.id).toBe(mainnet.id);
      expect(client.chain.rpcUrls.default.http[0]).toBe(mainnet.rpcUrls.default.http[0]);
    });

    it('rejects on a name that cannot be normalized', async () => {
      mockNormalize.mockImplementationOnce(() => {
        throw new Error('invalid name');
      });

      await expect(getAddress('bad name.eth', [mainnet])).rejects.toThrow('invalid name');
      expect(mockGetEnsAddress).not.toHaveBeenCalled();
    });
  });
});
