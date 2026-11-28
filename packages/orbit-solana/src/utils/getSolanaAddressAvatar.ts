/**
 * Cache of the answers of the SNS image API, asked only with `snsAvatar`.
 * Key: the `.sol` domain in lowercase, Value: its image URL, or the avatar drawn for it when the API has none.
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

/** Options of {@link getSolanaAddressAvatar} and {@link preloadSolanaAvatar}. */
export interface SolanaAddressAvatarOptions {
  /**
   * Ask the Bonfida SNS image API (`image-api.bonfida.com`) for the picture of a `.sol` domain: the request carries the
   * domain, and whoever shows the picture loads it from the host the API names. Off by default, and then every avatar
   * is drawn here and nothing is sent anywhere.
   */
  snsAvatar?: boolean;
}

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

/** The 32-bit FNV-1a hash of a text, the seed of its avatar. */
const hashOf = (text: string): number => {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
};

/** Numbers in [0, 1) that follow from a seed (mulberry32): one seed always draws one avatar. */
const numbersFrom = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) >>> 0;
  let t = seed;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** The side of the grid of an avatar, in cells. */
const GRID = 5;

const cell = (x: number, y: number) => `<rect x="${x}" y="${y}" width="1" height="1"/>`;

/**
 * Draws the avatar of an address or a domain here, as an SVG `data:` URL: cells of a grid of 5 by 5, mirrored about its
 * middle column, in a hue of the text on a pale ground of the same hue. One text always draws the same avatar.
 *
 * @param identifier The address, case kept, or the domain in lowercase.
 * @returns The `data:image/svg+xml,` URL of the avatar.
 */
const drawAvatar = (identifier: string): string => {
  const next = numbersFrom(hashOf(identifier));
  const hue = Math.floor(next() * 360);
  const cells: string[] = [];
  for (let y = 0; y < GRID; y += 1) {
    for (let x = 0; x < Math.ceil(GRID / 2); x += 1) {
      if (next() < 0.5) continue;
      cells.push(cell(x, y));
      if (x !== GRID - 1 - x) cells.push(cell(GRID - 1 - x, y));
    }
  }
  // A grid with no cell filled would be a plain square
  if (cells.length === 0) cells.push(cell(Math.floor(GRID / 2), Math.floor(GRID / 2)));
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${GRID} ${GRID}" shape-rendering="crispEdges">` +
    `<rect width="${GRID}" height="${GRID}" fill="hsl(${hue}, 45%, 92%)"/>` +
    `<g fill="hsl(${hue}, 55%, 45%)">${cells.join('')}</g></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

/**
 * Returns the avatar of a Solana address or an SNS domain.
 *
 * By default it is drawn here, from the address or domain, and nothing is sent anywhere: an identicon of 5 by 5 cells
 * as an SVG `data:` URL, the same for the same input. With `snsAvatar` the picture of a `.sol` domain is asked of the
 * Bonfida SNS image API (`image-api.bonfida.com`) and kept in memory for the life of the page; a domain without one,
 * or a failed request, gets the drawn avatar. An address has no SNS picture and is always drawn.
 *
 * @param addressOrDomain The Solana address or SNS domain to look up avatar for
 * @param options The lookup to allow: {@link SolanaAddressAvatarOptions}
 * @returns A promise that resolves to the URL of the avatar: a `data:` URL, or with `snsAvatar` the URL of the SNS
 *   picture
 */
export const getSolanaAddressAvatar = async (
  addressOrDomain: string,
  options: SolanaAddressAvatarOptions = {},
): Promise<string> => {
  const trimmedInput = addressOrDomain?.trim() ?? '';
  if (!trimmedInput) {
    return drawAvatar('default');
  }

  // A domain draws the same avatar in any case; an address keeps its case, which base58 needs
  const domain = isValidSNSDomain(trimmedInput) ? trimmedInput.toLowerCase() : null;
  if (!domain || !options.snsAvatar) {
    return drawAvatar(domain ?? trimmedInput);
  }

  const cachedAvatar = solanaAvatarCache.get(domain);
  if (cachedAvatar !== undefined) {
    return cachedAvatar;
  }

  const resultAvatar = (await getSNSAvatar(domain)) ?? drawAvatar(domain);
  solanaAvatarCache.set(domain, resultAvatar);
  return resultAvatar;
};

/**
 * Clears the kept answers of the SNS image API.
 */
export const clearSolanaAvatarCache = (): void => {
  solanaAvatarCache.clear();
};

/**
 * Gets the number of kept answers of the SNS image API.
 */
export const getSolanaAvatarCacheSize = (): number => {
  return solanaAvatarCache.size;
};

/**
 * Preloads avatar for a given address/domain
 *
 * Side effect: with `snsAvatar`, the request of {@link getSolanaAddressAvatar} for a `.sol` domain.
 *
 * @param addressOrDomain The address or domain to preload avatar for
 * @param options The lookup to allow: {@link SolanaAddressAvatarOptions}
 */
export const preloadSolanaAvatar = async (
  addressOrDomain: string,
  options: SolanaAddressAvatarOptions = {},
): Promise<void> => {
  try {
    await getSolanaAddressAvatar(addressOrDomain, options);
  } catch (error) {
    console.warn('Failed to preload avatar:', error);
  }
};
