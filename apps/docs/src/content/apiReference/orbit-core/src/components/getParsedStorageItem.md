[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# getParsedStorageItem()

> **getParsedStorageItem**\<`ReturnType`\>(`key`): `ReturnType` \| `undefined`

Defined in: [packages/orbit-core/src/utils/getParsedStorageItem.ts:7](https://github.com/TuwaIO/orbit/blob/efc1769b5130904fb64cb27e939c2baf445b5e8f/packages/orbit-core/src/utils/getParsedStorageItem.ts#L7)

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
