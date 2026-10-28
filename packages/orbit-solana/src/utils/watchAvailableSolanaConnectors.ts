import { getWallets } from '@wallet-standard/app';

/**
 * Calls `onChange` whenever a Wallet Standard wallet registers or unregisters, so that a list built with
 * {@link getAvailableSolanaConnectors} can be read again. Wallets can register after the page loads (an extension that
 * injects its script late, a wallet enabled while the page is open), and that list does not update by itself.
 *
 * Subscribes to the `register` and `unregister` events of `getWallets()` from `@wallet-standard/app`. The first
 * `getWallets()` call of the page also dispatches the `wallet-standard:app-ready` event to the wallets and listens for
 * their `wallet-standard:register-wallet` events, as {@link getAvailableSolanaConnectors} does. It does not filter:
 * `onChange` also runs for wallets that {@link getAvailableSolanaConnectors} leaves out. It does not follow the
 * `change` events of the wallets themselves, so a wallet that registers without a required feature and adds it later
 * does not call `onChange`. On the server (no `window`), where no wallet registers, it subscribes to nothing.
 *
 * Each call subscribes on its own: the same `onChange` passed twice runs twice per event, and each returned function
 * stops only its own subscription.
 *
 * @param onChange - Called with no arguments after each registration or unregistration. The registry catches an error
 * it throws and logs it with `console.error`, so it does not reach the wallet that registered.
 * @returns Stops the subscription. The registry keeps its listeners in memory until it is called.
 */
export function watchAvailableSolanaConnectors(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => undefined;
  const wallets = getWallets();
  const offRegister = wallets.on('register', () => onChange());
  const offUnregister = wallets.on('unregister', () => onChange());
  return () => {
    offRegister();
    offUnregister();
  };
}
