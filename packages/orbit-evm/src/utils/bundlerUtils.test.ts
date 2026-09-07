import { type Config } from '@wagmi/core';
import { createPublicClient, custom, type WalletClient } from 'viem';
import { sepolia } from 'viem/chains';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockGetWalletClient = vi.fn();

vi.mock('@wagmi/core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@wagmi/core')>();
  return {
    ...actual,
    getWalletClient: (...args: unknown[]) => mockGetWalletClient(...args),
  };
});

import {
  clearBundlerCache,
  createBundlerRpcClient,
  createPimlicoPaymasterClient,
  createPimlicoRpcUrl,
  createPimlicoSmartAccountClient,
  createSoladySmartAccount,
} from './bundlerUtils';

describe('bundlerUtils', () => {
  beforeEach(() => {
    clearBundlerCache();
  });

  describe('createPimlicoRpcUrl', () => {
    it('returns custom bundlerUrl directly when provided', () => {
      const url = createPimlicoRpcUrl({
        chainId: 1,
        bundlerUrl: 'https://my-custom-bundler.io/rpc',
      });
      expect(url).toBe('https://my-custom-bundler.io/rpc');
    });

    it('returns custom bundlerUrl even if apiKey is provided', () => {
      const url = createPimlicoRpcUrl({
        chainId: 11155111,
        apiKey: 'pim_test_123',
        bundlerUrl: 'https://custom-gateway.xyz',
      });
      expect(url).toBe('https://custom-gateway.xyz');
    });

    it('returns pimlico api URL with apiKey when provided', () => {
      const url = createPimlicoRpcUrl({
        chainId: 11155111,
        apiKey: 'pim_test_key_12345',
      });
      expect(url).toBe('https://api.pimlico.io/v2/11155111/rpc?apikey=pim_test_key_12345');
    });

    it('falls back to public pimlico RPC when no apiKey or bundlerUrl provided', () => {
      const url = createPimlicoRpcUrl({
        chainId: 8453,
      });
      expect(url).toBe('https://public.pimlico.io/v2/8453/rpc');
    });

    it('caches generated RPC URLs for identical configs', () => {
      const config = { chainId: 10, apiKey: 'test_key' };
      const first = createPimlicoRpcUrl(config);
      const second = createPimlicoRpcUrl(config);
      expect(first).toBe('https://api.pimlico.io/v2/10/rpc?apikey=test_key');
      expect(first).toBe(second);
    });
  });

  describe('createBundlerRpcClient', () => {
    it('instantiates a valid Viem bundler client', () => {
      const client = createBundlerRpcClient({
        chainId: 11155111,
        apiKey: 'test_key',
      });

      expect(client).toBeDefined();
      expect(typeof client.sendUserOperation).toBe('function');
      expect(typeof client.estimateUserOperationGas).toBe('function');
      expect(typeof client.getUserOperationReceipt).toBe('function');
    });

    it('returns cached bundler client for identical endpoints', () => {
      const config = {
        chainId: 1,
        apiKey: 'api_cached_key',
      };

      const client1 = createBundlerRpcClient(config);
      const client2 = createBundlerRpcClient(config);

      expect(client1).toBe(client2);
    });

    it('clears client cache with clearBundlerCache', () => {
      const config = {
        chainId: 1,
        apiKey: 'api_cached_key',
      };

      const client1 = createBundlerRpcClient(config);
      clearBundlerCache();
      const client2 = createBundlerRpcClient(config);

      expect(client1).not.toBe(client2);
    });
  });

  describe('createPimlicoPaymasterClient', () => {
    it('instantiates a valid Viem paymaster client with resolved Pimlico URL', () => {
      const paymaster = createPimlicoPaymasterClient({
        chainId: 11155111,
        apiKey: 'test_paymaster_key',
      });

      expect(paymaster).toBeDefined();
      expect(typeof paymaster.getPaymasterData).toBe('function');
      expect(typeof paymaster.getPaymasterStubData).toBe('function');
    });
  });

  describe('createSoladySmartAccount', () => {
    it('throws if wallet client does not have an active account', async () => {
      const client = createPublicClient({
        chain: sepolia,
        transport: custom({
          request: async () => null,
        }),
      });
      const invalidWallet = {} as unknown as WalletClient;

      await expect(
        createSoladySmartAccount({
          client,
          walletClient: invalidWallet,
        }),
      ).rejects.toThrow('WalletClient must have an active account.');
    });

    it('instantiates a Solady smart account with right-padded salt', async () => {
      const mockAddress = '0x1234567890123456789012345678901234567890' as const;
      const mockWalletClient = {
        account: {
          address: mockAddress,
          type: 'json-rpc',
        },
        signMessage: vi.fn().mockResolvedValue('0xmockSignature'),
        signTransaction: vi.fn().mockResolvedValue('0xmockSignedTx'),
        signTypedData: vi.fn().mockResolvedValue('0xmockSignedTypedData'),
      } as unknown as WalletClient;

      const client = createPublicClient({
        chain: sepolia,
        transport: custom({
          request: async ({ method }) => {
            if (method === 'eth_call') {
              return '0x0000000000000000000000001234567890123456789012345678901234567890';
            }
            return null;
          },
        }),
      });

      const smartAccount = await createSoladySmartAccount({
        client,
        walletClient: mockWalletClient,
      });

      expect(smartAccount).toBeDefined();
      expect(smartAccount.address).toMatch(/^0x[a-fA-F0-9]{40}$/);
      expect(typeof smartAccount.signMessage).toBe('function');
      expect(typeof smartAccount.signUserOperation).toBe('function');
    });
  });

  describe('createPimlicoSmartAccountClient', () => {
    it('throws when neither walletClient nor wagmiConfig is provided', async () => {
      await expect(
        createPimlicoSmartAccountClient({
          chain: sepolia,
        }),
      ).rejects.toThrow('Active wallet connection with account is required');
    });

    it('orchestrates smart account, bundler, and paymaster when walletClient is provided', async () => {
      const mockAddress = '0x1234567890123456789012345678901234567890' as const;
      const mockWalletClient = {
        account: {
          address: mockAddress,
          type: 'json-rpc',
        },
        signMessage: vi.fn().mockResolvedValue('0xmockSignature'),
        signTransaction: vi.fn().mockResolvedValue('0xmockSignedTx'),
        signTypedData: vi.fn().mockResolvedValue('0xmockSignedTypedData'),
      } as unknown as WalletClient;

      const client = createPublicClient({
        chain: sepolia,
        transport: custom({
          request: async ({ method }) => {
            if (method === 'eth_call') {
              return '0x0000000000000000000000001234567890123456789012345678901234567890';
            }
            return null;
          },
        }),
      });

      const result = await createPimlicoSmartAccountClient({
        chain: sepolia,
        walletClient: mockWalletClient,
        client,
        apiKey: 'test_pimlico_key',
      });

      expect(result.account).toBeDefined();
      expect(result.account.address).toMatch(/^0x[a-fA-F0-9]{40}$/);
      expect(result.bundlerClient).toBeDefined();
      expect(typeof result.bundlerClient.sendUserOperation).toBe('function');
      expect(result.publicClient).toBeDefined();
      expect(result.paymasterClient).toBeDefined();
    });

    it('resolves walletClient from wagmiConfig when wagmiConfig is provided', async () => {
      const mockAddress = '0x1234567890123456789012345678901234567890' as const;
      const mockWalletClient = {
        account: {
          address: mockAddress,
          type: 'json-rpc',
        },
        signMessage: vi.fn().mockResolvedValue('0xmockSignature'),
        signTransaction: vi.fn().mockResolvedValue('0xmockSignedTx'),
        signTypedData: vi.fn().mockResolvedValue('0xmockSignedTypedData'),
      } as unknown as WalletClient;

      mockGetWalletClient.mockResolvedValue(mockWalletClient);

      const client = createPublicClient({
        chain: sepolia,
        transport: custom({
          request: async ({ method }) => {
            if (method === 'eth_call') {
              return '0x0000000000000000000000001234567890123456789012345678901234567890';
            }
            return null;
          },
        }),
      });

      const dummyConfig = {} as Config;

      const result = await createPimlicoSmartAccountClient({
        chain: sepolia,
        wagmiConfig: dummyConfig,
        client,
        apiKey: 'test_pimlico_key',
      });

      expect(mockGetWalletClient).toHaveBeenCalledWith(dummyConfig, { chainId: sepolia.id });
      expect(result.account).toBeDefined();
      expect(result.bundlerClient).toBeDefined();
      expect(result.publicClient).toBeDefined();
    });
  });
});
