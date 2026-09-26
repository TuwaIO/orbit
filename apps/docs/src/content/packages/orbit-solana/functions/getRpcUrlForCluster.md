# getRpcUrlForCluster()

> **getRpcUrlForCluster**(`params`): `string`

Defined in: [utils/clusterHelpers.ts:29](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/clusterHelpers.ts#L29)

Retrieves the configured RPC URL for a given cluster moniker.

## Parameters

### params

`object` & [`SolanaRPCUrls`](/packages/orbit-solana/type-aliases/SolanaRPCUrls.md)

Cluster selection and the configured RPC URLs.

## Returns

`string`

The configured RPC URL, or the public mainnet-beta endpoint if the cluster has no URL configured.
