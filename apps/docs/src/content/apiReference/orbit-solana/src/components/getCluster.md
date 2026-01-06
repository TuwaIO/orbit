[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# getCluster()

> **getCluster**(`walletCluster`): `string`

Defined in: [packages/orbit-solana/src/utils/clusterHelpers.ts:12](https://github.com/TuwaIO/orbit/blob/7b5809f9ba05d5be25674ef8b406879aab694643/packages/orbit-solana/src/utils/clusterHelpers.ts#L12)

Safely extracts the cluster moniker from a chain identifier.
Handles both full chain IDs ('solana:mainnet-beta') and simple monikers ('mainnet-beta').

## Parameters

### walletCluster

#### cluster?

`string`

#### walletCluster?

`string`

## Returns

`string`

The extracted cluster moniker.
