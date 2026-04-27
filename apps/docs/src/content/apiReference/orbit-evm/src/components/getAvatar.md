[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# getAvatar()

> **getAvatar**(`name`, `chains`): `Promise`\<`string` \| `null`\>

Defined in: [packages/orbit-evm/src/utils/ensUtils.ts:62](https://github.com/TuwaIO/orbit/blob/ef209c30202d37873ebdf8182e3fb89848db2037/packages/orbit-evm/src/utils/ensUtils.ts#L62)

Fetches the avatar URL for a given ENS name from the Ethereum Mainnet.
Includes caching for performance.

## Parameters

### name

`string`

The ENS name (e.g., 'vitalik.eth').

### chains

readonly \[`Chain`, `Chain`\]

## Returns

`Promise`\<`string` \| `null`\>

The URL of the avatar image if found, otherwise null.
