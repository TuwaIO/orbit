[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# getName()

> **getName**(`address`): `Promise`\<`string` \| `null`\>

Defined in: [packages/orbit-evm/src/utils/ensUtils.ts:30](https://github.com/TuwaIO/orbit/blob/c64ea91b7332b801a4fc29a1017401ec50d19fd5/packages/orbit-evm/src/utils/ensUtils.ts#L30)

Fetches the primary ENS name for a given Ethereum address from the Ethereum Mainnet.
Includes caching for performance.

## Parameters

### address

`` `0x${string}` ``

The Ethereum address to look up.

## Returns

`Promise`\<`string` \| `null`\>

The ENS name if found, otherwise null.
