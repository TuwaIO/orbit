/**
 * A URL without the slashes at its end.
 *
 * @param url - The URL.
 * @returns The URL without them.
 */
export function trimTrailingSlashes(url: string): string {
  return url.replace(/\/+$/, '');
}

/**
 * Joins a base URL and a path with one slash, as an explorer URL may end in a slash and a path may start with one.
 *
 * @example
 * ```typescript
 * joinUrlPath('https://etherscan.io/', '/tx/0x1'); // "https://etherscan.io/tx/0x1"
 * ```
 *
 * @param base - The base URL.
 * @param path - The path. Without it the base comes back as it is.
 * @returns The joined URL.
 */
export function joinUrlPath(base: string, path?: string): string {
  return path ? `${trimTrailingSlashes(base)}/${path.replace(/^\/+/, '')}` : base;
}
