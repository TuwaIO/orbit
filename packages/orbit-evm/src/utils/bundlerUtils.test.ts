import { beforeEach, describe, expect, it } from 'vitest';

import { clearBundlerCache, createBundlerRpcClient, createPimlicoRpcUrl } from './bundlerUtils';

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
});
