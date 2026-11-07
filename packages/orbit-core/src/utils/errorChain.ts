/**
 * An error and the causes it wraps, of any kind, as wallet libraries wrap what the wallet answered several levels down.
 * A cause that loops ends the list.
 *
 * @param error - What was thrown.
 * @returns The error first, then each `cause` in turn; empty for `null` or `undefined`.
 */
export function errorChain(error: unknown): unknown[] {
  const chain: unknown[] = [];
  for (let current = error; current !== undefined && current !== null && !chain.includes(current);) {
    chain.push(current);
    current = typeof current === 'object' ? (current as { cause?: unknown }).cause : undefined;
  }
  return chain;
}
