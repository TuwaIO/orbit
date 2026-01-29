[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# lastConnectedConnectorHelpers

> `const` **lastConnectedConnectorHelpers**: `object`

Defined in: [packages/orbit-core/src/utils/lastConnectedConnectorHelpers.ts:13](https://github.com/TuwaIO/orbit/blob/b0774dfcb68ffe07fbae3ef0bae9a91eebef950f/packages/orbit-core/src/utils/lastConnectedConnectorHelpers.ts#L13)

Helper utilities for managing the last connected wallet state

## Type Declaration

### getLastConnectedConnector()

> **getLastConnectedConnector**: () => `LastConnectedConnector` \| `undefined`

Retrieves the current last connected wallet data from localStorage.

#### Returns

`LastConnectedConnector` \| `undefined`

The LastConnectedConnector object or undefined if not set or in SSR context

### lastConnectedConnector

> **lastConnectedConnector**: `LastConnectedConnector` \| `undefined`

The value of the last connected wallet, initialized when the module loads.
Returns undefined if not set, invalid, or in an SSR context.

### removeLastConnectedConnector()

> **removeLastConnectedConnector**: () => `void`

Removes the last connected wallet data from localStorage.

#### Returns

`void`

undefined in SSR context, void in browser

### setLastConnectedConnector()

> **setLastConnectedConnector**: (`data`) => `void`

Stores the last connected wallet data in localStorage.

#### Parameters

##### data

`LastConnectedConnector`

Object containing the wallet type and chain ID.

#### Returns

`void`

undefined in SSR context, void in browser

### STORAGE\_KEY

> **STORAGE\_KEY**: `string` = `'orbit-core:lastConnectedConnector'`

## Remarks

All data is stored in localStorage with the 'orbit-core:lastConnectedConnector' key.
Functions are safe to use in both browser and SSR environments.
