[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# createSolanaRPC()

> **createSolanaRPC**(`rpcUrlOrMoniker`): `Rpc`\<`SolanaRpcApi`\>

Defined in: [packages/orbit-solana/src/utils/createSolanaRPC.ts:35](https://github.com/TuwaIO/orbit/blob/aaad6dba9ca155bdc6521e22b29ff003d5c8cf1f/packages/orbit-solana/src/utils/createSolanaRPC.ts#L35)

**`Internal`**

Retrieves a cached RPC client for a given URL or cluster moniker.
If no cached client exists, it creates a new instance.

## Parameters

### rpcUrlOrMoniker

Either a full RPC URL or a cluster moniker like 'mainnet'.

#### rpcUrlOrMoniker

`string`

#### rpcUrls?

`Partial`\<`Record`\<`SolanaClusterMoniker`, `string`\>\>

## Returns

`Rpc`\<`SolanaRpcApi`\>

The RPC client instance.
