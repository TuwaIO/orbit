# getCluster()

> **getCluster**(`params`): `string`

Defined in: [utils/clusterHelpers.ts:18](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/clusterHelpers.ts#L18)

Safely extracts the cluster moniker from a chain identifier.
Handles CAIP-2 chain IDs with the genesis hash (`'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1'`), Wallet Standard chains
(`'solana:devnet'`) and simple monikers (`'devnet'`), through `getSolanaCluster` from `@tuwaio/orbit-core`.
`mainnet-beta` becomes `mainnet`, the key of `rpcUrls`.

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

The extracted cluster moniker (the part after `solana:` for an unknown cluster), falling back to
`walletCluster` and then to `'mainnet'`.
