[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# isEnsName()

> **isEnsName**(`nameOrAddress`): `boolean`

Defined in: [packages/orbit-evm/src/utils/ensUtils.ts:115](https://github.com/TuwaIO/orbit/blob/aaad6dba9ca155bdc6521e22b29ff003d5c8cf1f/packages/orbit-evm/src/utils/ensUtils.ts#L115)

A heuristic to check if a string is likely an ENS name.

This is not a foolproof validation but a quick check. A valid ENS name
must contain at least one dot and should not be a valid Ethereum address.

## Parameters

### nameOrAddress

`string`

The string to check.

## Returns

`boolean`

True if the string is likely an ENS name.

## Example

```ts
isEnsName('vitalik.eth') // true
isEnsName('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045') // false
isEnsName('notanaddress') // false (doesn't contain a dot)
```
