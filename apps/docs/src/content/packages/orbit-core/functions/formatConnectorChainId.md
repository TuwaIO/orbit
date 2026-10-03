# formatConnectorChainId()

> **formatConnectorChainId**(`chainId`, `connectedAdapter`): `string` \| `number`

Defined in: [utils/formatConnectorChainId.ts:20](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/formatConnectorChainId.ts#L20)

Formats a chain ID for use in connector identifiers.
Solana clusters become CAIP-2 chain IDs with the genesis hash (see [getSolanaChainId](/packages/orbit-core/functions/getSolanaChainId.md)); other string chain
IDs are prefixed with the adapter key unless they already have it; numeric EVM chain IDs are kept as is.

## Parameters

### chainId

`string` \| `number`

Numeric EVM chain ID or string chain identifier.

### connectedAdapter

[`OrbitAdapter`](/packages/orbit-core/enumerations/OrbitAdapter.md)

Adapter of the connected wallet.

## Returns

`string` \| `number`

The CAIP-2 chain ID for known Solana clusters, `"<adapter>:<chainId>"` for other string chain IDs, otherwise
the numeric chain ID unchanged.

## Example

```typescript
formatConnectorChainId('devnet', OrbitAdapter.SOLANA); // "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1"
formatConnectorChainId(1, OrbitAdapter.EVM); // 1
```
