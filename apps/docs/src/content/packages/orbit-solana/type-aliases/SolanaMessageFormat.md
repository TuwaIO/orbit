# SolanaMessageFormat

> **SolanaMessageFormat** = `"auto"` \| `"message"` \| `"offchainMessage"`

Defined in: [utils/createSolanaMessageSigner.ts:28](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/createSolanaMessageSigner.ts#L28)

How [createSolanaMessageSigner](/packages/orbit-solana/functions/createSolanaMessageSigner.md) has the wallet sign:

- `'auto'` (default): the UTF-8 bytes of the message, or its version 1 off-chain message when the account lists
  `solana:signOffchainMessage` but not `solana:signMessage` (as hardware wallet accounts may), or when the target
  has no other way to sign;
- `'message'`: always the UTF-8 bytes;
- `'offchainMessage'`: always the version 1 off-chain message (`solana:signOffchainMessage`, or a
  `signOffchainMessage(message)` method such as the one of `useWallet()` from `@solana/wallet-adapter` v3).

`@tuwaio/siwx-solana` and `@tuwaio/siwx-server` verify both for SIWX.
