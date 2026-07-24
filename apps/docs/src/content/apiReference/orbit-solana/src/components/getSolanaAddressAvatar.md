[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# getSolanaAddressAvatar()

> **getSolanaAddressAvatar**(`addressOrDomain`): `Promise`\<`string`\>

Defined in: [packages/orbit-solana/src/utils/getSolanaAddressAvatar.ts:89](https://github.com/TuwaIO/orbit/blob/8ec233146b62789dea4760ee3a5c2fa417c0e9cc/packages/orbit-solana/src/utils/getSolanaAddressAvatar.ts#L89)

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
