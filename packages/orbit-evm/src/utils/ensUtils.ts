/**
 * @file This file contains utility functions for interacting with the Ethereum Name Service (ENS).
 * It provides methods for resolving names to addresses, addresses to names, and fetching avatars,
 * all specifically targeting the Ethereum Mainnet where ENS is deployed.
 */

import { Address, Client, createClient, Hex, http, isAddress, Transport } from 'viem';
import { getEnsAddress, getEnsAvatar, getEnsName } from 'viem/actions';
import { Chain, mainnet } from 'viem/chains';

const nameCache = new Map<Hex, string | null>();
const avatarCache = new Map<string, string | null>();
const addressCache = new Map<string, Address | null>();

let ensClient: Client<Transport, Chain> | undefined;

// -------------------

// A single, shared viem client for all ENS lookups.
// ENS lookups are always performed against Ethereum Mainnet, regardless of the app's connected chain.
// It is a bare client: the ENS actions take it as an argument, so an app does not bundle every public action of viem.
const createENSClient = (chains: readonly [Chain, ...Chain[]]) => {
  const chain = chains.find((c) => c.id === mainnet.id) ?? mainnet;
  if (ensClient?.chain.rpcUrls.default.http[0] !== chain.rpcUrls.default.http[0]) {
    ensClient = createClient({ chain, transport: http() });
  }
  return ensClient;
};

// Loaded on demand: the ENS normalization tables are large and only needed once there is a name to look up.
// `viem/ens` must stay out of the static imports of this file, or bundlers keep the tables in the main chunk.
const normalizeName = async (name: string) => (await import('viem/ens')).normalize(name);

/**
 * Fetches the primary ENS name for a given Ethereum address from the Ethereum Mainnet.
 * Includes caching for performance.
 *
 * @param {Hex} address - The Ethereum address to look up.
 * @param {readonly [Chain, ...Chain[]]} chains - The list of chains to use for client creation.
 * @returns {Promise<string | null>} The ENS name if found, otherwise null.
 */
export const getName = async (address: Hex, chains: readonly [Chain, ...Chain[]]): Promise<string | null> => {
  const client = createENSClient(chains);

  const cachedName = nameCache.get(address);
  if (cachedName !== undefined) {
    return cachedName;
  }

  try {
    const name = await getEnsName(client, { address });
    nameCache.set(address, name);
    return name;
  } catch (error) {
    console.error(`ENS name lookup failed for address ${address}:`, error);
    return null;
  }
};

/**
 * Fetches the avatar URL for a given ENS name from the Ethereum Mainnet.
 * Includes caching for performance. The first call loads the ENS normalization tables with a dynamic import of
 * `viem/ens`.
 *
 * @param {string} name - The ENS name (e.g., 'vitalik.eth').
 * @param {readonly [Chain, ...Chain[]]} chains - The list of chains to use for client creation.
 * @returns {Promise<string | null>} The URL of the avatar image if found, otherwise null.
 * @throws {Error} When the name cannot be normalized or the normalization tables fail to load.
 */
export const getAvatar = async (name: string, chains: readonly [Chain, ...Chain[]]): Promise<string | null> => {
  const client = createENSClient(chains);
  const normalizedName = await normalizeName(name);

  const cachedAvatar = avatarCache.get(normalizedName);
  if (cachedAvatar !== undefined) {
    return cachedAvatar;
  }

  try {
    const avatarUrl = await getEnsAvatar(client, { name: normalizedName });
    avatarCache.set(normalizedName, avatarUrl);
    return avatarUrl;
  } catch (error) {
    console.error(`ENS avatar lookup failed for name ${name}:`, error);
    return null;
  }
};

/**
 * Fetches the Ethereum address associated with a given ENS name from the Ethereum Mainnet.
 * Includes caching for performance. The first call loads the ENS normalization tables with a dynamic import of
 * `viem/ens`.
 *
 * @param {string} name - The ENS name to resolve (e.g., 'vitalik.eth').
 * @param {readonly [Chain, ...Chain[]]} chains - The list of chains to use for client creation.
 * @returns {Promise<Address | null>} The associated Ethereum address (lowercase) or null if not found.
 * @throws {Error} When the name cannot be normalized or the normalization tables fail to load.
 */
export const getAddress = async (name: string, chains: readonly [Chain, ...Chain[]]): Promise<Address | null> => {
  const client = createENSClient(chains);
  const normalizedName = await normalizeName(name);

  const cachedAddress = addressCache.get(normalizedName);
  if (cachedAddress !== undefined) {
    return cachedAddress;
  }

  try {
    const address = await getEnsAddress(client, { name: normalizedName });
    const lowercasedAddress = address ? (address.toLowerCase() as Address) : null;
    addressCache.set(normalizedName, lowercasedAddress);
    return lowercasedAddress;
  } catch (error) {
    console.error(`ENS address lookup failed for name ${name}:`, error);
    return null;
  }
};

/**
 * A heuristic to check if a string is likely an ENS name.
 *
 * This is not a foolproof validation but a quick check. A valid ENS name
 * must contain at least one dot and should not be a valid Ethereum address.
 *
 * @param {string} nameOrAddress - The string to check.
 * @returns {boolean} True if the string is likely an ENS name.
 *
 * @example
 * isEnsName('vitalik.eth') // true
 * isEnsName('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045') // false
 * isEnsName('notanaddress') // false (doesn't contain a dot)
 */
export const isEnsName = (nameOrAddress: string): boolean => {
  return nameOrAddress.includes('.') && !isAddress(nameOrAddress);
};
