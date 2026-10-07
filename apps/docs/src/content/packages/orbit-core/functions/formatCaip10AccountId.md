# formatCaip10AccountId()

> **formatCaip10AccountId**(`chainId`, `address`): `` `${string}:${string}:${string}` `` \| `undefined`

Defined in: [utils/caip.ts:112](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/caip.ts#L112)

Builds a CAIP-10 account ID. The chain is normalized with [toCaip2ChainId](/packages/orbit-core/functions/toCaip2ChainId.md); the address is trimmed, checked
against its chain (`0x` and 40 hex characters for EVM, base58 for Solana) and keeps its case.

## Parameters

### chainId

`string` \| `number`

The chain, in any form accepted by [toCaip2ChainId](/packages/orbit-core/functions/toCaip2ChainId.md).

### address

`string`

The account address.

## Returns

`` `${string}:${string}:${string}` `` \| `undefined`

The CAIP-10 account ID, or `undefined` when the chain or the address is invalid.

## Example

```typescript
formatCaip10AccountId(8453, '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913');
// "eip155:8453:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
formatCaip10AccountId('devnet', '0x1234'); // undefined
```
