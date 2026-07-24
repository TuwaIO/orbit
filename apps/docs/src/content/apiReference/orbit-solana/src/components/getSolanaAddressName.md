[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# getSolanaAddressName()

> **getSolanaAddressName**(`address`): `Promise`\<`string`\>

Defined in: [packages/orbit-solana/src/utils/getSolanaAddressName.ts:66](https://github.com/TuwaIO/orbit/blob/8ec233146b62789dea4760ee3a5c2fa417c0e9cc/packages/orbit-solana/src/utils/getSolanaAddressName.ts#L66)

Searches and returns the account name (label) for a given Solana address.
Priority order:
1. Check cache
2. Try to resolve SNS domain name
3. Fall back to original address

## Parameters

### address

`string`

The Solana account address to look up.

## Returns

`Promise`\<`string`\>

A promise that resolves to the account's name/label, or the original address string if no name is found.
