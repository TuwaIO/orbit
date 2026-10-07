# toCaip2ChainId()

> **toCaip2ChainId**(`chainId`): `` `${string}:${string}` `` \| `undefined`

Defined in: [utils/caip.ts:60](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/caip.ts#L60)

Turns a chain identifier into a CAIP-2 chain ID: EVM chain numbers and their decimal strings become
`eip155:<number>`, every Solana form accepted by [getSolanaChainId](/packages/orbit-core/functions/getSolanaChainId.md) becomes its genesis-hash ID, and a valid
CAIP-2 chain ID is returned as it is.

## Parameters

### chainId

`string` \| `number`

An EVM chain number, a Solana chain in any form, or a CAIP-2 chain ID.

## Returns

`` `${string}:${string}` `` \| `undefined`

The CAIP-2 chain ID, or `undefined` when the value cannot be read as one.

## Example

```typescript
toCaip2ChainId(8453); // "eip155:8453"
toCaip2ChainId('solana:devnet'); // "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1"
toCaip2ChainId('base'); // undefined
```
