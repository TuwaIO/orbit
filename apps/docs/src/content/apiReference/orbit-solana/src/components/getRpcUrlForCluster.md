[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# getRpcUrlForCluster()

> **getRpcUrlForCluster**(`cluster`): `string`

Defined in: [packages/orbit-solana/src/utils/clusterHelpers.ts:25](https://github.com/TuwaIO/orbit/blob/dc7f910f503327f4fdf398696c0348c9b3406975/packages/orbit-solana/src/utils/clusterHelpers.ts#L25)

Retrieves the configured RPC URL for a given cluster moniker.

## Parameters

### cluster

`object` & [`SolanaRPCUrls`](../type-aliases/SolanaRPCUrls.md)

The target cluster. Defaults to the wallet's active chain.

## Returns

`string`

The RPC URL or undefined if not found.
