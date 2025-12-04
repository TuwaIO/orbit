[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# getParsedStorageItem()

> **getParsedStorageItem**\<`ReturnType`\>(`key`): `ReturnType` \| `undefined`

Defined in: [packages/orbit-core/src/utils/getParsedStorageItem.ts:7](https://github.com/TuwaIO/orbit/blob/dfc2d9753f883b7890b3c7f42a8d51292562e725/packages/orbit-core/src/utils/getParsedStorageItem.ts#L7)

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
