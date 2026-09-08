[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# isSolanaChain()

> **isSolanaChain**(`chainId`): `boolean`

Defined in: [packages/orbit-core/src/utils/chainHelpers.ts:8](https://github.com/TuwaIO/orbit/blob/d4110954ce16280c0b562c8d9e6ad0f6c0a602f2/packages/orbit-core/src/utils/chainHelpers.ts#L8)

Checks whether the given chain ID belongs to a Solana network.
Supports common Solana network names: 'devnet', 'testnet', 'mainnet-beta', 'mainnet'.

## Parameters

### chainId

`string` \| `number`

The chain ID or chain name.

## Returns

`boolean`

- True if the chain ID corresponds to a Solana network, false otherwise.
