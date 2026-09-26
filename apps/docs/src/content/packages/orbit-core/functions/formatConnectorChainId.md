# formatConnectorChainId()

> **formatConnectorChainId**(`chainId`, `connectedAdapter`): `string` \| `number`

Defined in: [utils/formatConnectorChainId.ts:17](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/formatConnectorChainId.ts#L17)

Formats a chain ID for use in connector identifiers.
String chain IDs (e.g. Solana cluster names) are prefixed with the adapter key; numeric EVM chain IDs are kept as is.

## Parameters

### chainId

`string` \| `number`

Numeric EVM chain ID or string chain identifier.

### connectedAdapter

[`OrbitAdapter`](/packages/orbit-core/enumerations/OrbitAdapter.md)

Adapter of the connected wallet.

## Returns

`string` \| `number`

`"<adapter>:<chainId>"` for string chain IDs, otherwise the numeric chain ID unchanged.

## Example

```typescript
formatConnectorChainId('devnet', OrbitAdapter.SOLANA); // "solana:devnet"
formatConnectorChainId(1, OrbitAdapter.EVM); // 1
```
