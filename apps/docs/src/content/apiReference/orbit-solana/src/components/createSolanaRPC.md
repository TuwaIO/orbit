[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# createSolanaRPC()

> **createSolanaRPC**(`params`): `Rpc`\<`SolanaRpcApi`\>

Defined in: [packages/orbit-solana/src/utils/createSolanaRPC.ts:37](https://github.com/TuwaIO/orbit/blob/967f8c4c132091d95a14fb41253f2d23d0d4a06b/packages/orbit-solana/src/utils/createSolanaRPC.ts#L37)

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
