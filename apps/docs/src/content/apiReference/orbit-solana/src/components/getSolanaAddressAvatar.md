[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# getSolanaAddressAvatar()

> **getSolanaAddressAvatar**(`addressOrDomain`): `Promise`\<`string`\>

Defined in: [packages/orbit-solana/src/utils/getSolanaAddressAvatar.ts:89](https://github.com/TuwaIO/orbit/blob/dc7f910f503327f4fdf398696c0348c9b3406975/packages/orbit-solana/src/utils/getSolanaAddressAvatar.ts#L89)

Searches and returns the avatar URL for a given Solana address or SNS domain.
Priority order:
1. Check cache
2. If it's a valid SNS domain (.sol), try to get SNS avatar
3. Generate default avatar based on identifier

## Parameters

### addressOrDomain

`string`

The Solana address or SNS domain to look up avatar for

## Returns

`Promise`\<`string`\>

A promise that resolves to the avatar URL
