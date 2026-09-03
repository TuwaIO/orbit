[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# getRpcUrlForCluster()

> **getRpcUrlForCluster**(`cluster`): `string`

Defined in: [packages/orbit-solana/src/utils/clusterHelpers.ts:23](https://github.com/TuwaIO/orbit/blob/75d5bc54ffcf9e4fe60ff5ab68ee7b2168c933e2/packages/orbit-solana/src/utils/clusterHelpers.ts#L23)

Retrieves the configured RPC URL for a given cluster moniker.

## Parameters

### cluster

`object` & [`SolanaRPCUrls`](../type-aliases/SolanaRPCUrls.md)

The target cluster. Defaults to the wallet's active chain.

## Returns

`string`

The RPC URL or undefined if not found.
