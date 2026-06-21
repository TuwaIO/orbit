[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# getNetworkData()

> **getNetworkData**(`adapter`): \{ `chain`: \{ `chainId`: `number`; `name`: `string`; \}; `links`: \{ `about`: `string`; `aboutNetwork`: `string`; `choseWallet`: `string`; \}; \} \| \{ `chain`: \{ `chainId`: `string`; `name`: `string`; \}; `links`: \{ `about`: `string`; `aboutNetwork`: `string`; `choseWallet`: `string`; \}; \} \| `undefined`

Defined in: [packages/orbit-core/src/utils/getNetworkData.ts:3](https://github.com/TuwaIO/orbit/blob/87f8ca9885375ed00fc139a33147200ac10c74cf/packages/orbit-core/src/utils/getNetworkData.ts#L3)

## Parameters

### adapter

[`OrbitAdapter`](../enumerations/OrbitAdapter.md)

## Returns

\{ `chain`: \{ `chainId`: `number`; `name`: `string`; \}; `links`: \{ `about`: `string`; `aboutNetwork`: `string`; `choseWallet`: `string`; \}; \} \| \{ `chain`: \{ `chainId`: `string`; `name`: `string`; \}; `links`: \{ `about`: `string`; `aboutNetwork`: `string`; `choseWallet`: `string`; \}; \} \| `undefined`
