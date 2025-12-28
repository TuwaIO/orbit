[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# setChainId()

> **setChainId**(`chainId`): `string` \| `number`

Defined in: [packages/orbit-core/src/utils/сhainHelpers.ts:21](https://github.com/TuwaIO/orbit/blob/7829bb9d108b0c330c331d467c81fb5ec2b65cc8/packages/orbit-core/src/utils/сhainHelpers.ts#L21)

Sets the chain ID to a Solana-specific format if the chain is a Solana network.

## Parameters

### chainId

The original chain ID or name.

`string` | `number`

## Returns

`string` \| `number`

- The formatted chain ID prefixed with 'solana:' if Solana, otherwise the original.
