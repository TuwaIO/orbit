[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# ChainIdentifierArray

> **ChainIdentifierArray** = readonly (`string` \| `number`)[]

Defined in: [packages/orbit-core/src/types.ts:132](https://github.com/TuwaIO/orbit/blob/ef3cb50bb666621b8a982b514340b0a50fea2c55/packages/orbit-core/src/types.ts#L132)

Array of chain identifiers (replaces IdentifierArray from @wallet-standard/base)
Can contain strings, numbers, or other primitive types

## Example

```typescript
const chainIds: ChainIdentifierArray = ['ethereum', 1, 'solana:mainnet-beta'];
```
