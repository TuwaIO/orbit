# createBundlerRpcClient()

> **createBundlerRpcClient**(`config`): `BundlerClient`\<`HttpTransport`\>

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:220](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L220)

Creates or retrieves a cached Viem Bundler Client configured for the resolved Pimlico endpoint.

User operations sent with it are priced at the `fast` gas price of `pimlico_getUserOperationGasPrice` (Pimlico
refuses operations priced below it); a bundler without that method gets the fees of the chain, estimated through
`config.client`. Pass `userOperation.estimateFeesPerGas` to price them yourself.

Side effects: caches the client in memory by its URL; each user operation sent with it requests the gas price from
the bundler.

## Parameters

### config

[`BundlerRpcClientConfig`](/packages/orbit-evm/type-aliases/BundlerRpcClientConfig.md)

Bundler URL and optional client configuration parameters.

## Returns

`BundlerClient`\<`HttpTransport`\>

Cached or newly instantiated BundlerClient.
