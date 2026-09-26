/**
 * Polls a predicate until it returns a truthy value.
 *
 * @example
 * ```typescript
 * // Wait up to 10 seconds (50 × 200 ms) for an injected provider.
 * await waitFor(() => typeof window !== 'undefined' && 'ethereum' in window);
 * ```
 *
 * @param predicate - Condition to check on every attempt.
 * @param maxChecks - Maximum number of attempts. Defaults to 50.
 * @param checkIntervalMs - Delay between attempts in milliseconds. Defaults to 200.
 * @returns A promise that resolves as soon as the predicate is truthy.
 * @throws {Error} "Predicate not fulfilled in time" if the predicate is still falsy after `maxChecks` attempts.
 */
export async function waitFor(
  predicate: () => boolean | undefined,
  maxChecks: number = 50,
  checkIntervalMs: number = 200,
) {
  for (let i = 0; i < maxChecks; i++) {
    if (predicate()) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, checkIntervalMs));
  }
  throw new Error('Predicate not fulfilled in time');
}
