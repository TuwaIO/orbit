# SolanaAddressAvatarOptions

Defined in: [utils/getSolanaAddressAvatar.ts:20](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/getSolanaAddressAvatar.ts#L20)

Options of [getSolanaAddressAvatar](/packages/orbit-solana/functions/getSolanaAddressAvatar.md) and [preloadSolanaAvatar](/packages/orbit-solana/functions/preloadSolanaAvatar.md).

## Properties

### snsAvatar?

> `optional` **snsAvatar?**: `boolean`

Defined in: [utils/getSolanaAddressAvatar.ts:26](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/getSolanaAddressAvatar.ts#L26)

Ask the Bonfida SNS image API (`image-api.bonfida.com`) for the picture of a `.sol` domain: the request carries the
domain, and whoever shows the picture loads it from the host the API names. Off by default, and then every avatar
is drawn here and nothing is sent anywhere.
