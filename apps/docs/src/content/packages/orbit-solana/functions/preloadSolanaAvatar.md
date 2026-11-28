# preloadSolanaAvatar()

> **preloadSolanaAvatar**(`addressOrDomain`, `options?`): `Promise`\<`void`\>

Defined in: [utils/getSolanaAddressAvatar.ts:178](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/getSolanaAddressAvatar.ts#L178)

Preloads avatar for a given address/domain

Side effect: with `snsAvatar`, the request of [getSolanaAddressAvatar](/packages/orbit-solana/functions/getSolanaAddressAvatar.md) for a `.sol` domain.

## Parameters

### addressOrDomain

`string`

The address or domain to preload avatar for

### options?

[`SolanaAddressAvatarOptions`](/packages/orbit-solana/interfaces/SolanaAddressAvatarOptions.md) = `{}`

The lookup to allow: [SolanaAddressAvatarOptions](/packages/orbit-solana/interfaces/SolanaAddressAvatarOptions.md)

## Returns

`Promise`\<`void`\>
