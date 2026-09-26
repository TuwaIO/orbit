# OrbitGenericAdapter\<A\>

> **OrbitGenericAdapter**\<`A`\> = `object`

Defined in: [types.ts:98](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/types.ts#L98)

Generic type for creating blockchain adapters with type safety.
This type ensures that all adapters implement the required interface
and are properly keyed by their blockchain type.

## Example

```typescript
// Single adapter implementation
interface EVMAdapter extends BaseAdapter {
  key: OrbitAdapter.EVM;
  // EVM-specific methods...
}
const evmConfig: OrbitGenericAdapter<EVMAdapter> = {
  adapter: {
    key: OrbitAdapter.EVM,
    // implementation...
  }
};

// Multiple adapters
const multiChainConfig: OrbitGenericAdapter<EVMAdapter> = {
  adapter: [
    { key: OrbitAdapter.EVM, ... },
    { key: OrbitAdapter.SOLANA, ... }
  ]
};
```

## Type Parameters

### A

`A` *extends* `object`

Type that extends the base adapter interface with a key property

## Properties

### adapter

> **adapter**: `A` \| `A`[]

Defined in: [types.ts:99](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/types.ts#L99)

Single adapter instance or array of adapters
