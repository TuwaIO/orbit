[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# isAddress()

> **isAddress**(`value`, `type`): `boolean`

Defined in: [packages/orbit-core/src/utils/addressValidation.ts:25](https://github.com/TuwaIO/orbit/blob/86e488cd9a400b8bba5f24385eec4ffd5c12bbb2/packages/orbit-core/src/utils/addressValidation.ts#L25)

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
