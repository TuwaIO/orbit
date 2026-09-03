[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# BundlerRpcClientConfig

> **BundlerRpcClientConfig** = [`PimlicoUrlConfig`](../interfaces/PimlicoUrlConfig.md) & `Partial`\<`Omit`\<`BundlerClientConfig`\<`HttpTransport`\>, `"transport"`\>\>

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:23](https://github.com/TuwaIO/orbit/blob/75d5bc54ffcf9e4fe60ff5ab68ee7b2168c933e2/packages/orbit-evm/src/utils/bundlerUtils.ts#L23)

Optional additional configuration forwarded to Viem's createBundlerClient.
