# getBrowserStorage()

> **getBrowserStorage**(`area?`): `Storage` \| `null`

Defined in: [utils/browserStorage.ts:8](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/browserStorage.ts#L8)

The storage of the browser, reached safely. A browser that blocks site data throws on reaching `window.localStorage`,
not on what is called on it, so a guard on `typeof window` is not enough.

## Parameters

### area?

`"localStorage"` \| `"sessionStorage"` = `'localStorage'`

The storage to reach: `localStorage` (default) or `sessionStorage`.

## Returns

`Storage` \| `null`

The storage, or `null` without a browser or when the browser refuses it.
