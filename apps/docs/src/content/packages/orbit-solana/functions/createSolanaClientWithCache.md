# createSolanaClientWithCache()

> **createSolanaClientWithCache**(`params`): [`SolanaClient`](/packages/orbit-solana/interfaces/SolanaClient.md)

Defined in: [utils/createSolanaClientWithCache.ts:62](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/createSolanaClientWithCache.ts#L62)

Creates or retrieves a cached Solana RPC client instance

This function implements a caching mechanism for Solana RPC clients to:
- Avoid redundant client instance creation
- Optimize memory usage
- Maintain consistent client instances throughout the application

## Parameters

### params

Object containing rpcUrlOrMoniker and optional rpcUrls

#### rpcUrlOrMoniker

`string`

RPC endpoint URL or cluster moniker (e.g., 'mainnet', 'devnet')

#### rpcUrls?

`Partial`\<`Record`\<[`SolanaClusterMoniker`](/packages/orbit-solana/type-aliases/SolanaClusterMoniker.md), `string`\>\>

Optional custom mapping of cluster monikers to RPC endpoints

## Returns

[`SolanaClient`](/packages/orbit-solana/interfaces/SolanaClient.md)

Cached or newly created Solana RPC client instance

## Throws

Error if unable to resolve a valid RPC URL
