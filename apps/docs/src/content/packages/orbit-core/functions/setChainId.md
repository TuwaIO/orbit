# setChainId()

> **setChainId**(`chainId`): `string` \| `number`

Defined in: [utils/chainHelpers.ts:21](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/chainHelpers.ts#L21)

Sets the chain ID to a Solana-specific format if the chain is a Solana network.

## Parameters

### chainId

`string` \| `number`

The original chain ID or name.

## Returns

`string` \| `number`

- The formatted chain ID prefixed with 'solana:' if Solana, otherwise the original.
