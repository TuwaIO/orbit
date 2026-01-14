[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# getParsedStorageItem()

> **getParsedStorageItem**\<`ReturnType`\>(`key`): `ReturnType` \| `undefined`

Defined in: [packages/orbit-core/src/utils/getParsedStorageItem.ts:7](https://github.com/TuwaIO/orbit/blob/545146a037a2e11e27e3dee9a35b2a611f731140/packages/orbit-core/src/utils/getParsedStorageItem.ts#L7)

Internal function for safely retrieving and parsing data from localStorage.

## Type Parameters

### ReturnType

`ReturnType`

## Parameters

### key

`string`

The key for localStorage

## Returns

`ReturnType` \| `undefined`

The parsed LastConnectedConnector object or undefined if data is not found/invalid
