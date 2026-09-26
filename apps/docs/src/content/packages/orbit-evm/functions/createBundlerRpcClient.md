# createBundlerRpcClient()

> **createBundlerRpcClient**(`config`): `BundlerClient`\<`HttpTransport`\>

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:185](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L185)

Creates or retrieves a cached Viem Bundler Client configured for the resolved Pimlico endpoint.

## Parameters

### config

[`BundlerRpcClientConfig`](/packages/orbit-evm/type-aliases/BundlerRpcClientConfig.md)

Bundler URL and optional client configuration parameters.

## Returns

`BundlerClient`\<`HttpTransport`\>

Cached or newly instantiated BundlerClient.
