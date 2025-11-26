[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# recentConnectedConnectorHelpers

> `const` **recentConnectedConnectorHelpers**: `object`

Defined in: [packages/orbit-core/src/utils/recentConnectedConnectorHelpers.ts:13](https://github.com/TuwaIO/orbit/blob/a02ae737d6c6c3bc32f9a45a4139dbb40f4e43bc/packages/orbit-core/src/utils/recentConnectedConnectorHelpers.ts#L13)

Helper utilities for managing the last connected connector state

## Type Declaration

### getRecentConnectedConnector()

> **getRecentConnectedConnector**: () => [`RecentConnectedConnector`](../type-aliases/RecentConnectedConnector.md) \| `undefined`

Retrieves the current last connected connector data from localStorage.

#### Returns

[`RecentConnectedConnector`](../type-aliases/RecentConnectedConnector.md) \| `undefined`

The LastConnectedConnector object or undefined if not set or in SSR context

### recentConnectedConnector

> **recentConnectedConnector**: [`RecentConnectedConnector`](../type-aliases/RecentConnectedConnector.md) \| `undefined`

The value of the last connected connector, initialized when the module loads.
Returns undefined if not set, invalid, or in an SSR context.

### removeRecentConnectedConnector()

> **removeRecentConnectedConnector**: () => `void`

Removes the last connected connector data from localStorage.

#### Returns

`void`

undefined in SSR context, void in browser

### setRecentConnectedConnector()

> **setRecentConnectedConnector**: (`connectors`) => `void`

Stores the last connected connector data in localStorage.

#### Parameters

##### connectors

[`RecentConnectedConnector`](../type-aliases/RecentConnectedConnector.md)

RecentConnectedConnector

#### Returns

`void`

undefined in SSR context, void in browser

### STORAGE\_KEY

> **STORAGE\_KEY**: `string` = `'orbit-core:recentConnectedConnector'`

## Remarks

All data is stored in localStorage with the 'orbit-core:lastConnectedConnector' key.
Functions are safe to use in both browser and SSR environments.
