# getSolanaAddressAvatar()

> **getSolanaAddressAvatar**(`addressOrDomain`, `options?`): `Promise`\<`string`\>

Defined in: [utils/getSolanaAddressAvatar.ts:131](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/getSolanaAddressAvatar.ts#L131)

Returns the avatar of a Solana address or an SNS domain.

By default it is drawn here, from the address or domain, and nothing is sent anywhere: an identicon of 5 by 5 cells
as an SVG `data:` URL, the same for the same input. With `snsAvatar` the picture of a `.sol` domain is asked of the
Bonfida SNS image API (`image-api.bonfida.com`) and kept in memory for the life of the page; a domain without one,
or a failed request, gets the drawn avatar. An address has no SNS picture and is always drawn.

## Parameters

### addressOrDomain

`string`

The Solana address or SNS domain to look up avatar for

### options?

[`SolanaAddressAvatarOptions`](/packages/orbit-solana/interfaces/SolanaAddressAvatarOptions.md) = `{}`

The lookup to allow: [SolanaAddressAvatarOptions](/packages/orbit-solana/interfaces/SolanaAddressAvatarOptions.md)

## Returns

`Promise`\<`string`\>

A promise that resolves to the URL of the avatar: a `data:` URL, or with `snsAvatar` the URL of the SNS
  picture
