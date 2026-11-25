import { type Chain, sepolia } from 'viem/chains';
import { describe, expect, it } from 'vitest';

import { chainTransport } from '../index';

const over = (http: [string, ...string[]]) => ({ ...sepolia, rpcUrls: { default: { http } } }) as Chain;
const transportOf = (chain: Chain) => chainTransport(chain)({ chain });

describe('chainTransport', () => {
  it('reads a chain over its default RPC URL', () => {
    expect(transportOf(over(['https://main.example'])).value).toMatchObject({ url: 'https://main.example' });
  });

  it('reads a chain over every default RPC URL, in their order', () => {
    const { config, value } = transportOf(over(['https://main.example', 'https://spare.example']));

    expect(config.type).toBe('fallback');
    expect(value?.transports.map((transport: { value: { url: string } }) => transport.value.url)).toEqual([
      'https://main.example',
      'https://spare.example',
    ]);
  });
});
