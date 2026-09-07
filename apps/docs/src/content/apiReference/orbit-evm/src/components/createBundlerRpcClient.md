[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# createBundlerRpcClient()

> **createBundlerRpcClient**(`config`): `BundlerClient`\<`HttpTransport`\>

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:179](https://github.com/TuwaIO/orbit/blob/d6b82d7622d466a80528d456740a10576d03cc15/packages/orbit-evm/src/utils/bundlerUtils.ts#L179)

Creates or retrieves a cached Viem Bundler Client configured for the resolved Pimlico endpoint.

## Parameters

### config

[`BundlerRpcClientConfig`](../type-aliases/BundlerRpcClientConfig.md)

Bundler URL and optional client configuration parameters.

## Returns

`BundlerClient`\<`HttpTransport`\>

Cached or newly instantiated BundlerClient.
