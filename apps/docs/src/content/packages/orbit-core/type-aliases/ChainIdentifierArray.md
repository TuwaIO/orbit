# ChainIdentifierArray

> **ChainIdentifierArray** = readonly (`string` \| `number`)[]

Defined in: [types.ts:138](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/types.ts#L138)

Array of chain identifiers (replaces IdentifierArray from @wallet-standard/base)
Can contain strings, numbers, or other primitive types

## Example

```typescript
const chainIds: ChainIdentifierArray = ['ethereum', 1, 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'];
```
