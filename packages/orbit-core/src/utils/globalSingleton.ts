/**
 * One object for all copies of a package on a page, kept on `globalThis` under `Symbol.for(key)`. A bundler can load a
 * package twice, and two copies of a React context or a registry do not see each other.
 *
 * @template T - The type of the object.
 * @param key - The name of the symbol. It must never change: published copies find each other through it.
 * @param create - Makes the object, called only when no copy has made it yet.
 * @returns The object.
 */
export function globalSingleton<T>(key: string, create: () => T): T {
  const slots = globalThis as unknown as Record<symbol, T | undefined>;
  const symbol = Symbol.for(key);
  return (slots[symbol] ??= create());
}
