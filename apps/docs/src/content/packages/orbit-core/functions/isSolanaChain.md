# isSolanaChain()

> **isSolanaChain**(`chainId`): `boolean`

Defined in: [utils/chainHelpers.ts:11](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/chainHelpers.ts#L11)

Checks whether the given chain ID belongs to a Solana network: a cluster moniker (`mainnet`, `mainnet-beta`,
`devnet`, `testnet`, `localnet`), a Wallet Standard chain such as `solana:devnet`, or a CAIP-2 chain ID with the
genesis hash. See [getSolanaCluster](/packages/orbit-core/functions/getSolanaCluster.md).

## Parameters

### chainId

`string` \| `number`

The chain ID or chain name.

## Returns

`boolean`

`true` if the chain ID corresponds to a known Solana network, `false` otherwise.
