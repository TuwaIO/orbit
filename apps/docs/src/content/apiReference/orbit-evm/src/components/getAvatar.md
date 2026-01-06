[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# getAvatar()

> **getAvatar**(`name`): `Promise`\<`string` \| `null`\>

Defined in: [packages/orbit-evm/src/utils/ensUtils.ts:55](https://github.com/TuwaIO/orbit/blob/61dbecfca6dae4f0893a5c7e58fd9c435a95a63d/packages/orbit-evm/src/utils/ensUtils.ts#L55)

Fetches the avatar URL for a given ENS name from the Ethereum Mainnet.
Includes caching for performance.

## Parameters

### name

`string`

The ENS name (e.g., 'vitalik.eth').

## Returns

`Promise`\<`string` \| `null`\>

The URL of the avatar image if found, otherwise null.
