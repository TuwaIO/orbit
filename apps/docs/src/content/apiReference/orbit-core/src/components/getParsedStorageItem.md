[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# getParsedStorageItem()

> **getParsedStorageItem**\<`ReturnType`\>(`key`): `ReturnType` \| `undefined`

Defined in: [packages/orbit-core/src/utils/getParsedStorageItem.ts:7](https://github.com/TuwaIO/orbit/blob/a60eb355f5e79ce90476362d16e4e5281c7f8c57/packages/orbit-core/src/utils/getParsedStorageItem.ts#L7)

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
