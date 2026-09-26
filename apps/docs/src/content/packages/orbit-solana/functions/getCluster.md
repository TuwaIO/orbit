# getCluster()

> **getCluster**(`params`): `string`

Defined in: [utils/clusterHelpers.ts:12](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/clusterHelpers.ts#L12)

Safely extracts the cluster moniker from a chain identifier.
Handles both full chain IDs ('solana:mainnet-beta') and simple monikers ('mainnet-beta').

## Parameters

### params

Cluster sources.

#### cluster?

`string`

Chain identifier or cluster moniker. Takes precedence when provided.

#### walletCluster?

`string`

Cluster of the connected wallet, used when `cluster` is omitted.

## Returns

`string`

The extracted cluster moniker, falling back to `walletCluster` and then to `'mainnet'`.
