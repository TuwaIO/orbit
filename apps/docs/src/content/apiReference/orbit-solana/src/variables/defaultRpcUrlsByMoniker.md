[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# defaultRpcUrlsByMoniker

> `const` **defaultRpcUrlsByMoniker**: `Partial`\<`Record`\<[`SolanaClusterMoniker`](../type-aliases/SolanaClusterMoniker.md), `string`\>\>

Defined in: [packages/orbit-solana/src/utils/defaultRpcUrlsByMoniker.ts:8](https://github.com/TuwaIO/orbit/blob/75d5bc54ffcf9e4fe60ff5ab68ee7b2168c933e2/packages/orbit-solana/src/utils/defaultRpcUrlsByMoniker.ts#L8)

**`Internal`**

The default RPC URLs for each Solana cluster.
Not all clusters need to be defined; undefined ones will fall back to other logic.
