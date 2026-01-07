[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# getConnectorTypeFromName()

> **getConnectorTypeFromName**(`adapter`, `name`): `string`

Defined in: [packages/orbit-core/src/utils/getConnectorTypeFromName.ts:30](https://github.com/TuwaIO/orbit/blob/87cb2884f03baa5e3327d97991bf31d62d8ac3b5/packages/orbit-core/src/utils/getConnectorTypeFromName.ts#L30)

Generates a standardized connector type identifier from adapter type and connector name

## Parameters

### adapter

[`OrbitAdapter`](../enumerations/OrbitAdapter.md)

The blockchain adapter type (e.g. EVM, SOLANA)

### name

`string`

The connector name (e.g. "MetaMask", "Phantom")

## Returns

`string`

A formatted connector type string in format "orbit-adapter:connector"

## Example

```typescript
// Returns "evm:metamask"
getConnectorTypeFromName(OrbitAdapter.EVM, "MetaMask");

// Returns "solana:phantom"
getConnectorTypeFromName(OrbitAdapter.SOLANA, "Phantom");

// Returns "evm:coinbasewallet" (removes spaces)
getConnectorTypeFromName(OrbitAdapter.EVM, "Coinbase Wallet");
```

## Remarks

The function:
1. Combines adapter type with connector name using ":" as separator
2. Removes all whitespace from connector name
3. Converts connector name to lowercase
This ensures consistent connector type identifiers across the application
and normalizes connector names for better UX/consistency.
