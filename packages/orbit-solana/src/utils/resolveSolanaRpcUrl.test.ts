import { describe, expect, it } from 'vitest';

import { defaultRpcUrlsByMoniker } from './defaultRpcUrlsByMoniker';
import { resolveSolanaRpcUrl } from './resolveSolanaRpcUrl';

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

  it('refuses what is neither', () => {
    expect(() => resolveSolanaRpcUrl('nowhere')).toThrow('Unable to resolve RPC URL for input: "nowhere"');
  });
});
