import { ConnectorType } from '../types';
import { getParsedStorageItem } from './getParsedStorageItem';
import type { WalletMemoryOptions } from './lastConnectedConnectorHelpers';

/**
 * Data structure for a recently connected connector
 *
 * @interface RecentlyConnectedConnectorData
 * @property {string} address - The wallet address that was connected
 * @property {number} disconnectedTimestamp - Unix timestamp in milliseconds when the connector was disconnected
 * @property {string} [icon] - Optional icon URL or identifier for the connector
 */
export type RecentlyConnectedConnectorData = {
  address: string;
  disconnectedTimestamp: number;
  icon?: string;
};

/**
 * Record mapping connector types to their recently connected data
 *
 * @type RecentlyConnectedConnectorsList
 */
export type RecentlyConnectedConnectorsList = Record<ConnectorType, RecentlyConnectedConnectorData>;

const LIST_KEY = 'orbit-core:recentlyConnectedConnectorsListHelpers';

const readList = (area: 'localStorage' | 'sessionStorage') =>
  getParsedStorageItem<RecentlyConnectedConnectorsList>(LIST_KEY, area) ?? ({} as RecentlyConnectedConnectorsList);

const writeList = (area: 'localStorage' | 'sessionStorage', list: RecentlyConnectedConnectorsList) =>
  window[area]?.setItem(LIST_KEY, JSON.stringify(list));

const without = (list: RecentlyConnectedConnectorsList, connectorType: ConnectorType) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [connectorType]: _, ...rest } = list;
  return rest as RecentlyConnectedConnectorsList;
};

/**
 * Helper utilities for managing recently connected connectors list with disconnect timestamps
 *
 * @remarks
 * The list is stored under the 'orbit-core:recentlyConnectedConnectorsListHelpers' key: wallets that are remembered in
 * localStorage, wallets kept only until the tab closes in sessionStorage ({@link WalletMemoryOptions}); reading
 * merges both, the sessionStorage entry winning. Functions are safe to use in both browser and SSR environments.
 *
 * The storage contains a record where each key is a ConnectorType and value contains
 * address, disconnectedTimestamp (Unix timestamp in milliseconds), and optional icon for that connector.
 * This allows tracking when each connector was last disconnected for cleanup and sorting purposes.
 *
 * @example
 * ```typescript
 * // Set entire list
 * recentlyConnectedConnectorsListHelpers.setRecentlyConnectedConnectorsList({
 *   'evm:metamask': {
 *     address: '0x123...',
 *     disconnectedTimestamp: Date.now(),
 *     icon: 'metamask-icon.png'
 *   },
 *   'solana:phantom': {
 *     address: 'ABC123...',
 *     disconnectedTimestamp: Date.now() - 3600000, // 1 hour ago
 *     icon: 'phantom-icon.png'
 *   }
 * });
 *
 * // Add single connector
 * recentlyConnectedConnectorsListHelpers.addConnector('evm:walletconnect', {
 *   address: '0x456...',
 *   disconnectedTimestamp: Date.now(),
 *   icon: 'walletconnect-icon.png'
 * });
 *
 * // Remove single connector
 * recentlyConnectedConnectorsListHelpers.removeConnector('evm:metamask');
 * ```
 */
