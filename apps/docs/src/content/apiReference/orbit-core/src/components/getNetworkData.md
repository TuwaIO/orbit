[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# getNetworkData()

> **getNetworkData**(`adapter`): \{ `chain`: \{ `chainId`: `number`; `name`: `string`; \}; `links`: \{ `about`: `string`; `aboutNetwork`: `string`; `choseWallet`: `string`; \}; \} \| \{ `chain`: \{ `chainId`: `string`; `name`: `string`; \}; `links`: \{ `about`: `string`; `aboutNetwork`: `string`; `choseWallet`: `string`; \}; \} \| `undefined`

Defined in: [packages/orbit-core/src/utils/getNetworkData.ts:3](https://github.com/TuwaIO/orbit/blob/5566d48ebd189bd1fbcec4fbad1fd43f5b8d09be/packages/orbit-core/src/utils/getNetworkData.ts#L3)

## Parameters

### adapter

[`OrbitAdapter`](../enumerations/OrbitAdapter.md)

## Returns

\{ `chain`: \{ `chainId`: `number`; `name`: `string`; \}; `links`: \{ `about`: `string`; `aboutNetwork`: `string`; `choseWallet`: `string`; \}; \} \| \{ `chain`: \{ `chainId`: `string`; `name`: `string`; \}; `links`: \{ `about`: `string`; `aboutNetwork`: `string`; `choseWallet`: `string`; \}; \} \| `undefined`
