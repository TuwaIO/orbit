# getNetworkData()

> **getNetworkData**(`adapter`): \{ `chain`: \{ `chainId`: `number`; `name`: `string`; \}; `links`: \{ `about`: `string`; `aboutNetwork`: `string`; `choseWallet`: `string`; \}; \} \| \{ `chain`: \{ `chainId`: `"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp"`; `name`: `string`; \}; `links`: \{ `about`: `string`; `aboutNetwork`: `string`; `choseWallet`: `string`; \}; \} \| `undefined`

Defined in: [utils/getNetworkData.ts:13](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/getNetworkData.ts#L13)

Returns the default network and educational links for an adapter, e.g. to render a
"What is a wallet?" section in a connect modal.

## Parameters

### adapter

[`OrbitAdapter`](/packages/orbit-core/enumerations/OrbitAdapter.md)

The adapter to describe.

## Returns

\{ `chain`: \{ `chainId`: `number`; `name`: `string`; \}; `links`: \{ `about`: `string`; `aboutNetwork`: `string`; `choseWallet`: `string`; \}; \} \| \{ `chain`: \{ `chainId`: `"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp"`; `name`: `string`; \}; `links`: \{ `about`: `string`; `aboutNetwork`: `string`; `choseWallet`: `string`; \}; \} \| `undefined`

Default chain (`chainId`: `1` for EVM, [SOLANA\_CHAIN\_IDS](/packages/orbit-core/variables/SOLANA_CHAIN_IDS.md)`.mainnet` for Solana; `name`) and `links`
(`aboutNetwork`, `choseWallet`, `about`) for EVM and Solana, or `undefined` for adapters without network data (e.g.
Starknet).
