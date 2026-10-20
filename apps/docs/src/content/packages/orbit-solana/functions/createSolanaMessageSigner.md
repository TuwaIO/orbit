# createSolanaMessageSigner()

> **createSolanaMessageSigner**(`target`, `options?`): (`message`) => `Promise`\<`string`\>

Defined in: [utils/createSolanaMessageSigner.ts:286](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/createSolanaMessageSigner.ts#L286)

Creates a function that signs UTF-8 messages with a Solana wallet and returns base58 signatures, for sign-in (SIWX)
and any other message an app asks a wallet to sign. `createSolanaSiwxSigner` of `@tuwaio/siwx-solana` and
`createSolanaMessageSigner` of `@tuwaio/satellite-solana` are built on it.

The signer uses the first capability it finds: the Wallet Standard `solana:signMessage` feature of the wallet (or of
the account), a `signMessages` method, then a legacy `signMessage` method of the wallet, its `adapter`, the account or
the target itself (so a wallet adapter and `useWallet()` of `@solana/wallet-adapter` v1 and v3 can be passed as is).
Methods are called on the object that has them. Accounts that list `solana:signOffchainMessage` but not
`solana:signMessage` (hardware wallet accounts may) sign the version 1 off-chain message of the text instead, and so
does a target with no other way to sign; `options.messageFormat` changes the choice ([SolanaMessageFormat](/packages/orbit-solana/type-aliases/SolanaMessageFormat.md)).
The bytes a wallet returns for an off-chain message are checked against the envelope built with `@solana/kit` when
the signing address is known (`address` or `publicKey` of the account, the wallet or the target).

Side effect: calling the returned function opens the signature prompt of the wallet.

## Parameters

### target

[`SolanaMessageSignerTarget`](/packages/orbit-solana/interfaces/SolanaMessageSignerTarget.md)

The wallet and account to sign with, a wallet adapter or `useWallet()`; see
[SolanaMessageSignerTarget](/packages/orbit-solana/interfaces/SolanaMessageSignerTarget.md).

### options?

[`SolanaMessageSignerOptions`](/packages/orbit-solana/interfaces/SolanaMessageSignerOptions.md) = `{}`

`messageFormat`: `'auto'` (default), `'message'` or `'offchainMessage'`; `errorPrefix`: the start
of the signer's error messages (default `[ORBIT-SOLANA]`).

## Returns

A function that signs `message` and resolves to the base58-encoded signature. It rejects, with messages
that start with `errorPrefix`, with `Invalid signer target.` when `target` is missing,
`Signer lacks known message signing capabilities.` when no capability is found,
`Signer cannot sign off-chain messages.` for `'offchainMessage'` without one,
`Wallet returned invalid signMessage output.`, `… invalid signMessages output.` or
`… invalid signOffchainMessage output.` when the wallet returns no signature,
`Unexpected legacy signMessage result format.` when a legacy `signMessage` returns neither bytes nor
`{ signature }`, `The wallet cannot sign version 1 off-chain messages.` and
`Wallet signed a different off-chain message than requested.` for off-chain messages; and with the error of the
wallet, unchanged, when the user rejects.

(`message`) => `Promise`\<`string`\>

## Example

```ts
import { createSolanaMessageSigner } from '@tuwaio/orbit-solana/signer';

const signMessage = createSolanaMessageSigner({ wallet, account });
const signature = await signMessage('Hello from my app');
```
