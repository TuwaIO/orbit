import { describe, expect, it } from 'vitest';

import { defaultRpcUrlsByMoniker } from './defaultRpcUrlsByMoniker';
import { resolveSolanaRpcUrl, resolveSolanaRpcUrls } from './resolveSolanaRpcUrl';

describe('resolveSolanaRpcUrl', () => {
  it('keeps a URL as given, whatever the map holds', () => {
    expect(resolveSolanaRpcUrl('https://rpc.example/key', { devnet: 'https://other.example' })).toBe(
      'https://rpc.example/key',
    );
  });

  it('takes the endpoint of a moniker from the map, then the public one', () => {
    expect(resolveSolanaRpcUrl('devnet', { devnet: 'https://rpc.example' })).toBe('https://rpc.example');
    expect(resolveSolanaRpcUrl('devnet', { mainnet: 'https://rpc.example' })).toBe(defaultRpcUrlsByMoniker.devnet);
    expect(resolveSolanaRpcUrl('devnet')).toBe(defaultRpcUrlsByMoniker.devnet);
  });

  it('takes the first of several endpoints of a moniker, and gives all of them in their order', () => {
    const rpcUrls = { devnet: ['https://main.example', 'https://spare.example'] };
    expect(resolveSolanaRpcUrl('devnet', rpcUrls)).toBe('https://main.example');
    expect(resolveSolanaRpcUrls('devnet', rpcUrls)).toEqual(['https://main.example', 'https://spare.example']);
    expect(resolveSolanaRpcUrls('devnet', { devnet: 'https://rpc.example' })).toEqual(['https://rpc.example']);
    expect(resolveSolanaRpcUrls('https://rpc.example/key', rpcUrls)).toEqual(['https://rpc.example/key']);
    // None of its own: the public one
    expect(resolveSolanaRpcUrls('devnet', { devnet: [] })).toEqual([defaultRpcUrlsByMoniker.devnet]);
  });

  it('refuses what is neither', () => {
    expect(() => resolveSolanaRpcUrl('nowhere')).toThrow('Unable to resolve RPC URL for input: "nowhere"');
  });
});
