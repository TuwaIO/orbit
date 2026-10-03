# getSolanaExplorerLink()

> **getSolanaExplorerLink**(`url?`, `chainId?`): `string`

Defined in: [utils/getSolanaExplorerLink.ts:26](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/getSolanaExplorerLink.ts#L26)

Generates a full URL to an account, transaction, or block on the Solana explorer.

## Parameters

### url?

`string`

The path after baseUrl (e.g. '/tx/...' or '/address/...').

### chainId?

`string` \| `number`

Chain ID or cluster name in any form read by [getCluster](/packages/orbit-solana/functions/getCluster.md) (e.g.
`'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1'`, `'solana:devnet'` or `'devnet'`). Mainnet (its chain ID, `'mainnet'`,
`'mainnet-beta'`) or an omitted value produces a link without a `cluster` query parameter.

## Returns

`string`

The full URL on the Solana explorer.
