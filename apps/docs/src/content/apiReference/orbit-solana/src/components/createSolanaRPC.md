[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# createSolanaRPC()

> **createSolanaRPC**(`params`): `Rpc`\<`SolanaRpcApi`\>

Defined in: [packages/orbit-solana/src/utils/createSolanaRPC.ts:37](https://github.com/TuwaIO/orbit/blob/75d5bc54ffcf9e4fe60ff5ab68ee7b2168c933e2/packages/orbit-solana/src/utils/createSolanaRPC.ts#L37)

Retrieves a cached RPC client for a given URL or cluster moniker.
If no cached client exists, it creates a new instance.

## Parameters

### params

Object containing rpcUrlOrMoniker and optional rpcUrls map.

#### rpcUrlOrMoniker

`string`

Either a full RPC URL or a cluster moniker like 'mainnet'.

#### rpcUrls?

`Partial`\<`Record`\<[`SolanaClusterMoniker`](../type-aliases/SolanaClusterMoniker.md), `string`\>\>

Optional custom mapping of cluster monikers to RPC endpoints.

## Returns

`Rpc`\<`SolanaRpcApi`\>

The RPC client instance.
