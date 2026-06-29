[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# isEnsName()

> **isEnsName**(`nameOrAddress`): `boolean`

Defined in: [packages/orbit-evm/src/utils/ensUtils.ts:127](https://github.com/TuwaIO/orbit/blob/6547ce13d40063a1eef6bd43aa523b45df1b5783/packages/orbit-evm/src/utils/ensUtils.ts#L127)

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
