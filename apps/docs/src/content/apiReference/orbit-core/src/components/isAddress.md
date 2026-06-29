[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# isAddress()

> **isAddress**(`value`, `type?`): `boolean`

Defined in: [packages/orbit-core/src/utils/addressValidation.ts:25](https://github.com/TuwaIO/orbit/blob/5f1ccbcb82c624b80f26ed4f0e0857cee2b3844f/packages/orbit-core/src/utils/addressValidation.ts#L25)

Universal address validation function that supports multiple blockchain formats

## Parameters

### value

`string`

Address string to validate

### type?

`"evm"` \| `"solana"` \| `"auto"`

Optional blockchain type to validate against ('evm' | 'solana' | 'auto')

## Returns

`boolean`

boolean indicating if the address is valid
