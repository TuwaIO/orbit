# getNetworkData()

> **getNetworkData**(`adapter`): \{ `chain`: \{ `chainId`: `number`; `name`: `string`; \}; `links`: \{ `about`: `string`; `aboutNetwork`: `string`; `choseWallet`: `string`; \}; \} \| \{ `chain`: \{ `chainId`: `string`; `name`: `string`; \}; `links`: \{ `about`: `string`; `aboutNetwork`: `string`; `choseWallet`: `string`; \}; \} \| `undefined`

Defined in: [utils/getNetworkData.ts:11](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/getNetworkData.ts#L11)

Returns the default network and educational links for an adapter, e.g. to render a
"What is a wallet?" section in a connect modal.

## Parameters

### adapter

[`OrbitAdapter`](/packages/orbit-core/enumerations/OrbitAdapter.md)

The adapter to describe.

## Returns

\{ `chain`: \{ `chainId`: `number`; `name`: `string`; \}; `links`: \{ `about`: `string`; `aboutNetwork`: `string`; `choseWallet`: `string`; \}; \} \| \{ `chain`: \{ `chainId`: `string`; `name`: `string`; \}; `links`: \{ `about`: `string`; `aboutNetwork`: `string`; `choseWallet`: `string`; \}; \} \| `undefined`

Default chain (`chainId`, `name`) and `links` (`aboutNetwork`, `choseWallet`, `about`) for EVM and Solana,
or `undefined` for adapters without network data (e.g. Starknet).
