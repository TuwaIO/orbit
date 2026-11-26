/**
 * @file How a chain is read: through its default RPC URLs, in their order.
 */

import { fallback, http, Transport } from 'viem';
import { Chain } from 'viem/chains';

/**
 * The viem transport of a chain over the default RPC URLs of its definition (`rpcUrls.default.http`): a read goes to the next URL when
 * one does not answer.
 *
 * @param chain - The chain.
 * @returns An `http` transport of the URL, or a `fallback` over several, in their order.
 *
 * @example
 * ```ts
 * import { chainTransport } from '@tuwaio/orbit-evm';
 * import { createPublicClient } from 'viem';
 * import { mainnet } from 'viem/chains';
 *
 * const chain = {
 *   ...mainnet,
 *   rpcUrls: { default: { http: ['https://my-rpc-provider.example', 'https://eth.merkle.io'] } },
 * } as const;
 *
 * const client = createPublicClient({ chain, transport: chainTransport(chain) });
 * ```
 */
export function chainTransport(chain: Chain): Transport {
  const urls = chain.rpcUrls.default.http;
  return urls.length > 1 ? fallback(urls.map((url) => http(url))) : http();
}

/**
 * Whether two definitions of a chain are read through the same URLs.
 *
 * @internal
 * @param one - A chain.
 * @param other - Another definition of it.
 * @returns `true` when the default RPC URLs are the same, in the same order.
 */
export function sameRpcUrls(one: Chain | undefined, other: Chain | undefined): boolean {
  return one?.rpcUrls.default.http.join() === other?.rpcUrls.default.http.join();
}
