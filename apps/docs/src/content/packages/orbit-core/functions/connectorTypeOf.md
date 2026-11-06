# connectorTypeOf()

> **connectorTypeOf**(`adapter`, `connectorName`): `` `evm:${string}` `` \| `` `solana:${string}` `` \| `` `starknet:${string}` ``

Defined in: [utils/formatConnectorName.ts:50](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/formatConnectorName.ts#L50)

The connector type of a wallet by its display name, with the known names mapped by [formatConnectorName](/packages/orbit-core/functions/formatConnectorName.md).

## Parameters

### adapter

[`OrbitAdapter`](/packages/orbit-core/enumerations/OrbitAdapter.md)

The blockchain adapter type.

### connectorName

`string`

Display name reported by the wallet connector.

## Returns

`` `evm:${string}` `` \| `` `solana:${string}` `` \| `` `starknet:${string}` ``

The connector type, in the format "orbit-adapter:connector".

## Example

```typescript
connectorTypeOf(OrbitAdapter.EVM, 'Base Account'); // "evm:coinbase"
connectorTypeOf(OrbitAdapter.SOLANA, 'Phantom'); // "solana:phantom"
```
