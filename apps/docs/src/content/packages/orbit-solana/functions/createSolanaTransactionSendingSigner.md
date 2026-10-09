# createSolanaTransactionSendingSigner()

> **createSolanaTransactionSendingSigner**(`uiWalletAccount`, `cluster`): `TransactionSendingSigner`\<`string`\>

Defined in: [utils/createSolanaTransactionSendingSigner.ts:54](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/createSolanaTransactionSendingSigner.ts#L54)

Creates an `@solana/kit` `TransactionSendingSigner` for a Wallet Standard account, without a UI framework: the
signer asks the wallet of the account to sign and send transactions with its `solana:signAndSendTransaction`
feature. Pass it wherever Kit expects a sending signer, for example to `signAndSendSolanaTx` of
`@tuwaio/pulsar-solana` or to `signAndSendTransactionMessageWithSigners`. It does the same as
`useWalletAccountTransactionSendingSigner` of `@solana/react`, so React apps do not need that package.

Several transactions are sent in one wallet request. `minContextSlot` from the call config is passed to the wallet;
an `abortSignal` rejects the call (the wallet prompt itself cannot be cancelled).

## Parameters

### uiWalletAccount

`UiWalletAccount`

The account, as a `UiWalletAccount` handle from `@wallet-standard/ui-registry` (for example
`connectedAccount` of a Satellite Connect Solana connection).

### cluster

`string`

The cluster in any form: a moniker (`devnet`, `mainnet-beta`), a Wallet Standard chain
(`solana:devnet`) or a CAIP-2 chain ID with the genesis hash. The wallet receives the Wallet Standard chain
(`solana:devnet`, `solana:mainnet`).

## Returns

`TransactionSendingSigner`\<`string`\>

The signer, with the account address as `address`.

## Throws

When the account does not list the chain of `cluster` or the `solana:signAndSendTransaction`
feature. The signer's `signAndSendTransactions` rejects with the wallet's error, or with the abort reason.

## Example

```ts
import { createSolanaTransactionSendingSigner } from '@tuwaio/orbit-solana';

const signer = createSolanaTransactionSendingSigner(connection.connectedAccount, connection.chainId);
```
