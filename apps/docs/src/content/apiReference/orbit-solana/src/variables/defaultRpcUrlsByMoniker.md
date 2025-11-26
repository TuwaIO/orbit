[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# defaultRpcUrlsByMoniker

> `const` **defaultRpcUrlsByMoniker**: `Partial`\<`Record`\<`SolanaClusterMoniker`, `string`\>\>

Defined in: [packages/orbit-solana/src/utils/defaultRpcUrlsByMoniker.ts:8](https://github.com/TuwaIO/orbit/blob/a02ae737d6c6c3bc32f9a45a4139dbb40f4e43bc/packages/orbit-solana/src/utils/defaultRpcUrlsByMoniker.ts#L8)

**`Internal`**

The default RPC URLs for each Solana cluster.
Not all clusters need to be defined; undefined ones will fall back to other logic.
