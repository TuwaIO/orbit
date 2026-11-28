# getAvatar()

> **getAvatar**(`name`, `chains`, `options?`): `Promise`\<`string` \| `null`\>

Defined in: [packages/orbit-evm/src/utils/ensUtils.ts:84](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/ensUtils.ts#L84)

Fetches the avatar URL for a given ENS name from the Ethereum Mainnet, with `ensAvatar` only: by default nothing is
looked up and the answer is `null`. Includes caching for performance. The first lookup loads the ENS normalization
tables with a dynamic import of `viem/ens`.

## Parameters

### name

`string`

The ENS name (e.g., 'vitalik.eth').

### chains

readonly \[`Chain`, `Chain`\]

The list of chains to use for client creation.

### options?

[`EnsAvatarOptions`](/packages/orbit-evm/interfaces/EnsAvatarOptions.md) = `{}`

The lookup to allow: [EnsAvatarOptions](/packages/orbit-evm/interfaces/EnsAvatarOptions.md).

## Returns

`Promise`\<`string` \| `null`\>

The URL of the avatar image if found, otherwise null.

## Throws

With `ensAvatar`, when the name cannot be normalized or the normalization tables fail to load.
