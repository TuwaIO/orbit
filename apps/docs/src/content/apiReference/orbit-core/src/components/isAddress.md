[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# isAddress()

> **isAddress**(`value`, `type`): `boolean`

Defined in: [packages/orbit-core/src/utils/addressValidation.ts:25](https://github.com/TuwaIO/orbit/blob/d157b2ce3ef0f62cb8568b5c51090f9492ffa716/packages/orbit-core/src/utils/addressValidation.ts#L25)

Universal address validation function that supports multiple blockchain formats

## Parameters

### value

`string`

Address string to validate

### type

Optional blockchain type to validate against ('evm' | 'solana' | 'auto')

`"evm"` | `"solana"` | `"auto"`

## Returns

`boolean`

boolean indicating if the address is valid
