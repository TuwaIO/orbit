# getSolanaExplorerLink()

> **getSolanaExplorerLink**(`url?`, `chainId?`): `string`

Defined in: [utils/getSolanaExplorerLink.ts:25](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/getSolanaExplorerLink.ts#L25)

Generates a full URL to an account, transaction, or block on the Solana explorer.

## Parameters

### url?

`string`

The path after baseUrl (e.g. '/tx/...' or '/address/...').

### chainId?

`string` \| `number`

Chain ID or cluster name (e.g. 'devnet' or 'solana:devnet').
Mainnet ('mainnet', 'mainnet-beta') or an omitted value produces a link without a `cluster` query parameter.

## Returns

`string`

The full URL on the Solana explorer.
