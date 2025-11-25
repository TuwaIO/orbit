[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# createSolanaClientWithCache()

> **createSolanaClientWithCache**(`rpcUrlOrMoniker`): `SolanaClient`

Defined in: [packages/orbit-solana/src/utils/createSolanaClientWithCache.ts:64](https://github.com/TuwaIO/orbit/blob/00e6c19b47e8de1df5ab1d4ead8a425680efd495/packages/orbit-solana/src/utils/createSolanaClientWithCache.ts#L64)

Creates or retrieves a cached Solana RPC client instance

This function implements a caching mechanism for Solana RPC clients to:
- Avoid redundant client instance creation
- Optimize memory usage
- Maintain consistent client instances throughout the application

## Parameters

### rpcUrlOrMoniker

RPC endpoint URL or cluster moniker (e.g., 'mainnet', 'devnet')

#### rpcUrlOrMoniker

`string`

#### rpcUrls?

`Partial`\<`Record`\<`SolanaClusterMoniker`, `string`\>\>

## Returns

`SolanaClient`

Cached or newly created Solana RPC client instance

## Throws

Error if unable to resolve a valid RPC URL

## Example

```typescript
// Using cluster moniker
const mainnetClient = createSolanaClientWithCache('mainnet');

// Using custom RPC URL
const customClient = createSolanaClientWithCache('https://my-rpc.example.com');
```
