# createPimlicoRpcUrl()

> **createPimlicoRpcUrl**(`config`): `string`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:161](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L161)

Creates and caches a Pimlico RPC URL based on provided configuration.

Priority order:
1. Explicit `bundlerUrl` (if provided, returned directly).
2. Dedicated Pimlico endpoint `https://api.pimlico.io/v2/${chainId}/rpc?apikey=${apiKey}` (if apiKey provided).
3. Public community endpoint `https://public.pimlico.io/v2/${chainId}/rpc` (fallback).

## Parameters

### config

[`PimlicoUrlConfig`](/packages/orbit-evm/interfaces/PimlicoUrlConfig.md)

The Pimlico URL configuration.

## Returns

`string`

The resolved Bundler RPC URL string.
