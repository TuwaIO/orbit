[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# isAddress()

> **isAddress**(`value`, `type`): `boolean`

Defined in: [packages/orbit-core/src/utils/addressValidation.ts:25](https://github.com/TuwaIO/orbit/blob/cd205dec44d70155803b7a4b2375469eaeca0357/packages/orbit-core/src/utils/addressValidation.ts#L25)

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
