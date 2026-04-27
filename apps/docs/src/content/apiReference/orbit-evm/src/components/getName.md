[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# getName()

> **getName**(`address`, `chains`): `Promise`\<`string` \| `null`\>

Defined in: [packages/orbit-evm/src/utils/ensUtils.ts:36](https://github.com/TuwaIO/orbit/blob/ef209c30202d37873ebdf8182e3fb89848db2037/packages/orbit-evm/src/utils/ensUtils.ts#L36)

Fetches the primary ENS name for a given Ethereum address from the Ethereum Mainnet.
Includes caching for performance.

## Parameters

### address

`` `0x${string}` ``

The Ethereum address to look up.

### chains

readonly \[`Chain`, `Chain`\]

## Returns

`Promise`\<`string` \| `null`\>

The ENS name if found, otherwise null.
