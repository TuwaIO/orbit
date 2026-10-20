# SolanaMessageSignerOptions

Defined in: [utils/createSolanaMessageSigner.ts:33](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/createSolanaMessageSigner.ts#L33)

Options of [createSolanaMessageSigner](/packages/orbit-solana/functions/createSolanaMessageSigner.md).

## Properties

### errorPrefix?

> `optional` **errorPrefix?**: `string`

Defined in: [utils/createSolanaMessageSigner.ts:40](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/createSolanaMessageSigner.ts#L40)

Starts the message of every error the signer throws itself, followed by a space. Defaults to `[ORBIT-SOLANA]`;
packages that wrap the signer pass their own (`[SATELLITE-SOLANA]`, `[SIWX-SOLANA]`).

***

### messageFormat?

> `optional` **messageFormat?**: [`SolanaMessageFormat`](/packages/orbit-solana/type-aliases/SolanaMessageFormat.md)

Defined in: [utils/createSolanaMessageSigner.ts:35](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/createSolanaMessageSigner.ts#L35)

How the wallet signs. Defaults to `'auto'`; see [SolanaMessageFormat](/packages/orbit-solana/type-aliases/SolanaMessageFormat.md).
