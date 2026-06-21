[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# getNetworkData()

> **getNetworkData**(`adapter`): \{ `chain`: \{ `chainId`: `number`; `name`: `string`; \}; `links`: \{ `about`: `string`; `aboutNetwork`: `string`; `choseWallet`: `string`; \}; \} \| \{ `chain`: \{ `chainId`: `string`; `name`: `string`; \}; `links`: \{ `about`: `string`; `aboutNetwork`: `string`; `choseWallet`: `string`; \}; \} \| `undefined`

Defined in: [packages/orbit-core/src/utils/getNetworkData.ts:3](https://github.com/TuwaIO/orbit/blob/12a30fdc504e493db19e2812b9ac63871ff38607/packages/orbit-core/src/utils/getNetworkData.ts#L3)

## Parameters

### adapter

[`OrbitAdapter`](../enumerations/OrbitAdapter.md)

## Returns

\{ `chain`: \{ `chainId`: `number`; `name`: `string`; \}; `links`: \{ `about`: `string`; `aboutNetwork`: `string`; `choseWallet`: `string`; \}; \} \| \{ `chain`: \{ `chainId`: `string`; `name`: `string`; \}; `links`: \{ `about`: `string`; `aboutNetwork`: `string`; `choseWallet`: `string`; \}; \} \| `undefined`
