import {
  createDefaultRpcTransport,
  createSolanaRpc,
  createSolanaRpcFromTransport,
  type Rpc,
  type RpcTransport,
  type SolanaRpcApi,
} from '@solana/kit';

/**
 * How long an endpoint that failed is left alone, in milliseconds: one out of its limit, or down, is not asked first by every read.
 * @internal
 */
export const URL_REST_MS = 60_000;

/**
 * An RPC client over the endpoints of one cluster. A read goes to the next endpoint when one fails or answers with an HTTP error, and
 * an endpoint that failed is left alone for a minute while others answer. With one endpoint it is the plain client of `@solana/kit`.
 *
 * @param urls - The RPC URLs, the preferred one first; one at least.
 * @returns The RPC client. A read that every endpoint failed rejects with the error of the last.
 * @internal
 */
export function createRpcOver(urls: readonly string[]): Rpc<SolanaRpcApi> {
  if (urls.length === 1) return createSolanaRpc(urls[0]);
  const endpoints = urls.map((url) => ({ transport: createDefaultRpcTransport({ url }), restsUntil: 0 }));
  const transport = async (config: Parameters<RpcTransport>[0]) => {
    const now = Date.now();
    // Those at rest last: when every endpoint has failed, all of them are asked
    const inOrder = [...endpoints].sort((a, b) => Number(a.restsUntil > now) - Number(b.restsUntil > now));
    let failure: unknown;
    for (const endpoint of inOrder) {
      try {
        return await endpoint.transport(config);
      } catch (error) {
        // The caller gave up: no endpoint failed it
        if (config.signal?.aborted) throw error;
        endpoint.restsUntil = Date.now() + URL_REST_MS;
        failure = error;
      }
    }
    throw failure;
  };
  return createSolanaRpcFromTransport(transport as RpcTransport) as Rpc<SolanaRpcApi>;
}
