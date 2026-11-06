# readBrowserStorage()

> **readBrowserStorage**(`key`, `area?`): `string` \| `null`

Defined in: [utils/browserStorage.ts:24](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/browserStorage.ts#L24)

Reads a value of the browser's storage. Never throws.

## Parameters

### key

`string`

The storage key.

### area?

`"localStorage"` \| `"sessionStorage"` = `'localStorage'`

The storage to read: `localStorage` (default) or `sessionStorage`.

## Returns

`string` \| `null`

The value, or `null` when it is not set, without a browser, or when the browser refuses it.
