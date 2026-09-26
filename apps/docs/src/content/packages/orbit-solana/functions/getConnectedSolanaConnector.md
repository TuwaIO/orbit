# getConnectedSolanaConnector()

> **getConnectedSolanaConnector**(): `UiWallet`

Defined in: [utils/getConnectedSolanaConnector.ts:13](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/getConnectedSolanaConnector.ts#L13)

Finds the Wallet Standard wallet that holds the last connected address.
The address is read from `lastConnectedConnectorHelpers` in `@tuwaio/orbit-core` (localStorage) and matched
case-insensitively against the accounts of [getAvailableSolanaConnectors](/packages/orbit-solana/functions/getAvailableSolanaConnectors.md).

## Returns

`UiWallet`

The connected wallet as a `UiWallet`.

## Throws

"Connector not provided. Cannot perform chain check." if no available wallet holds that address.
