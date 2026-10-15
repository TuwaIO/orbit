/**
 * Internal function for safely retrieving and parsing data from localStorage or sessionStorage.
 *
 * @param key - The storage key
 * @param area - The storage to read: `localStorage` (default) or `sessionStorage`
 * @returns The parsed value or undefined if data is not found/invalid, or in an SSR context
 */
export function getParsedStorageItem<ReturnType>(
  key: string,
  area: 'localStorage' | 'sessionStorage' = 'localStorage',
): ReturnType | undefined {
  if (typeof window === 'undefined' || !window[area]) {
    return undefined;
  }

  const item = window[area].getItem(key);

  // If the item is null (not set) or an empty string, return undefined
  if (!item) {
    return undefined;
  }

  try {
    // Safe JSON parsing
    return JSON.parse(item) as ReturnType;
  } catch (error) {
    // In case of a parsing error (e.g., invalid JSON), log the error and return undefined
    console.error(`Error parsing ${key} from ${area}:`, error);
    return undefined;
  }
}
