[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# BundlerRpcClientConfig

> **BundlerRpcClientConfig** = [`PimlicoUrlConfig`](../interfaces/PimlicoUrlConfig.md) & `Partial`\<`Omit`\<`BundlerClientConfig`\<`HttpTransport`\>, `"transport"`\>\>

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:23](https://github.com/TuwaIO/orbit/blob/967f8c4c132091d95a14fb41253f2d23d0d4a06b/packages/orbit-evm/src/utils/bundlerUtils.ts#L23)

Optional additional configuration forwarded to Viem's createBundlerClient.
