[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# createBundlerRpcClient()

> **createBundlerRpcClient**(`config`): `BundlerClient`\<`HttpTransport`\>

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:179](https://github.com/TuwaIO/orbit/blob/d4110954ce16280c0b562c8d9e6ad0f6c0a602f2/packages/orbit-evm/src/utils/bundlerUtils.ts#L179)

Creates or retrieves a cached Viem Bundler Client configured for the resolved Pimlico endpoint.

## Parameters

### config

[`BundlerRpcClientConfig`](../type-aliases/BundlerRpcClientConfig.md)

Bundler URL and optional client configuration parameters.

## Returns

`BundlerClient`\<`HttpTransport`\>

Cached or newly instantiated BundlerClient.
