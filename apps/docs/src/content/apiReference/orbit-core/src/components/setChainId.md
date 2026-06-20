[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# setChainId()

> **setChainId**(`chainId`): `string` \| `number`

Defined in: [packages/orbit-core/src/utils/сhainHelpers.ts:21](https://github.com/TuwaIO/orbit/blob/1ad75fa440e5fad6e46561ff2605f7443104f383/packages/orbit-core/src/utils/сhainHelpers.ts#L21)

Sets the chain ID to a Solana-specific format if the chain is a Solana network.

## Parameters

### chainId

`string` \| `number`

The original chain ID or name.

## Returns

`string` \| `number`

- The formatted chain ID prefixed with 'solana:' if Solana, otherwise the original.
