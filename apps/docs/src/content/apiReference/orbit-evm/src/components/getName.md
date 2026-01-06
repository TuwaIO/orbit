[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# getName()

> **getName**(`address`): `Promise`\<`string` \| `null`\>

Defined in: [packages/orbit-evm/src/utils/ensUtils.ts:30](https://github.com/TuwaIO/orbit/blob/cd205dec44d70155803b7a4b2375469eaeca0357/packages/orbit-evm/src/utils/ensUtils.ts#L30)

Fetches the primary ENS name for a given Ethereum address from the Ethereum Mainnet.
Includes caching for performance.

## Parameters

### address

`` `0x${string}` ``

The Ethereum address to look up.

## Returns

`Promise`\<`string` \| `null`\>

The ENS name if found, otherwise null.
