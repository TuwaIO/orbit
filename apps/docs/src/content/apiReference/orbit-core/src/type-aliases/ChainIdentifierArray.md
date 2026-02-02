[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# ChainIdentifierArray

> **ChainIdentifierArray** = readonly (`string` \| `number`)[]

Defined in: [packages/orbit-core/src/types.ts:132](https://github.com/TuwaIO/orbit/blob/a442b1caa07b3007022f08b6a810dd614762d71e/packages/orbit-core/src/types.ts#L132)

Array of chain identifiers (replaces IdentifierArray from @wallet-standard/base)
Can contain strings, numbers, or other primitive types

## Example

```typescript
const chainIds: ChainIdentifierArray = ['ethereum', 1, 'solana:mainnet-beta'];
```
