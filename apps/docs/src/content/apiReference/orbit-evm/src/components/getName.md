[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# getName()

> **getName**(`address`, `chains`): `Promise`\<`string` \| `null`\>

Defined in: [packages/orbit-evm/src/utils/ensUtils.ts:37](https://github.com/TuwaIO/orbit/blob/5f1ccbcb82c624b80f26ed4f0e0857cee2b3844f/packages/orbit-evm/src/utils/ensUtils.ts#L37)

Fetches the primary ENS name for a given Ethereum address from the Ethereum Mainnet.
Includes caching for performance.

## Parameters

### address

`` `0x${string}` ``

The Ethereum address to look up.

### chains

readonly \[`Chain`, `Chain`\]

The list of chains to use for client creation.

## Returns

`Promise`\<`string` \| `null`\>

The ENS name if found, otherwise null.
