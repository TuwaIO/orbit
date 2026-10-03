# getSolanaChainId()

> **getSolanaChainId**(`chainId`): `string` \| `undefined`

Defined in: [utils/solanaChainIds.ts:73](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/solanaChainIds.ts#L73)

Returns the CAIP-2 chain ID of a Solana chain identifier in any form accepted by [getSolanaCluster](/packages/orbit-core/functions/getSolanaCluster.md): the
genesis-hash ID from [SOLANA\_CHAIN\_IDS](/packages/orbit-core/variables/SOLANA_CHAIN_IDS.md) for the public clusters, and `solana:localnet` for `localnet`, which
has no fixed genesis hash.

## Parameters

### chainId

`string` \| `number`

Chain identifier to convert.

## Returns

`string` \| `undefined`

The CAIP-2 chain ID, or `undefined` when the value is not a known Solana chain.

## Example

```typescript
getSolanaChainId('devnet'); // "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1"
getSolanaChainId('solana:mainnet-beta'); // "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp"
getSolanaChainId('eip155:1'); // undefined
```
