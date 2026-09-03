[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# isSolanaChain()

> **isSolanaChain**(`chainId`): `boolean`

Defined in: [packages/orbit-core/src/utils/chainHelpers.ts:8](https://github.com/TuwaIO/orbit/blob/75d5bc54ffcf9e4fe60ff5ab68ee7b2168c933e2/packages/orbit-core/src/utils/chainHelpers.ts#L8)

Checks whether the given chain ID belongs to a Solana network.
Supports common Solana network names: 'devnet', 'testnet', 'mainnet-beta', 'mainnet'.

## Parameters

### chainId

`string` \| `number`

The chain ID or chain name.

## Returns

`boolean`

- True if the chain ID corresponds to a Solana network, false otherwise.
