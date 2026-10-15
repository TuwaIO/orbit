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
 * Where a connection is kept: `remember: true` keeps it in localStorage until the wallet is disconnected (the default,
 * as before), `remember: false` keeps it in sessionStorage until the tab closes, for people who did not ask to
 * remember the wallet.
 */
export type WalletMemoryOptions = {
  /** Keep the connection after the tab closes. Defaults to `true`. */
  remember?: boolean;
};

const KEY = 'orbit-core:lastConnectedConnector';

const readLast = () =>
  getParsedStorageItem<LastConnectedConnector>(KEY, 'sessionStorage') ??
  getParsedStorageItem<LastConnectedConnector>(KEY);

/**
 * Helper utilities for managing the last connected wallet state
 *
 * @remarks
 * The data is stored under the 'orbit-core:lastConnectedConnector' key: in localStorage for a remembered wallet, in
 * sessionStorage for one that is kept only until the tab closes ({@link WalletMemoryOptions}). A value in
 * sessionStorage takes precedence when reading. Functions are safe to use in both browser and SSR environments.
 */
export const lastConnectedConnectorHelpers = {
  // Key used for localStorage and sessionStorage
  STORAGE_KEY: KEY,

  /**
   * The value of the last connected wallet, initialized when the module loads.
   * Returns undefined if not set, invalid, or in an SSR context.
   */
  lastConnectedConnector: readLast(),

  /**
   * Stores the last connected wallet data: in localStorage when it is remembered (the default), otherwise in
   * sessionStorage; the copy in the other storage is removed.
   *
   * @param data - Connector type, chain ID and optional address of the connected wallet.
   * @param options - Whether the wallet is remembered after the tab closes.
   * @returns undefined in SSR context, void in browser
   */
  setLastConnectedConnector: (
    { connectorType, chainId, address }: LastConnectedConnector,
    options: WalletMemoryOptions = {},
  ) => {
    if (typeof window === 'undefined') return undefined;
    const remember = options.remember ?? true;
    const [target, other] = remember
      ? [window.localStorage, window.sessionStorage]
      : [window.sessionStorage, window.localStorage];
    target?.setItem(KEY, JSON.stringify({ connectorType, chainId, address }));
    other?.removeItem(KEY);
  },

  /**
   * Retrieves the current last connected wallet data, from sessionStorage first, then from localStorage.
   *
   * @returns The LastConnectedConnector object or undefined if not set or in SSR context
   */
  getLastConnectedConnector: () => readLast(),

  /**
   * Whether the last connection is remembered after the tab closes.
   *
   * @returns `true` when it is in localStorage, `false` when it is in sessionStorage, undefined when there is none
   */
  isLastConnectedConnectorRemembered: (): boolean | undefined => {
    if (getParsedStorageItem<LastConnectedConnector>(KEY, 'sessionStorage')) return false;
    if (getParsedStorageItem<LastConnectedConnector>(KEY)) return true;
    return undefined;
  },

  /**
   * Removes the last connected wallet data from localStorage and sessionStorage.
   *
   * @returns undefined in SSR context, void in browser
   */
  removeLastConnectedConnector: () => {
    if (typeof window === 'undefined') return undefined;
    window.localStorage.removeItem(KEY);
    window.sessionStorage?.removeItem(KEY);
  },
};
