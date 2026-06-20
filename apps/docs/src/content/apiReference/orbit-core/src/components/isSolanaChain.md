[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# isSolanaChain()

> **isSolanaChain**(`chainId`): `boolean`

Defined in: [packages/orbit-core/src/utils/сhainHelpers.ts:8](https://github.com/TuwaIO/orbit/blob/b52dc368b4ffdf4a4f47985e51b04080b789eb45/packages/orbit-core/src/utils/сhainHelpers.ts#L8)

Checks whether the given chain ID belongs to a Solana network.
Supports common Solana network names: 'devnet', 'testnet', 'mainnet-beta', 'mainnet'.

## Parameters

### chainId

`string` \| `number`

The chain ID or chain name.

## Returns

`boolean`

- True if the chain ID corresponds to a Solana network, false otherwise.
