# BundlerRpcClientConfig

> **BundlerRpcClientConfig** = [`PimlicoUrlConfig`](/packages/orbit-evm/interfaces/PimlicoUrlConfig.md) & `Partial`\<`Omit`\<`BundlerClientConfig`\<`HttpTransport`\>, `"transport"` \| `"client"`\>\> & `object`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:50](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L50)

Optional additional configuration forwarded to Viem's createBundlerClient.

## Type Declaration

### client?

> `optional` **client?**: `Client` \| `PublicClient`

Optional execution client or public client used for fee estimation.
