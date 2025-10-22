[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# setChainId()

> **setChainId**(`chainId`): `string` \| `number`

Defined in: [packages/orbit-core/src/utils/сhainHelpers.ts:21](https://github.com/TuwaIO/orbit/blob/0d52c9f4ec48919c8c073931220722424b6547fc/packages/orbit-core/src/utils/сhainHelpers.ts#L21)

Sets the chain ID to a Solana-specific format if the chain is a Solana network.

## Parameters

### chainId

The original chain ID or name.

`string` | `number`

## Returns

`string` \| `number`

- The formatted chain ID prefixed with 'solana:' if Solana, otherwise the original.
