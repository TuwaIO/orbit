# lastConnectedConnectorHelpers

> `const` **lastConnectedConnectorHelpers**: `object`

Defined in: [utils/lastConnectedConnectorHelpers.ts:40](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/lastConnectedConnectorHelpers.ts#L40)

Helper utilities for managing the last connected wallet state

## Type Declaration

### getLastConnectedConnector

> **getLastConnectedConnector**: () => [`LastConnectedConnector`](/packages/orbit-core/type-aliases/LastConnectedConnector.md) \| `undefined`

Retrieves the current last connected wallet data, from sessionStorage first, then from localStorage.

#### Returns

[`LastConnectedConnector`](/packages/orbit-core/type-aliases/LastConnectedConnector.md) \| `undefined`

The LastConnectedConnector object or undefined if not set or in SSR context

### isLastConnectedConnectorRemembered

> **isLastConnectedConnectorRemembered**: () => `boolean` \| `undefined`

Whether the last connection is remembered after the tab closes.

#### Returns

`boolean` \| `undefined`

`true` when it is in localStorage, `false` when it is in sessionStorage, undefined when there is none

### lastConnectedConnector

> **lastConnectedConnector**: [`LastConnectedConnector`](/packages/orbit-core/type-aliases/LastConnectedConnector.md) \| `undefined`

The value of the last connected wallet, initialized when the module loads.
Returns undefined if not set, invalid, or in an SSR context.

### removeLastConnectedConnector

> **removeLastConnectedConnector**: () => `undefined`

Removes the last connected wallet data from localStorage and sessionStorage.

#### Returns

`undefined`

undefined in SSR context, void in browser

### setLastConnectedConnector

> **setLastConnectedConnector**: (`data`, `options`) => `undefined`

Stores the last connected wallet data: in localStorage when it is remembered (the default), otherwise in
sessionStorage; the copy in the other storage is removed.

#### Parameters

##### data

[`LastConnectedConnector`](/packages/orbit-core/type-aliases/LastConnectedConnector.md)

Connector type, chain ID and optional address of the connected wallet.

##### options?

[`WalletMemoryOptions`](/packages/orbit-core/type-aliases/WalletMemoryOptions.md) = `{}`

Whether the wallet is remembered after the tab closes.

#### Returns

`undefined`

undefined in SSR context, void in browser

### STORAGE\_KEY

> **STORAGE\_KEY**: `string` = `KEY`

## Remarks

The data is stored under the 'orbit-core:lastConnectedConnector' key: in localStorage for a remembered wallet, in
sessionStorage for one that is kept only until the tab closes ([WalletMemoryOptions](/packages/orbit-core/type-aliases/WalletMemoryOptions.md)). A value in
sessionStorage takes precedence when reading. Functions are safe to use in both browser and SSR environments.
