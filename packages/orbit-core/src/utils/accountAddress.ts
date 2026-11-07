import { OrbitAdapter } from '../types';

/**
 * An account address in the form to compare it in: an EVM address in any case, as its case is only a checksum; any
 * other exactly, as a base58 address in another case is another account.
 *
 * @param namespace - The CAIP-2 namespace of the account, e.g. `eip155` or `solana`.
 * @param address - The address.
 * @returns The address to compare.
 */
export function normalizeAccountAddress(namespace: string, address: string): string {
  return namespace === 'eip155' ? address.toLowerCase() : address;
}

/**
 * Whether two addresses of one namespace are the same account, by {@link normalizeAccountAddress}.
 *
 * @param namespace - The CAIP-2 namespace of both addresses, e.g. `eip155` or `solana`.
 * @param left - One address.
 * @param right - The other address.
 * @returns `true` when they are the same account.
 */
export function isSameAddress(namespace: string, left: string, right: string): boolean {
  return normalizeAccountAddress(namespace, left) === normalizeAccountAddress(namespace, right);
}

/**
 * Whether two addresses of one adapter are the same account: {@link isSameAddress} for what knows its adapter and not its
 * CAIP-2 namespace, such as a transaction.
 *
 * @param adapter - The adapter of both addresses.
 * @param left - One address.
 * @param right - The other address.
 * @returns `true` when they are the same account.
 */
export function isSameAdapterAddress(adapter: OrbitAdapter, left: string, right: string): boolean {
  return isSameAddress(adapter === OrbitAdapter.EVM ? 'eip155' : adapter, left, right);
}
