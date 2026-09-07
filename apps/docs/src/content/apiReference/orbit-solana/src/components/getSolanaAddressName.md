[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# getSolanaAddressName()

> **getSolanaAddressName**(`address`): `Promise`\<`string`\>

Defined in: [packages/orbit-solana/src/utils/getSolanaAddressName.ts:58](https://github.com/TuwaIO/orbit/blob/d4110954ce16280c0b562c8d9e6ad0f6c0a602f2/packages/orbit-solana/src/utils/getSolanaAddressName.ts#L58)

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
