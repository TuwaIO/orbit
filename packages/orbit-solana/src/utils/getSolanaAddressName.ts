/**
 * Cache for Solana address lookup results.
 * Key: normalized address (lowercase string), Value: Account name/label (string).
 */
const solanaNameCache = new Map<string, string>();

/**
 * SNS API endpoint for resolving Solana addresses to domain names
 */
const SNS_API_BASE_URL = 'https://sns-api.bonfida.com';

/**
 * Interface for SNS API response
 */
interface SNSApiResponse {
  result: Record<string, string> | null;
}

/**
 * Fetches the SNS domain name for a given Solana address using the SNS API
 *
 * @param address The Solana address to resolve
 * @returns Promise that resolves to the SNS domain name or null if not found
 */
const getSNSName = async (address: string): Promise<string | null> => {
  try {
    const response = await fetch(`${SNS_API_BASE_URL}/v2/user/fav-domains/${address}`);

    if (!response.ok) {
      return null;
    }

    const data: SNSApiResponse = await response.json();

    if (data.result && typeof data.result === 'object' && address in data.result) {
      return data.result[address];
    }

    return null;
  } catch (error) {
    console.warn('Failed to fetch SNS name:', error);
    return null;
  }
};

/**
 * Validates if the provided string is a valid Solana address
 *
 * @param address The string to validate
 * @returns boolean indicating if the address is valid
 */
const isValidSolanaAddress = (address: string): boolean => {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
};

/**
 * Searches and returns the account name (label) for a given Solana address.
 * Priority order:
 * 1. Check cache
 * 2. Try to resolve SNS domain name
 * 3. Fall back to original address
 *
 * @param address The Solana account address to look up.
 * @returns A promise that resolves to the account's name/label, or the original address string if no name is found.
 */
export const getSolanaAddressName = async (address: string): Promise<string> => {
  if (!address) {
    return address || '';
  }

  if (!isValidSolanaAddress(address.trim())) {
    return address;
  }

  // Normalize the address to use as a cache key, ensuring case-insensitivity.
  const normalizedAddress = address.toLowerCase().trim();

  // Check the cache: if the result exists, return it immediately.
  const cachedName = solanaNameCache.get(normalizedAddress);
  if (cachedName !== undefined) {
    return cachedName;
  }

  let resultName = address; // Default fallback

  try {
    const snsName = await getSNSName(address);
    if (snsName) {
      resultName = snsName;
    }
  } catch (error) {
    console.warn('Error resolving address name:', error);
    // resultName остается как оригинальный адрес
  }

  // Store the result in the cache
  solanaNameCache.set(normalizedAddress, resultName);

  return resultName;
};

/**
 * Clears the Solana name cache
 */
export const clearSolanaNameCache = (): void => {
  solanaNameCache.clear();
};

/**
 * Gets the current cache size
 */
export const getSolanaNameCacheSize = (): number => {
  return solanaNameCache.size;
};
