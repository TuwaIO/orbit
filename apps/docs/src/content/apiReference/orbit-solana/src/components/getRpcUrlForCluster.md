[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# getRpcUrlForCluster()

> **getRpcUrlForCluster**(`cluster`): `string`

Defined in: [packages/orbit-solana/src/utils/clusterHelpers.ts:25](https://github.com/TuwaIO/orbit/blob/12a30fdc504e493db19e2812b9ac63871ff38607/packages/orbit-solana/src/utils/clusterHelpers.ts#L25)

Retrieves the configured RPC URL for a given cluster moniker.

## Parameters

### cluster

`object` & [`SolanaRPCUrls`](../type-aliases/SolanaRPCUrls.md)

The target cluster. Defaults to the wallet's active chain.

## Returns

`string`

The RPC URL or undefined if not found.
