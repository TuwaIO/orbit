[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# getAddress()

> **getAddress**(`name`): `Promise`\<`` `0x${string}` `` \| `null`\>

Defined in: [packages/orbit-evm/src/utils/ensUtils.ts:81](https://github.com/TuwaIO/orbit/blob/a54a6227a69b3633ca028a5117d48c88e620e113/packages/orbit-evm/src/utils/ensUtils.ts#L81)

Fetches the Ethereum address associated with a given ENS name from the Ethereum Mainnet.
Includes caching for performance.

## Parameters

### name

`string`

The ENS name to resolve (e.g., 'vitalik.eth').

## Returns

`Promise`\<`` `0x${string}` `` \| `null`\>

The associated Ethereum address (lowercase) or null if not found.
