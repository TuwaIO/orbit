# getSolanaAddressAvatar()

> **getSolanaAddressAvatar**(`addressOrDomain`): `Promise`\<`string`\>

Defined in: [utils/getSolanaAddressAvatar.ts:81](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/getSolanaAddressAvatar.ts#L81)

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
