# getAvailableSolanaConnectors()

> **getAvailableSolanaConnectors**(): `UiWallet`[]

Defined in: [utils/getAvailableSolanaConnectors.ts:15](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/getAvailableSolanaConnectors.ts#L15)

Lists the Solana wallets registered through the Wallet Standard that Orbit can work with.

A wallet is included only if it supports `standard:connect`, `standard:disconnect`, `standard:events`,
`solana:signAndSendTransaction`, `solana:signTransaction` and `solana:signMessage`, and every chain it
declares is a `solana:*` chain. Wallets registered more than once are deduplicated by name.

## Returns

`UiWallet`[]

The matching wallets as `UiWallet` objects from `@wallet-standard/ui-registry`
(empty on the server, where no wallets are registered).
