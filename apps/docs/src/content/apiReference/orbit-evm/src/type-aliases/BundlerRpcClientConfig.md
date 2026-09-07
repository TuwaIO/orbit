[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# BundlerRpcClientConfig

> **BundlerRpcClientConfig** = [`PimlicoUrlConfig`](../interfaces/PimlicoUrlConfig.md) & `Partial`\<`Omit`\<`BundlerClientConfig`\<`HttpTransport`\>, `"transport"`\>\>

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:23](https://github.com/TuwaIO/orbit/blob/addd21d0aafe36dd9a1d1b63d9124eaa719ba670/packages/orbit-evm/src/utils/bundlerUtils.ts#L23)

Optional additional configuration forwarded to Viem's createBundlerClient.
