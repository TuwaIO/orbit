[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# createSolanaClientWithCache()

> **createSolanaClientWithCache**(`params`): [`SolanaClient`](../interfaces/SolanaClient.md)

Defined in: [packages/orbit-solana/src/utils/createSolanaClientWithCache.ts:62](https://github.com/TuwaIO/orbit/blob/addd21d0aafe36dd9a1d1b63d9124eaa719ba670/packages/orbit-solana/src/utils/createSolanaClientWithCache.ts#L62)

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

`Partial`\<`Record`\<[`SolanaClusterMoniker`](../type-aliases/SolanaClusterMoniker.md), `string`\>\>

Optional custom mapping of cluster monikers to RPC endpoints

## Returns

[`SolanaClient`](../interfaces/SolanaClient.md)

Cached or newly created Solana RPC client instance

## Throws

Error if unable to resolve a valid RPC URL
