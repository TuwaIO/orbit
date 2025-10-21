[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# getAdapterFromWalletType()

> **getAdapterFromWalletType**(`walletType`): [`OrbitAdapter`](../enumerations/OrbitAdapter.md)

Defined in: [packages/orbit-core/src/utils/getAdapterFromWalletType.ts:25](https://github.com/TuwaIO/orbit/blob/fcf1335e65144c0118c68edf3decad829e18a2e4/packages/orbit-core/src/utils/getAdapterFromWalletType.ts#L25)

Extracts the adapter type from a wallet type string

## Parameters

### walletType

Wallet type in format "chain:wallet" (e.g. "evm:metamask", "solana:phantom")

`` `evm:${string}` `` | `` `solana:${string}` `` | `` `starknet:${string}` ``

## Returns

[`OrbitAdapter`](../enumerations/OrbitAdapter.md)

The corresponding [OrbitAdapter](../enumerations/OrbitAdapter.md) type or EVM as default

## Example

```typescript
// Returns OrbitAdapter.EVM
getAdapterFromWalletType('evm:metamask');

// Returns OrbitAdapter.SOLANA
getAdapterFromWalletType('solana:phantom');

// Returns OrbitAdapter.EVM (default)
getAdapterFromWalletType('unknown');
```

## Remarks

The function splits the wallet type string by ":" and takes the first part as the adapter type.
If the split fails or the first part is empty, it defaults to EVM adapter.
