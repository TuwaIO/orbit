[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# getAvatar()

> **getAvatar**(`name`): `Promise`\<`string` \| `null`\>

Defined in: [packages/orbit-evm/src/utils/ensUtils.ts:55](https://github.com/TuwaIO/orbit/blob/4c98d18e74e3b6494c65a06d0224403600792e2b/packages/orbit-evm/src/utils/ensUtils.ts#L55)

Fetches the avatar URL for a given ENS name from the Ethereum Mainnet.
Includes caching for performance.

## Parameters

### name

`string`

The ENS name (e.g., 'vitalik.eth').

## Returns

`Promise`\<`string` \| `null`\>

The URL of the avatar image if found, otherwise null.
