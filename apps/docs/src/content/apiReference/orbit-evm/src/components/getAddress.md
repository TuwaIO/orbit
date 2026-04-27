[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# getAddress()

> **getAddress**(`name`, `chains`): `Promise`\<`` `0x${string}` `` \| `null`\>

Defined in: [packages/orbit-evm/src/utils/ensUtils.ts:89](https://github.com/TuwaIO/orbit/blob/ef209c30202d37873ebdf8182e3fb89848db2037/packages/orbit-evm/src/utils/ensUtils.ts#L89)

Fetches the Ethereum address associated with a given ENS name from the Ethereum Mainnet.
Includes caching for performance.

## Parameters

### name

`string`

The ENS name to resolve (e.g., 'vitalik.eth').

### chains

readonly \[`Chain`, `Chain`\]

## Returns

`Promise`\<`` `0x${string}` `` \| `null`\>

The associated Ethereum address (lowercase) or null if not found.
