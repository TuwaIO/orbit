[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# lastConnectedWalletHelpers

> `const` **lastConnectedWalletHelpers**: `object`

Defined in: [packages/orbit-core/src/utils/lastConnectedWalletHelpers.ts:13](https://github.com/TuwaIO/orbit/blob/a902995532cb7705561cfaf0951d316b084413ee/packages/orbit-core/src/utils/lastConnectedWalletHelpers.ts#L13)

Helper utilities for managing the last connected wallet state

## Type Declaration

### getLastConnectedWallet()

> **getLastConnectedWallet**: () => `LastConnectedWallet` \| `undefined`

Retrieves the current last connected wallet data from localStorage.

#### Returns

`LastConnectedWallet` \| `undefined`

The LastConnectedWallet object or undefined if not set or in SSR context

### lastConnectedWallet

> **lastConnectedWallet**: `LastConnectedWallet` \| `undefined`

The value of the last connected wallet, initialized when the module loads.
Returns undefined if not set, invalid, or in an SSR context.

### removeLastConnectedWallet()

> **removeLastConnectedWallet**: () => `void`

Removes the last connected wallet data from localStorage.

#### Returns

`void`

undefined in SSR context, void in browser

### setLastConnectedWallet()

> **setLastConnectedWallet**: (`data`) => `void`

Stores the last connected wallet data in localStorage.

#### Parameters

##### data

`LastConnectedWallet`

Object containing the wallet type and chain ID.

#### Returns

`void`

undefined in SSR context, void in browser

### STORAGE\_KEY

> **STORAGE\_KEY**: `string` = `'orbit-core:lastConnectedWallet'`

## Remarks

All data is stored in localStorage with the 'orbit-core:lastConnectedWallet' key.
Functions are safe to use in both browser and SSR environments.
