# createSolanaRPC()

> **createSolanaRPC**(`params`): `Rpc`\<`SolanaRpcApi`\>

Defined in: [utils/createSolanaRPC.ts:37](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/createSolanaRPC.ts#L37)

Retrieves a cached RPC client for a given URL or cluster moniker.
If no cached client exists, it creates a new instance.

## Parameters

### params

Object containing rpcUrlOrMoniker and optional rpcUrls map.

#### rpcUrlOrMoniker

`string`

Either a full RPC URL or a cluster moniker like 'mainnet'.

#### rpcUrls?

`Partial`\<`Record`\<[`SolanaClusterMoniker`](/packages/orbit-solana/type-aliases/SolanaClusterMoniker.md), `string`\>\>

Optional custom mapping of cluster monikers to RPC endpoints.

## Returns

`Rpc`\<`SolanaRpcApi`\>

The RPC client instance.
