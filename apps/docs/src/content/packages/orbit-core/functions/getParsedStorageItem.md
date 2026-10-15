# getParsedStorageItem()

> **getParsedStorageItem**\<`ReturnType`\>(`key`, `area?`): `ReturnType` \| `undefined`

Defined in: [utils/getParsedStorageItem.ts:8](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/getParsedStorageItem.ts#L8)

Internal function for safely retrieving and parsing data from localStorage or sessionStorage.

## Type Parameters

### ReturnType

`ReturnType`

## Parameters

### key

`string`

The storage key

### area?

`"localStorage"` \| `"sessionStorage"` = `'localStorage'`

The storage to read: `localStorage` (default) or `sessionStorage`

## Returns

`ReturnType` \| `undefined`

The parsed value or undefined if data is not found/invalid, or in an SSR context
