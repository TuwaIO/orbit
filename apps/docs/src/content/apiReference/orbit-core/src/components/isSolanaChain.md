[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# isSolanaChain()

> **isSolanaChain**(`chainId`): `boolean`

Defined in: [packages/orbit-core/src/utils/сhainHelpers.ts:8](https://github.com/TuwaIO/orbit/blob/a54a6227a69b3633ca028a5117d48c88e620e113/packages/orbit-core/src/utils/сhainHelpers.ts#L8)

Checks whether the given chain ID belongs to a Solana network.
Supports common Solana network names: 'devnet', 'testnet', 'mainnet-beta', 'mainnet'.

## Parameters

### chainId

The chain ID or chain name.

`string` | `number`

## Returns

`boolean`

- True if the chain ID corresponds to a Solana network, false otherwise.
