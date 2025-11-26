import { OrbitAdapter } from '../types';
import { getParsedStorageItem } from './getParsedStorageItem';

export type RecentConnectedConnector = Record<OrbitAdapter, Record<string, boolean>>;

/**
 * Helper utilities for managing the last connected connector state
 *
 * @remarks
 * All data is stored in localStorage with the 'orbit-core:lastConnectedConnector' key.
 * Functions are safe to use in both browser and SSR environments.
 */
export const recentConnectedConnectorHelpers = {
  // Key used for localStorage
  STORAGE_KEY: 'orbit-core:recentConnectedConnector',

  /**
   * The value of the last connected connector, initialized when the module loads.
   * Returns undefined if not set, invalid, or in an SSR context.
   */
  recentConnectedConnector: getParsedStorageItem<RecentConnectedConnector>('orbit-core:recentConnectedConnectors'),

  /**
   * Stores the last connected connector data in localStorage.
   *
   * @param connectors - RecentConnectedConnector
   * @returns undefined in SSR context, void in browser
   */
  setRecentConnectedConnector: (connectors: RecentConnectedConnector) =>
    typeof window !== 'undefined'
      ? window.localStorage.setItem(recentConnectedConnectorHelpers.STORAGE_KEY, JSON.stringify(connectors))
      : undefined,

  /**
   * Retrieves the current last connected connector data from localStorage.
   *
   * @returns The LastConnectedConnector object or undefined if not set or in SSR context
   */
  getRecentConnectedConnector: () =>
    getParsedStorageItem<RecentConnectedConnector>(recentConnectedConnectorHelpers.STORAGE_KEY),

  /**
   * Removes the last connected connector data from localStorage.
   *
   * @returns undefined in SSR context, void in browser
   */
  removeRecentConnectedConnector: () =>
    typeof window !== 'undefined'
      ? window.localStorage.removeItem(recentConnectedConnectorHelpers.STORAGE_KEY)
      : undefined,
};
