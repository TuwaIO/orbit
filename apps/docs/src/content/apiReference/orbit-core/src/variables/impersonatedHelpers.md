[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# impersonatedHelpers

> `const` **impersonatedHelpers**: `object`

Defined in: [packages/orbit-core/src/utils/impersonatedHelpers.ts:10](https://github.com/TuwaIO/orbit/blob/48ec02c6fa4f1c668ebc3e0cb0b6820aca00f9ee/packages/orbit-core/src/utils/impersonatedHelpers.ts#L10)

Helper utilities for managing impersonated wallet addresses

## Type Declaration

### getImpersonated()

> **getImpersonated**: () => `string` \| `null` \| `undefined`

Retrieves the current impersonated address from localStorage

#### Returns

`string` \| `null` \| `undefined`

The impersonated address or undefined if not set or in SSR context

#### Example

```typescript
// Get current impersonated address
const address = impersonatedHelpers.getImpersonated();
if (address) {
  console.log('Currently impersonating:', address);
}
```

### impersonatedAddress

> **impersonatedAddress**: `string`

Currently impersonated address from localStorage
Returns empty string if not set or in SSR context

### removeImpersonated()

> **removeImpersonated**: () => `void`

#### Returns

`void`

### setImpersonated()

> **setImpersonated**: (`address`) => `void`

Stores an impersonated address in localStorage

#### Parameters

##### address

`string`

Ethereum or Solana address to impersonate

#### Returns

`void`

undefined in SSR context, void in browser

#### Example

```typescript
// Set impersonated address
impersonatedHelpers.setImpersonated('0x1234...5678');
```

## Remarks

These utilities are primarily used for development and testing purposes.
They provide a way to simulate different wallet addresses without actually connecting a wallet.
All data is stored in localStorage with the 'satellite-connect:impersonatedAddress' key.
Functions are safe to use in both browser and SSR environments.
