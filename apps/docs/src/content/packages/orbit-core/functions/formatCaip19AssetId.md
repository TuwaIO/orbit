# formatCaip19AssetId()

> **formatCaip19AssetId**(`chainId`, `assetNamespace`, `assetReference`): `` `${string}:${string}/${string}:${string}` `` \| `undefined`

Defined in: [utils/caip.ts:166](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/caip.ts#L166)

Builds a CAIP-19 asset type ID from a chain, an asset namespace (`erc20`, `token`, `slip44`, …) and an asset
reference (a token contract, an SPL mint, a SLIP-44 coin type).

## Parameters

### chainId

`string` \| `number`

The chain, in any form accepted by [toCaip2ChainId](/packages/orbit-core/functions/toCaip2ChainId.md).

### assetNamespace

`string`

The CAIP-19 asset namespace: 3–8 lowercase letters, digits or `-`.

### assetReference

`string`

The asset reference within that namespace.

## Returns

`` `${string}:${string}/${string}:${string}` `` \| `undefined`

The CAIP-19 asset type ID, or `undefined` when any part is invalid.

## Example

```typescript
formatCaip19AssetId(8453, 'erc20', '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913');
// "eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
formatCaip19AssetId('mainnet', 'slip44', '501'); // "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp/slip44:501"
```
