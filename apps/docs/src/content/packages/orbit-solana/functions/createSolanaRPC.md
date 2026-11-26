# createSolanaRPC()

> **createSolanaRPC**(`params`): `Rpc`\<`SolanaRpcApi`\>

Defined in: [utils/createSolanaRPC.ts:27](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/createSolanaRPC.ts#L27)

Retrieves a cached RPC client for a given URL or cluster moniker.
If no cached client exists, it creates a new instance. Clients are cached by their URLs; a cluster without URLs in `rpcUrls` gets the
client it already has, otherwise one over its public endpoint. A cluster with several URLs reads the next one when one fails or
answers with an HTTP error, and leaves it alone for a minute.

## Parameters

### params

Object containing rpcUrlOrMoniker and optional rpcUrls map.

#### rpcUrlOrMoniker

`string`

Either a full RPC URL or a cluster moniker like 'mainnet'.

#### rpcUrls?

`Partial`\<`Record`\<[`SolanaClusterMoniker`](/packages/orbit-solana/type-aliases/SolanaClusterMoniker.md), [`SolanaRpcUrl`](/packages/orbit-solana/type-aliases/SolanaRpcUrl.md)\>\>

Optional custom mapping of cluster monikers to RPC endpoints, one or several a cluster.

## Returns

`Rpc`\<`SolanaRpcApi`\>

The RPC client instance.

## Throws

When the value is neither a URL nor a known moniker.
