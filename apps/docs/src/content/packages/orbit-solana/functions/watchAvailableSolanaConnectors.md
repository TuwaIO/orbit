# watchAvailableSolanaConnectors()

> **watchAvailableSolanaConnectors**(`onChange`): () => `void`

Defined in: [utils/watchAvailableSolanaConnectors.ts:22](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/watchAvailableSolanaConnectors.ts#L22)

Calls `onChange` whenever a Wallet Standard wallet registers or unregisters, so that a list built with
[getAvailableSolanaConnectors](/packages/orbit-solana/functions/getAvailableSolanaConnectors.md) can be read again. Wallets can register after the page loads (an extension that
injects its script late, a wallet enabled while the page is open), and that list does not update by itself.

Subscribes to the `register` and `unregister` events of `getWallets()` from `@wallet-standard/app`. The first
`getWallets()` call of the page also dispatches the `wallet-standard:app-ready` event to the wallets and listens for
their `wallet-standard:register-wallet` events, as [getAvailableSolanaConnectors](/packages/orbit-solana/functions/getAvailableSolanaConnectors.md) does. It does not filter:
`onChange` also runs for wallets that [getAvailableSolanaConnectors](/packages/orbit-solana/functions/getAvailableSolanaConnectors.md) leaves out. It does not follow the
`change` events of the wallets themselves, so a wallet that registers without a required feature and adds it later
does not call `onChange`. On the server (no `window`), where no wallet registers, it subscribes to nothing.

Each call subscribes on its own: the same `onChange` passed twice runs twice per event, and each returned function
stops only its own subscription.

## Parameters

### onChange

() => `void`

Called with no arguments after each registration or unregistration. The registry catches an error
it throws and logs it with `console.error`, so it does not reach the wallet that registered.

## Returns

Stops the subscription. The registry keeps its listeners in memory until it is called.

() => `void`
