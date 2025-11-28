/**
 * Cache for Solana avatar lookup results.
 * Key: normalized address/domain (lowercase string), Value: Avatar URL (string).
 */
const solanaAvatarCache = new Map<string, string>();

/**
 * SNS API endpoint for resolving domain images
 */
const SNS_API_BASE_URL = 'https://image-api.bonfida.com';

/**
 * Interface for SNS Image API response
 */
interface SNSImageApiResponse {
  result: { domain: string; image: string }[];
}

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
 * Validates if the provided string is a valid SNS domain
 *
 * @param domain The string to validate
 * @returns boolean indicating if the domain is valid
 */
const isValidSNSDomain = (domain: string): boolean => {
  return /^[a-z0-9-]+\.sol$/.test(domain.toLowerCase());
};

/**
 * Fetches the avatar image URL for a given SNS domain using the SNS API
 *
 * @param domain The SNS domain to get avatar for (e.g., "example.sol")
 * @returns Promise that resolves to the avatar URL or null if not found
 */
const getSNSAvatar = async (domain: string): Promise<string | null> => {
  try {
    const response = await fetch(`${SNS_API_BASE_URL}/image?domain=${encodeURIComponent(domain)}`);

    if (!response.ok) {
      return null;
    }

    const data: SNSImageApiResponse = await response.json();

    if (data.result && Array.isArray(data.result) && data.result.length > 0) {
      const imageData = data.result.find((item) => item.domain === domain);
      return imageData?.image ?? data.result[0]?.image ?? null;
    }

    return null;
  } catch (error) {
    console.warn('Failed to fetch SNS avatar:', error);
    return null;
  }
};

/**
 * Generates a default avatar URL based on address/domain
 * Using DiceBear API for consistent avatars
 *
 * @param identifier The address or domain to generate avatar for
 * @returns Default avatar URL
 */
const getDefaultAvatar = (identifier: string): string => {
  const seed = encodeURIComponent(identifier);
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}`;
};

/**
 * Searches and returns the avatar URL for a given Solana address or SNS domain.
 * Priority order:
 * 1. Check cache
 * 2. If it's a valid SNS domain (.sol), try to get SNS avatar
 * 3. Generate default avatar based on identifier
 *
 * @param addressOrDomain The Solana address or SNS domain to look up avatar for
 * @returns A promise that resolves to the avatar URL
 */
export const getSolanaAddressAvatar = async (addressOrDomain: string): Promise<string> => {
  if (!addressOrDomain) {
    return getDefaultAvatar('default');
  }

  const trimmedInput = addressOrDomain.trim();

  if (!trimmedInput) {
    return getDefaultAvatar('default');
  }

  // Normalize the input to use as a cache key
  const normalizedInput = trimmedInput.toLowerCase();

  // Check the cache: if the result exists, return it immediately
  const cachedAvatar = solanaAvatarCache.get(normalizedInput);
  if (cachedAvatar !== undefined) {
    return cachedAvatar;
  }

  let resultAvatar: string;

  try {
    if (isValidSNSDomain(trimmedInput)) {
      const snsAvatar = await getSNSAvatar(trimmedInput);
      if (snsAvatar) {
        resultAvatar = snsAvatar;
      } else {
        resultAvatar = getDefaultAvatar(trimmedInput);
      }
    } else if (isValidSolanaAddress(trimmedInput)) {
      resultAvatar = getDefaultAvatar(trimmedInput);
    } else {
      resultAvatar = getDefaultAvatar(trimmedInput);
    }
  } catch (error) {
    console.warn('Error resolving avatar:', error);
    resultAvatar = getDefaultAvatar(trimmedInput);
  }

  // Store the result in the cache
  solanaAvatarCache.set(normalizedInput, resultAvatar);

  return resultAvatar;
};

/**
 * Clears the Solana avatar cache
 */
export const clearSolanaAvatarCache = (): void => {
  solanaAvatarCache.clear();
};

/**
 * Gets the current avatar cache size
 */
export const getSolanaAvatarCacheSize = (): number => {
  return solanaAvatarCache.size;
};

/**
 * Preloads avatar for a given address/domain
 *
 * @param addressOrDomain The address or domain to preload avatar for
 */
export const preloadSolanaAvatar = async (addressOrDomain: string): Promise<void> => {
  try {
    await getSolanaAddressAvatar(addressOrDomain);
  } catch (error) {
    console.warn('Failed to preload avatar:', error);
  }
};
