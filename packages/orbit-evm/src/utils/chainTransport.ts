/**
 * @file How a chain is read: through its default RPC URLs, in their order.
 */

import { fallback, http, Transport } from 'viem';
import { Chain } from 'viem/chains';

/**
 * The transport of a chain: every default RPC URL of its definition, the next when one does not answer.
 *
 * @internal
 * @param chain - The chain.
 * @returns The `http` transport of its URL, or a `fallback` over several.
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
