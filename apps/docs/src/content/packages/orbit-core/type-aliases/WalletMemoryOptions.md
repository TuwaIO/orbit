# WalletMemoryOptions

> **WalletMemoryOptions** = `object`

Defined in: [utils/lastConnectedConnectorHelpers.ts:21](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/lastConnectedConnectorHelpers.ts#L21)

Where a connection is kept: `remember: true` keeps it in localStorage until the wallet is disconnected (the default,
as before), `remember: false` keeps it in sessionStorage until the tab closes, for people who did not ask to
remember the wallet.

## Properties

### remember?

> `optional` **remember?**: `boolean`

Defined in: [utils/lastConnectedConnectorHelpers.ts:23](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/lastConnectedConnectorHelpers.ts#L23)

Keep the connection after the tab closes. Defaults to `true`.
