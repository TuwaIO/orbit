# isAddress()

> **isAddress**(`value`, `type?`): `boolean`

Defined in: [utils/addressValidation.ts:25](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/addressValidation.ts#L25)

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
