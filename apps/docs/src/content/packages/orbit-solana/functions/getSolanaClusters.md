# getSolanaClusters()

> **getSolanaClusters**(`solanaRPCUrls?`, `chains?`): `string`[]

Defined in: [utils/chainsUtils.ts:64](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-solana/src/utils/chainsUtils.ts#L64)

Resolves the Solana clusters an app can use.

## Parameters

### solanaRPCUrls?

`Partial`\<`Record`\<[`SolanaClusterMoniker`](/packages/orbit-solana/type-aliases/SolanaClusterMoniker.md), `string`\>\>

Optional mapping of cluster monikers to RPC URLs. When provided, only these clusters are allowed.

### chains?

`ChainIdentifierArray`

Optional chain identifiers (e.g. `'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1'`, `'solana:devnet'`,
`'solana:mainnet-beta'`); when provided, only clusters present in this list (and allowed by `solanaRPCUrls`) are
returned.

## Returns

`string`[]

Cluster monikers, e.g. `['mainnet', 'devnet']`. Defaults to every cluster with a default RPC URL.
