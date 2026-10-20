# SolanaMessageSignerTarget

Defined in: [utils/createSolanaMessageSigner.ts:51](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/createSolanaMessageSigner.ts#L51)

What [createSolanaMessageSigner](/packages/orbit-solana/functions/createSolanaMessageSigner.md) signs with: a Wallet Standard `wallet` and `account`, a wallet adapter, or the
value of `useWallet()` from `@solana/wallet-adapter-react` (v1) or `@solana/wallet-adapter` (v3). When `wallet` or
`account` is missing or `null`, the target itself is used in its place.

Every field may be missing or `null`, as in `useWallet()` before a wallet connects: the signer looks for a signing
capability only when it is called, and rejects when it finds none.

## Properties

### account?

> `optional` **account?**: `object` \| `null`

Defined in: [utils/createSolanaMessageSigner.ts:61](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/createSolanaMessageSigner.ts#L61)

The account to sign with, passed to the features of the wallet. Its `address`, `publicKey` and `features` (the
names it supports, or the features themselves) are used when present.

***

### address?

> `optional` **address?**: `string` \| `null`

Defined in: [utils/createSolanaMessageSigner.ts:63](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/createSolanaMessageSigner.ts#L63)

The base58 address of the account (`useWallet()` v3). Used to check the bytes of a signed off-chain message.

***

### publicKey?

> `optional` **publicKey?**: \{ `toBase58`: () => `string`; \} \| `null`

Defined in: [utils/createSolanaMessageSigner.ts:68](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/createSolanaMessageSigner.ts#L68)

The public key of the account (`PublicKey` of `@solana/web3.js`). Used to check the bytes of a signed off-chain
message when no address is given.

***

### signMessage?

> `optional` **signMessage?**: (`message`) => `Promise`\<`Uint8Array`\<`ArrayBufferLike`\> \| \{ `signature`: `Uint8Array`; \}\>

Defined in: [utils/createSolanaMessageSigner.ts:74](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/createSolanaMessageSigner.ts#L74)

Signs the UTF-8 bytes of the message, as the method of a wallet adapter or of `useWallet()`.

#### Parameters

##### message

`Uint8Array`

UTF-8 bytes of the message.

#### Returns

`Promise`\<`Uint8Array`\<`ArrayBufferLike`\> \| \{ `signature`: `Uint8Array`; \}\>

The ed25519 signature, or an object that contains it.

***

### signOffchainMessage?

> `optional` **signOffchainMessage?**: (`message`) => `Promise`\<\{ `signature`: `ReadonlyUint8Array`; `signedOffchainMessage?`: `ReadonlyUint8Array`\<`ArrayBufferLike`\>; \}\>

Defined in: [utils/createSolanaMessageSigner.ts:81](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/createSolanaMessageSigner.ts#L81)

Signs the version 1 off-chain message of the text with the connected account as its only signer, as the method of
`useWallet()` from `@solana/wallet-adapter` v3.

#### Parameters

##### message

`string`

The message text.

#### Returns

`Promise`\<\{ `signature`: `ReadonlyUint8Array`; `signedOffchainMessage?`: `ReadonlyUint8Array`\<`ArrayBufferLike`\>; \}\>

The ed25519 signature and, optionally, the bytes the wallet signed.

***

### wallet?

> `optional` **wallet?**: `object` \| `null`

Defined in: [utils/createSolanaMessageSigner.ts:56](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/createSolanaMessageSigner.ts#L56)

The wallet. Its `solana:signMessage` and `solana:signOffchainMessage` features, its `adapter` and its
`signMessages`, `signMessage` and `signOffchainMessage` methods are used when present.
