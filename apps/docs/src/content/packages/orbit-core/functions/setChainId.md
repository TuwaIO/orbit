# setChainId()

> **setChainId**(`chainId`): `string` \| `number`

Defined in: [utils/chainHelpers.ts:23](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/chainHelpers.ts#L23)

Turns a Solana chain, in any form accepted by [isSolanaChain](/packages/orbit-core/functions/isSolanaChain.md), into its CAIP-2 chain ID with the genesis hash
(see [getSolanaChainId](/packages/orbit-core/functions/getSolanaChainId.md)): `devnet` and `solana:devnet` become `solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1`. Other
chain IDs are returned unchanged.

## Parameters

### chainId

`string` \| `number`

The original chain ID or name.

## Returns

`string` \| `number`

The CAIP-2 chain ID for Solana networks, otherwise the original value.
