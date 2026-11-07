/**
 * The storage of the browser, reached safely. A browser that blocks site data throws on reaching `window.localStorage`,
 * not on what is called on it, so a guard on `typeof window` is not enough.
 *
 * @param area - The storage to reach: `localStorage` (default) or `sessionStorage`.
 * @returns The storage, or `null` without a browser or when the browser refuses it.
 */
export function getBrowserStorage(area: 'localStorage' | 'sessionStorage' = 'localStorage'): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    return window[area] ?? null;
  } catch {
    return null;
  }
}

/**
 * Reads a value of the browser's storage. Never throws.
 *
 * @param key - The storage key.
 * @param area - The storage to read: `localStorage` (default) or `sessionStorage`.
 * @returns The value, or `null` when it is not set, without a browser, or when the browser refuses it.
 */
export function readBrowserStorage(
  key: string,
  area: 'localStorage' | 'sessionStorage' = 'localStorage',
): string | null {
  try {
    return getBrowserStorage(area)?.getItem(key) ?? null;
  } catch {
    return null;
  }
}
