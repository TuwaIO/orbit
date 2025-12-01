import { ConnectorType } from '../types';
import { getParsedStorageItem } from './getParsedStorageItem';

type LastConnectedConnector = { connectorType: ConnectorType; chainId: number | string; address?: string };

/**
 * Helper utilities for managing the last connected wallet state
 *
 * @remarks
 * All data is stored in localStorage with the 'orbit-core:lastConnectedConnector' key.
 * Functions are safe to use in both browser and SSR environments.
 */
export const lastConnectedConnectorHelpers = {
  // Key used for localStorage
  STORAGE_KEY: 'orbit-core:lastConnectedConnector',

  /**
   * The value of the last connected wallet, initialized when the module loads.
   * Returns undefined if not set, invalid, or in an SSR context.
   */
  lastConnectedConnector: getParsedStorageItem<LastConnectedConnector>('orbit-core:lastConnectedConnector'),

  /**
   * Stores the last connected wallet data in localStorage.
   *
   * @param data - Object containing the wallet type and chain ID.
   * @returns undefined in SSR context, void in browser
   */
  setLastConnectedConnector: ({ connectorType, chainId, address }: LastConnectedConnector) =>
    typeof window !== 'undefined'
      ? window.localStorage.setItem(
          lastConnectedConnectorHelpers.STORAGE_KEY,
          JSON.stringify({ connectorType, chainId, address }),
        )
      : undefined,

  /**
   * Retrieves the current last connected wallet data from localStorage.
   *
   * @returns The LastConnectedConnector object or undefined if not set or in SSR context
   */
  getLastConnectedConnector: () =>
    getParsedStorageItem<LastConnectedConnector>(lastConnectedConnectorHelpers.STORAGE_KEY),

  /**
   * Removes the last connected wallet data from localStorage.
   *
   * @returns undefined in SSR context, void in browser
   */
  removeLastConnectedConnector: () =>
    typeof window !== 'undefined'
      ? window.localStorage.removeItem(lastConnectedConnectorHelpers.STORAGE_KEY)
      : undefined,
};
