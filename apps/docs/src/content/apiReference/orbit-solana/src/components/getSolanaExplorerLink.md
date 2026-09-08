[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# getSolanaExplorerLink()

> **getSolanaExplorerLink**(`url?`, `chainId?`): `string`

Defined in: [packages/orbit-solana/src/utils/getSolanaExplorerLink.ts:19](https://github.com/TuwaIO/orbit/blob/d4110954ce16280c0b562c8d9e6ad0f6c0a602f2/packages/orbit-solana/src/utils/getSolanaExplorerLink.ts#L19)

Generates a full URL to an account, transaction, or block on the Solana explorer.

## Parameters

### url?

`string`

The path after baseUrl (e.g. '/tx/...' or '/address/...').

### chainId?

`string` \| `number`

Chain ID or cluster name.

## Returns

`string`

The full URL on the Solana explorer.
