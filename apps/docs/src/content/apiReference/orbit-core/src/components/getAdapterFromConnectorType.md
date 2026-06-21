[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# getAdapterFromConnectorType()

> **getAdapterFromConnectorType**(`connectorType`): [`OrbitAdapter`](../enumerations/OrbitAdapter.md)

Defined in: [packages/orbit-core/src/utils/getAdapterFromConnectorType.ts:25](https://github.com/TuwaIO/orbit/blob/12a30fdc504e493db19e2812b9ac63871ff38607/packages/orbit-core/src/utils/getAdapterFromConnectorType.ts#L25)

Extracts the adapter type from a connector type string

## Parameters

### connectorType

`` `evm:${string}` `` \| `` `solana:${string}` `` \| `` `starknet:${string}` ``

Connector type in format "orbit-adapter:connector" (e.g. "evm:metamask", "solana:phantom")

## Returns

[`OrbitAdapter`](../enumerations/OrbitAdapter.md)

The corresponding [OrbitAdapter](../enumerations/OrbitAdapter.md) type or EVM as default

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
