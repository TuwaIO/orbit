[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# createPimlicoRpcUrl()

> **createPimlicoRpcUrl**(`config`): `string`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:153](https://github.com/TuwaIO/orbit/blob/d4110954ce16280c0b562c8d9e6ad0f6c0a602f2/packages/orbit-evm/src/utils/bundlerUtils.ts#L153)

Creates and caches a Pimlico RPC URL based on provided configuration.

Priority order:
1. Explicit `bundlerUrl` (if provided, returned directly).
2. Dedicated Pimlico endpoint `https://api.pimlico.io/v2/${chainId}/rpc?apikey=${apiKey}` (if apiKey provided).
3. Public community endpoint `https://public.pimlico.io/v2/${chainId}/rpc` (fallback).

## Parameters

### config

[`PimlicoUrlConfig`](../interfaces/PimlicoUrlConfig.md)

The Pimlico URL configuration.

## Returns

`string`

The resolved Bundler RPC URL string.
