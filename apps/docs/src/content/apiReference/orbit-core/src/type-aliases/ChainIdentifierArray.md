[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# ChainIdentifierArray

> **ChainIdentifierArray** = readonly (`string` \| `number`)[]

Defined in: [packages/orbit-core/src/types.ts:132](https://github.com/TuwaIO/orbit/blob/61dbecfca6dae4f0893a5c7e58fd9c435a95a63d/packages/orbit-core/src/types.ts#L132)

Array of chain identifiers (replaces IdentifierArray from @wallet-standard/base)
Can contain strings, numbers, or other primitive types

## Example

```typescript
const chainIds: ChainIdentifierArray = ['ethereum', 1, 'solana:mainnet-beta'];
```
