import { ConnectorType } from '../types';
import { getParsedStorageItem } from './getParsedStorageItem';

/**
 * Connection data persisted by {@link lastConnectedConnectorHelpers}.
 */
export type LastConnectedConnector = {
  /** Connector identifier, e.g. "evm:metamask". */
  connectorType: ConnectorType;
  /** Chain the wallet was connected to (numeric EVM chain ID or Solana chain identifier). */
  chainId: number | string;
  /** Connected wallet address, if known. */
  address?: string;
};

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
   * @param data - Connector type, chain ID and optional address of the connected wallet.
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
