# getAvatar()

> **getAvatar**(`name`, `chains`): `Promise`\<`string` \| `null`\>

Defined in: [packages/orbit-evm/src/utils/ensUtils.ts:70](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/ensUtils.ts#L70)

Fetches the avatar URL for a given ENS name from the Ethereum Mainnet.
Includes caching for performance. The first call loads the ENS normalization tables with a dynamic import of
`viem/ens`.

## Parameters

### name

`string`

The ENS name (e.g., 'vitalik.eth').

### chains

readonly \[`Chain`, `Chain`\]

The list of chains to use for client creation.

## Returns

`Promise`\<`string` \| `null`\>

The URL of the avatar image if found, otherwise null.

## Throws

When the name cannot be normalized or the normalization tables fail to load.
