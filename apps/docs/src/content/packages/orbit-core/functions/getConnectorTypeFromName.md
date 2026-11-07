# getConnectorTypeFromName()

> **getConnectorTypeFromName**(`adapter`, `name`): `` `evm:${string}` `` \| `` `solana:${string}` `` \| `` `starknet:${string}` ``

Defined in: [utils/getConnectorTypeFromName.ts:31](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/getConnectorTypeFromName.ts#L31)

Generates a standardized connector type identifier from adapter type and connector name

## Parameters

### adapter

[`OrbitAdapter`](/packages/orbit-core/enumerations/OrbitAdapter.md)

The blockchain adapter type (e.g. EVM, SOLANA)

### name

`string`

The connector name (e.g. "MetaMask", "Phantom"), as the wallet reports it or as [formatConnectorName](/packages/orbit-core/functions/formatConnectorName.md) gave it

## Returns

`` `evm:${string}` `` \| `` `solana:${string}` `` \| `` `starknet:${string}` ``

A formatted connector type string in format "orbit-adapter:connector"

## Example

```typescript
// Returns "evm:metamask"
getConnectorTypeFromName(OrbitAdapter.EVM, "MetaMask");

// Returns "solana:phantom"
getConnectorTypeFromName(OrbitAdapter.SOLANA, "Phantom");

// Returns "evm:coinbasewallet" (removes spaces)
getConnectorTypeFromName(OrbitAdapter.EVM, "Coinbase Wallet");

// Returns "evm:coinbase" (a known name, by formatConnectorName)
getConnectorTypeFromName(OrbitAdapter.EVM, "Base Account");
```

## Remarks

The function goes through [formatConnectorName](/packages/orbit-core/functions/formatConnectorName.md): known names are mapped, any other has its whitespace removed
and is lowercased. So one wallet has one type wherever it is read, on its connection and on its transactions, and a
value that already went through the mapping stays as it is.
