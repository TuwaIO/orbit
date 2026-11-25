# createSolanaClientWithCache()

> **createSolanaClientWithCache**(`params`): [`SolanaClient`](/packages/orbit-solana/interfaces/SolanaClient.md)

Defined in: [utils/createSolanaClientWithCache.ts:64](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/createSolanaClientWithCache.ts#L64)

Creates or retrieves a cached Solana RPC client instance

This function implements a caching mechanism for Solana RPC clients to:
- Avoid redundant client instance creation
- Optimize memory usage
- Maintain consistent client instances throughout the application

Clients are cached by their URLs; a cluster without URLs in `rpcUrls` gets the client it already has, otherwise one over its public
endpoint. A cluster with several URLs reads the next one when one fails or answers with an HTTP error, and leaves it alone for a
minute; its subscriptions go to the first.

## Parameters

### params

Object containing rpcUrlOrMoniker and optional rpcUrls

#### rpcUrlOrMoniker

`string`

RPC endpoint URL or cluster moniker (e.g., 'mainnet', 'devnet')

#### rpcUrls?

`Partial`\<`Record`\<[`SolanaClusterMoniker`](/packages/orbit-solana/type-aliases/SolanaClusterMoniker.md), [`SolanaRpcUrl`](/packages/orbit-solana/type-aliases/SolanaRpcUrl.md)\>\>

Optional custom mapping of cluster monikers to RPC endpoints, one or several a cluster

## Returns

[`SolanaClient`](/packages/orbit-solana/interfaces/SolanaClient.md)

Cached or newly created Solana RPC client instance

## Throws

Error if unable to resolve a valid RPC URL
