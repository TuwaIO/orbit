[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# setChainId()

> **setChainId**(`chainId`): `string` \| `number`

Defined in: [packages/orbit-core/src/utils/сhainHelpers.ts:21](https://github.com/TuwaIO/orbit/blob/397255305dfbcce27b213dc2552485e4603e7f2e/packages/orbit-core/src/utils/сhainHelpers.ts#L21)

Sets the chain ID to a Solana-specific format if the chain is a Solana network.

## Parameters

### chainId

`string` \| `number`

The original chain ID or name.

## Returns

`string` \| `number`

- The formatted chain ID prefixed with 'solana:' if Solana, otherwise the original.
