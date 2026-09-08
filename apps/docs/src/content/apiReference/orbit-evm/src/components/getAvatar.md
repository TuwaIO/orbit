[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# getAvatar()

> **getAvatar**(`name`, `chains`): `Promise`\<`string` \| `null`\>

Defined in: [packages/orbit-evm/src/utils/ensUtils.ts:64](https://github.com/TuwaIO/orbit/blob/d4110954ce16280c0b562c8d9e6ad0f6c0a602f2/packages/orbit-evm/src/utils/ensUtils.ts#L64)

Fetches the avatar URL for a given ENS name from the Ethereum Mainnet.
Includes caching for performance.

## Parameters

### name

`string`

The ENS name (e.g., 'vitalik.eth').

### chains

readonly \[`Chain`, `Chain`\]

The list of chains to use for client creation.

## Returns

`Promise`\<`string` \| `null`\>

The URL of the avatar image if found, otherwise null.
