import type { Chain } from 'viem/chains';

/**
 * Type guard to check if a value is a valid EVM chain ID
 */
function isValidEvmChainId(id: unknown): id is number {
  return id !== undefined && id !== null && typeof id === 'number' && id > 0;
}

/**
 * Gets the EVM chain IDs from an app's viem chain configuration.
 *
 * @param appChains - The viem chains configured in the app.
 * @returns The positive numeric chain IDs, or an empty array if no chains are provided.
 */
export function getEvmChains(appChains?: readonly [Chain, ...Chain[]]): number[] {
  if (!appChains || appChains.length === 0) {
    return [];
  }
  return appChains.map((chain) => chain.id).filter(isValidEvmChainId);
}

/**
 * Type guard to check if a chain list contains EVM chain IDs.
 *
 * @param chains - Mixed list of chain identifiers.
 * @returns `true` if the list is non-empty and contains only numbers.
 */
export function isEvmChainList(chains: (string | number)[]): chains is number[] {
  return chains.length > 0 && chains.every((chain) => typeof chain === 'number');
}
