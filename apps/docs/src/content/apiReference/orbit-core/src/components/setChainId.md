[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# setChainId()

> **setChainId**(`chainId`): `string` \| `number`

Defined in: [packages/orbit-core/src/utils/chainHelpers.ts:21](https://github.com/TuwaIO/orbit/blob/75d5bc54ffcf9e4fe60ff5ab68ee7b2168c933e2/packages/orbit-core/src/utils/chainHelpers.ts#L21)

Sets the chain ID to a Solana-specific format if the chain is a Solana network.

## Parameters

### chainId

`string` \| `number`

The original chain ID or name.

## Returns

`string` \| `number`

- The formatted chain ID prefixed with 'solana:' if Solana, otherwise the original.
