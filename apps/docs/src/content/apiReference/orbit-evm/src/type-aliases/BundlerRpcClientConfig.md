[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# BundlerRpcClientConfig

> **BundlerRpcClientConfig** = [`PimlicoUrlConfig`](../interfaces/PimlicoUrlConfig.md) & `Partial`\<`Omit`\<`BundlerClientConfig`\<`HttpTransport`\>, `"transport"` \| `"client"`\>\> & `object`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:48](https://github.com/TuwaIO/orbit/blob/d4110954ce16280c0b562c8d9e6ad0f6c0a602f2/packages/orbit-evm/src/utils/bundlerUtils.ts#L48)

Optional additional configuration forwarded to Viem's createBundlerClient.

## Type Declaration

### client?

> `optional` **client?**: `Client` \| `PublicClient`

Optional execution client or public client used for fee estimation.
