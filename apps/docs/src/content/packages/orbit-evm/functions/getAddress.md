# getAddress()

> **getAddress**(`name`, `chains`): `Promise`\<`` `0x${string}` `` \| `null`\>

Defined in: [packages/orbit-evm/src/utils/ensUtils.ts:99](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/ensUtils.ts#L99)

Fetches the Ethereum address associated with a given ENS name from the Ethereum Mainnet.
Includes caching for performance. The first call loads the ENS normalization tables with a dynamic import of
`viem/ens`.

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

## Throws

When the name cannot be normalized or the normalization tables fail to load.
