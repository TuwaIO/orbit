# getRpcUrlForCluster()

> **getRpcUrlForCluster**(`params`): `string`

Defined in: [utils/clusterHelpers.ts:38](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/clusterHelpers.ts#L38)

Retrieves the configured RPC URL for a given cluster moniker.

## Parameters

### params

`object` & [`SolanaRPCUrls`](/packages/orbit-solana/type-aliases/SolanaRPCUrls.md)

Cluster selection and the configured RPC URLs.

## Returns

`string`

The configured RPC URL. When the cluster has no URL configured, the public endpoint of the same cluster
(`https://api.mainnet-beta.solana.com`, `https://api.devnet.solana.com` or `https://api.testnet.solana.com`); for
`localnet`, which has no public endpoint, `https://api.mainnet-beta.solana.com/`.
