[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# getAddress()

> **getAddress**(`name`, `chains`): `Promise`\<`` `0x${string}` `` \| `null`\>

Defined in: [packages/orbit-evm/src/utils/ensUtils.ts:92](https://github.com/TuwaIO/orbit/blob/8b1f0b845177b762a689cc8b4d989ba47e6f3eba/packages/orbit-evm/src/utils/ensUtils.ts#L92)

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