export const recentlyConnectedConnectorsListHelpers = {
  /** Key used for localStorage storage */
  STORAGE_KEY: LIST_KEY,

  /**
   * The current recently connected connectors list, initialized when the module loads.
   * Returns undefined if not set, invalid, or in an SSR context.
   *
   * @readonly
   */
  recentlyConnectedConnectorsList: getParsedStorageItem<RecentlyConnectedConnectorsList>(LIST_KEY),

  /**
   * Stores the complete recently connected connectors list in localStorage.
   * This will overwrite the entire existing list.
   *
   * @param connectors - Complete RecentlyConnectedConnectorsList object
   * @returns undefined in SSR context, void in browser
   *
   * @example
   * ```typescript
   * recentlyConnectedConnectorsListHelpers.setRecentlyConnectedConnectorsList({
   *   'evm:metamask': {
   *     address: '0x123...',
   *     disconnectedTimestamp: Date.now(),
   *     icon: 'metamask.png'
   *   },
   *   'solana:phantom': {
   *     address: 'ABC123...',
   *     disconnectedTimestamp: Date.now() - 1800000 // 30 minutes ago
   *   }
   * });
   * ```
   */
  setRecentlyConnectedConnectorsList: (connectors: RecentlyConnectedConnectorsList) =>
    typeof window !== 'undefined'
      ? window.localStorage.setItem(recentlyConnectedConnectorsListHelpers.STORAGE_KEY, JSON.stringify(connectors))
      : undefined,

  /**
   * Retrieves the current recently connected connectors list from localStorage.
   *
   * @returns The RecentlyConnectedConnectorsList object or undefined if not set or in SSR context
   *
   * @example
   * ```typescript
   * const connectors = recentlyConnectedConnectorsListHelpers.getRecentlyConnectedConnectorsList();
   * if (connectors) {
   *   console.log('Available connectors:', Object.keys(connectors));
   *   // Sort by most recently disconnected
   *   const sorted = Object.entries(connectors)
   *     .sort(([,a], [,b]) => b.disconnectedTimestamp - a.disconnectedTimestamp);
   * }
   * ```
   */
  getRecentlyConnectedConnectorsList: (): RecentlyConnectedConnectorsList | undefined => {
    const remembered = getParsedStorageItem<RecentlyConnectedConnectorsList>(LIST_KEY);
    const session = getParsedStorageItem<RecentlyConnectedConnectorsList>(LIST_KEY, 'sessionStorage');
    if (!remembered && !session) return undefined;
    return { ...remembered, ...session } as RecentlyConnectedConnectorsList;
  },

  /**
   * Adds or updates a single connector in the recently connected connectors list.
   * Preserves existing connectors and only adds/updates the specified one.
   *
   * @param connectorType - The connector type to add/update
   * @param connectorData - The connector data (address, disconnectedTimestamp, and optional icon)
   * @returns undefined in SSR context, void in browser
   *
   * @example
   * ```typescript
   * // Add new connector with current timestamp
   * recentlyConnectedConnectorsListHelpers.addConnector('evm:metamask', {
   *   address: '0x123...',
   *   disconnectedTimestamp: Date.now(),
   *   icon: 'metamask.png'
   * });
   *
   * // Update existing connector with new disconnect time
   * recentlyConnectedConnectorsListHelpers.addConnector('evm:metamask', {
   *   address: '0x456...',
   *   disconnectedTimestamp: Date.now(),
   *   icon: 'new-metamask.png'
   * });
   * ```
   */
  addConnector: (
    connectorType: ConnectorType,
    connectorData: RecentlyConnectedConnectorData,
    options: WalletMemoryOptions = {},
  ) => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    // A remembered wallet goes to localStorage, another one to sessionStorage; it leaves the other list
    const [target, other] =
      (options.remember ?? true)
        ? (['localStorage', 'sessionStorage'] as const)
        : (['sessionStorage', 'localStorage'] as const);
    writeList(target, { ...readList(target), [connectorType]: connectorData });
    const otherList = readList(other);
    if (connectorType in otherList) writeList(other, without(otherList, connectorType));
  },

  /**
   * Removes a single connector from the recently connected connectors list.
   * Preserves all other connectors in the list.
   *
   * @param connectorType - The connector type to remove
   * @returns undefined in SSR context, void in browser
   *
   * @example
   * ```typescript
   * // Remove specific connector
   * recentlyConnectedConnectorsListHelpers.removeConnector('evm:metamask');
   * ```
   */
  removeConnector: (connectorType: ConnectorType) => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    for (const area of ['localStorage', 'sessionStorage'] as const) {
      const list = readList(area);
      if (connectorType in list) writeList(area, without(list, connectorType));
    }
  },

  /**
   * Checks if a specific connector exists in the recently connected connectors list.
   *
   * @param connectorType - The connector type to check
   * @returns true if the connector exists, false otherwise, undefined in SSR context
   *
   * @example
   * ```typescript
   * if (recentlyConnectedConnectorsListHelpers.hasConnector('evm:metamask')) {
   *   console.log('MetaMask was recently connected');
   * }
   * ```
   */
  hasConnector: (connectorType: ConnectorType): boolean | undefined => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const currentList = recentlyConnectedConnectorsListHelpers.getRecentlyConnectedConnectorsList();
    return currentList ? connectorType in currentList : false;
  },

  /**
   * Gets data for a specific connector from the recently connected connectors list.
   *
   * @param connectorType - The connector type to get data for
   * @returns The connector data (including address, disconnectedTimestamp, and optional icon) or undefined if not found or in SSR context
   *
   * @example
   * ```typescript
   * const metamaskData = recentlyConnectedConnectorsListHelpers.getConnector('evm:metamask');
   * if (metamaskData) {
   *   console.log('MetaMask address:', metamaskData.address);
   *   console.log('Disconnected at:', new Date(metamaskData.disconnectedTimestamp));
   *   console.log('MetaMask icon:', metamaskData.icon);
   * }
   * ```
   */
  getConnector: (connectorType: ConnectorType): RecentlyConnectedConnectorData | undefined => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const currentList = recentlyConnectedConnectorsListHelpers.getRecentlyConnectedConnectorsList();
    return currentList?.[connectorType];
  },

  /**
   * Gets the count of recently connected connectors.
   *
   * @returns Number of connectors in the list, 0 in SSR context or if list is empty
   *
   * @example
   * ```typescript
   * const count = recentlyConnectedConnectorsListHelpers.getConnectorCount();
   * console.log(`${count} connectors recently connected`);
   * ```
   */
  getConnectorCount: (): number => {
    if (typeof window === 'undefined') {
      return 0;
    }

    const currentList = recentlyConnectedConnectorsListHelpers.getRecentlyConnectedConnectorsList();
    return currentList ? Object.keys(currentList).length : 0;
  },

  /**
   * Gets recently connected connectors sorted by disconnect time (most recent first).
   * Useful for showing connectors in order of recent usage.
   *
   * @returns Array of [ConnectorType, RecentlyConnectedConnectorData] tuples sorted by disconnectedTimestamp (descending), empty array in SSR context
   *
   * @example
   * ```typescript
   * const sortedConnectors = recentlyConnectedConnectorsListHelpers.getConnectorsSortedByTime();
   * sortedConnectors.forEach(([connectorType, data]) => {
   *   console.log(`${connectorType}: disconnected ${new Date(data.disconnectedTimestamp)}`);
   * });
   * ```
   */
  getConnectorsSortedByTime: (): [ConnectorType, RecentlyConnectedConnectorData][] => {
    if (typeof window === 'undefined') {
      return [];
    }

    const currentList = recentlyConnectedConnectorsListHelpers.getRecentlyConnectedConnectorsList();
    if (!currentList) {
      return [];
    }

    return Object.entries(currentList).sort(([, a], [, b]) => b.disconnectedTimestamp - a.disconnectedTimestamp) as [
      ConnectorType,
      RecentlyConnectedConnectorData,
    ][];
  },

  /**
   * Removes connectors that were disconnected before the specified timestamp.
   * Useful for cleaning up old connector entries.
   *
   * @param beforeTimestamp - Unix timestamp in milliseconds; connectors disconnected before this time will be removed
   * @returns undefined in SSR context, void in browser
   *
   * @example
   * ```typescript
   * // Remove connectors disconnected more than 7 days ago
   * const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
   * recentlyConnectedConnectorsListHelpers.removeConnectorsOlderThan(weekAgo);
   * ```
   */
  removeConnectorsOlderThan: (beforeTimestamp: number) => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    for (const area of ['localStorage', 'sessionStorage'] as const) {
      const list = getParsedStorageItem<RecentlyConnectedConnectorsList>(LIST_KEY, area);
      if (!list) continue;
      const filteredList = Object.fromEntries(
        Object.entries(list).filter(([, data]) => data.disconnectedTimestamp >= beforeTimestamp),
      ) as RecentlyConnectedConnectorsList;
      writeList(area, filteredList);
    }
  },

  /**
   * Removes all recently connected connectors from localStorage.
   *
   * @returns undefined in SSR context, void in browser
   *
   * @example
   * ```typescript
   * // Clear all recently connected connectors
   * recentlyConnectedConnectorsListHelpers.removeRecentlyConnectedConnectorsList();
   * ```
   */
  removeRecentlyConnectedConnectorsList: () =>
    typeof window !== 'undefined'
      ? window.localStorage.removeItem(recentlyConnectedConnectorsListHelpers.STORAGE_KEY)
      : undefined,
};
