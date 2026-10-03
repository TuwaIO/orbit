# SOLANA\_CHAIN\_IDS

> `const` **SOLANA\_CHAIN\_IDS**: `object`

Defined in: [utils/solanaChainIds.ts:8](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/solanaChainIds.ts#L8)

CAIP-2 chain IDs of the public Solana clusters. By CAIP-30, the reference is the first 32 characters of the base58
genesis hash of the cluster.

Wallet Standard wallets name the same clusters `solana:mainnet`, `solana:devnet` and `solana:testnet`: pass those to
wallet calls, and these IDs everywhere a chain is identified (sessions, transactions, APIs).

## Type Declaration

### devnet

> `readonly` **devnet**: `"solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1"` = `'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1'`

### mainnet

> `readonly` **mainnet**: `"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp"` = `'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'`

### testnet

> `readonly` **testnet**: `"solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z"` = `'solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z'`
