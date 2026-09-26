# formatConnectorName()

> **formatConnectorName**(`connectorName`): `string`

Defined in: [utils/formatConnectorName.ts:25](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/formatConnectorName.ts#L25)

Normalizes a wallet connector display name into a stable identifier.
Known names are mapped explicitly (e.g. "Trust Wallet" → "trust", "Base Account" → "coinbase");
any other name has its whitespace removed and is lowercased.

## Parameters

### connectorName

`string`

Display name reported by the wallet connector.

## Returns

`string`

The normalized connector identifier.

## Example

```typescript
formatConnectorName('Trust Wallet'); // "trust"
formatConnectorName('Rabby Wallet'); // "rabbywallet"
```
