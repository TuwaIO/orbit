[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# defaultRpcUrlsByMoniker

> `const` **defaultRpcUrlsByMoniker**: `Partial`\<`Record`\<`SolanaClusterMoniker`, `string`\>\>

Defined in: [packages/orbit-solana/src/utils/defaultRpcUrlsByMoniker.ts:8](https://github.com/TuwaIO/orbit/blob/7b8c7a9a9c1b5cf079d2b649fc6ed0eaef1d6bb8/packages/orbit-solana/src/utils/defaultRpcUrlsByMoniker.ts#L8)

**`Internal`**

The default RPC URLs for each Solana cluster.
Not all clusters need to be defined; undefined ones will fall back to other logic.
