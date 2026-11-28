import { isAddress } from '@solana/kit';

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

/** Options of {@link getSolanaAddressName}. */
export interface SolanaAddressNameOptions {
  /**
   * Ask the Bonfida SNS API (`sns-api.bonfida.com`) for the favorite `.sol` domain of the address: the request carries
   * the address. Off by default, and then the function sends nothing and returns the address.
   */
  snsName?: boolean;
}

/**
 * Returns the name (label) of a Solana address: with `snsName`, its favorite SNS (`.sol`) domain.
 *
 * By default nothing is asked and the address itself comes back. With `snsName` the domain is asked of the Bonfida SNS
 * API (`sns-api.bonfida.com`) and kept in memory for the life of the page; an address without one, or a failed
 * request, gets the address back.
 *
 * @param address The Solana account address to look up.
 * @param options The lookup to allow: {@link SolanaAddressNameOptions}
 * @returns A promise that resolves to the account's name/label, or the original address string if no name is found.
 */
export const getSolanaAddressName = async (
  address: string,
  options: SolanaAddressNameOptions = {},
): Promise<string> => {
  if (!address) {
    return address || '';
  }

  const trimmedAddress = address.trim();

  // Without the lookup an address has no name, and nothing leaves the page
  if (!isAddress(trimmedAddress) || !options.snsName) {
    return address;
  }

  // Normalize the address to use as a cache key, ensuring case-insensitivity.
  const normalizedAddress = trimmedAddress.toLowerCase();

  // Check the cache: if the result exists, return it immediately.
  const cachedName = solanaNameCache.get(normalizedAddress);
  if (cachedName !== undefined) {
    return cachedName;
  }

  let resultName = address; // Default fallback

  try {
    const snsName = await getSNSName(trimmedAddress);
    if (snsName) {
      resultName = snsName;
    }
  } catch (error) {
    console.warn('Error resolving address name:', error);
    // resultName remains as original address fallback
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
