[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# createSolanaRPC()

> **createSolanaRPC**(`rpcUrlOrMoniker`): `Rpc`\<`SolanaRpcApi`\>

Defined in: [packages/orbit-solana/src/utils/createSolanaRPC.ts:35](https://github.com/TuwaIO/orbit/blob/8ec233146b62789dea4760ee3a5c2fa417c0e9cc/packages/orbit-solana/src/utils/createSolanaRPC.ts#L35)

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
