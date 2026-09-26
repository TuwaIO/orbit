# getAdapterFromConnectorType()

> **getAdapterFromConnectorType**(`connectorType`): [`OrbitAdapter`](/packages/orbit-core/enumerations/OrbitAdapter.md)

Defined in: [utils/getAdapterFromConnectorType.ts:25](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/getAdapterFromConnectorType.ts#L25)

Extracts the adapter type from a connector type string

## Parameters

### connectorType

`` `evm:${string}` `` \| `` `solana:${string}` `` \| `` `starknet:${string}` ``

Connector type in format "orbit-adapter:connector" (e.g. "evm:metamask", "solana:phantom")

## Returns

[`OrbitAdapter`](/packages/orbit-core/enumerations/OrbitAdapter.md)

The corresponding [OrbitAdapter](/packages/orbit-core/enumerations/OrbitAdapter.md) type or EVM as default

## Example

```typescript
// Returns OrbitAdapter.EVM
getAdapterFromConnectorType('evm:metamask');

// Returns OrbitAdapter.SOLANA
getAdapterFromConnectorType('solana:phantom');

// Returns OrbitAdapter.EVM (default)
getAdapterFromConnectorType('unknown');
```

## Remarks

The function splits the connector type string by ":" and takes the first part as the adapter type.
If the split fails or the first part is empty, it defaults to EVM adapter.
