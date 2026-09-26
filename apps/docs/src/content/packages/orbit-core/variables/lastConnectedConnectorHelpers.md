# lastConnectedConnectorHelpers

> `const` **lastConnectedConnectorHelpers**: `object`

Defined in: [utils/lastConnectedConnectorHelpers.ts:23](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/lastConnectedConnectorHelpers.ts#L23)

Helper utilities for managing the last connected wallet state

## Type Declaration

### getLastConnectedConnector

> **getLastConnectedConnector**: () => [`LastConnectedConnector`](/packages/orbit-core/type-aliases/LastConnectedConnector.md) \| `undefined`

Retrieves the current last connected wallet data from localStorage.

#### Returns

[`LastConnectedConnector`](/packages/orbit-core/type-aliases/LastConnectedConnector.md) \| `undefined`

The LastConnectedConnector object or undefined if not set or in SSR context

### lastConnectedConnector

> **lastConnectedConnector**: [`LastConnectedConnector`](/packages/orbit-core/type-aliases/LastConnectedConnector.md) \| `undefined`

The value of the last connected wallet, initialized when the module loads.
Returns undefined if not set, invalid, or in an SSR context.

### removeLastConnectedConnector

> **removeLastConnectedConnector**: () => `void`

Removes the last connected wallet data from localStorage.

#### Returns

`void`

undefined in SSR context, void in browser

### setLastConnectedConnector

> **setLastConnectedConnector**: (`data`) => `void`

Stores the last connected wallet data in localStorage.

#### Parameters

##### data

[`LastConnectedConnector`](/packages/orbit-core/type-aliases/LastConnectedConnector.md)

Connector type, chain ID and optional address of the connected wallet.

#### Returns

`void`

undefined in SSR context, void in browser

### STORAGE\_KEY

> **STORAGE\_KEY**: `string` = `'orbit-core:lastConnectedConnector'`

## Remarks

All data is stored in localStorage with the 'orbit-core:lastConnectedConnector' key.
Functions are safe to use in both browser and SSR environments.
