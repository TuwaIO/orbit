[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# createBundlerRpcClient()

> **createBundlerRpcClient**(`config`): `BundlerClient`\<`HttpTransport`\>

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:84](https://github.com/TuwaIO/orbit/blob/addd21d0aafe36dd9a1d1b63d9124eaa719ba670/packages/orbit-evm/src/utils/bundlerUtils.ts#L84)

Creates or retrieves a cached Viem Bundler Client configured for the resolved Pimlico endpoint.

## Parameters

### config

[`BundlerRpcClientConfig`](../type-aliases/BundlerRpcClientConfig.md)

Bundler URL and optional client configuration parameters.

## Returns

`BundlerClient`\<`HttpTransport`\>

Cached or newly instantiated BundlerClient.
