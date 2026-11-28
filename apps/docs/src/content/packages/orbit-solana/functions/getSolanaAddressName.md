# getSolanaAddressName()

> **getSolanaAddressName**(`address`, `options?`): `Promise`\<`string`\>

Defined in: [utils/getSolanaAddressName.ts:68](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/getSolanaAddressName.ts#L68)

Returns the name (label) of a Solana address: with `snsName`, its favorite SNS (`.sol`) domain.

By default nothing is asked and the address itself comes back. With `snsName` the domain is asked of the Bonfida SNS
API (`sns-api.bonfida.com`) and kept in memory for the life of the page; an address without one, or a failed
request, gets the address back.

## Parameters

### address

`string`

The Solana account address to look up.

### options?

[`SolanaAddressNameOptions`](/packages/orbit-solana/interfaces/SolanaAddressNameOptions.md) = `{}`

The lookup to allow: [SolanaAddressNameOptions](/packages/orbit-solana/interfaces/SolanaAddressNameOptions.md)

## Returns

`Promise`\<`string`\>

A promise that resolves to the account's name/label, or the original address string if no name is found.
