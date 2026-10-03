# getSolanaCluster()

> **getSolanaCluster**(`chainId`): [`SolanaCluster`](/packages/orbit-core/type-aliases/SolanaCluster.md) \| `undefined`

Defined in: [utils/solanaChainIds.ts:52](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/solanaChainIds.ts#L52)

Returns the cluster of a Solana chain identifier, in any of its forms: a cluster moniker (`devnet`, `mainnet-beta`),
a Wallet Standard chain (`solana:devnet`), a CAIP-2 chain ID with the genesis hash
(`solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1`) or its bare reference. `mainnet-beta` is reported as `mainnet`; the
testnet ID from before the testnet genesis reset (`solana:4uhcVJyU9pJkvQyS88uRfhDSfZSm8DoR`) as `testnet`.

## Parameters

### chainId

`string` \| `number`

Chain identifier to read. Monikers are case-sensitive, as in the Wallet Standard.

## Returns

[`SolanaCluster`](/packages/orbit-core/type-aliases/SolanaCluster.md) \| `undefined`

`mainnet`, `devnet`, `testnet` or `localnet`, or `undefined` when the value is not a known Solana chain
(numbers, other namespaces, custom clusters).

## Example

```typescript
getSolanaCluster('solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1'); // "devnet"
getSolanaCluster('solana:mainnet-beta'); // "mainnet"
getSolanaCluster(1); // undefined
```
