# SolanaAddressNameOptions

Defined in: [utils/getSolanaAddressName.ts:49](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/getSolanaAddressName.ts#L49)

Options of [getSolanaAddressName](/packages/orbit-solana/functions/getSolanaAddressName.md).

## Properties

### snsName?

> `optional` **snsName?**: `boolean`

Defined in: [utils/getSolanaAddressName.ts:54](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/getSolanaAddressName.ts#L54)

Ask the Bonfida SNS API (`sns-api.bonfida.com`) for the favorite `.sol` domain of the address: the request carries
the address. Off by default, and then the function sends nothing and returns the address.
