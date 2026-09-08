import { mainnet } from 'viem/chains';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getAddress, getName, isEnsName } from './ensUtils';

const mockGetEnsName = vi.fn();
const mockGetEnsAddress = vi.fn();
const mockNormalize = vi.fn((str: string) => str.toLowerCase());

vi.mock('viem/ens', () => ({
  getEnsName: (...args: unknown[]) => mockGetEnsName(...args),
  getEnsAddress: (...args: unknown[]) => mockGetEnsAddress(...args),
  getEnsAvatar: vi.fn(),
  normalize: (str: string) => mockNormalize(str),
}));

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
  });
});
