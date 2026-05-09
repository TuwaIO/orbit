[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# getAddress()

> **getAddress**(`name`, `chains`): `Promise`\<`` `0x${string}` `` \| `null`\>

Defined in: [packages/orbit-evm/src/utils/ensUtils.ts:92](https://github.com/TuwaIO/orbit/blob/9ebff5664562e1192d3da58ef56d50bba84fae94/packages/orbit-evm/src/utils/ensUtils.ts#L92)

Fetches the Ethereum address associated with a given ENS name from the Ethereum Mainnet.
Includes caching for performance.

## Parameters

### name

`string`

The ENS name to resolve (e.g., 'vitalik.eth').

### chains

readonly \[`Chain`, `Chain`\]

The list of chains to use for client creation.

## Returns

`Promise`\<`` `0x${string}` `` \| `null`\>

The associated Ethereum address (lowercase) or null if not found.
