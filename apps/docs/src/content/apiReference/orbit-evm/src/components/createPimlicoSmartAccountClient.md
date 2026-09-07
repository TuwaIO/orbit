[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# createPimlicoSmartAccountClient()

> **createPimlicoSmartAccountClient**(`config`): `Promise`\<[`PimlicoSmartAccountClientResult`](../interfaces/PimlicoSmartAccountClientResult.md)\>

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:269](https://github.com/TuwaIO/orbit/blob/d4110954ce16280c0b562c8d9e6ad0f6c0a602f2/packages/orbit-evm/src/utils/bundlerUtils.ts#L269)

High-level orchestration utility that instantiates a Solady smart account,
configures a Pimlico paymaster (sponsorship), and binds them to a Pimlico Bundler client.

## Parameters

### config

[`PimlicoSmartAccountClientConfig`](../interfaces/PimlicoSmartAccountClientConfig.md)

Configuration options including chain, wallet/wagmi, and Pimlico credentials.

## Returns

`Promise`\<[`PimlicoSmartAccountClientResult`](../interfaces/PimlicoSmartAccountClientResult.md)\>

Promise resolving to { account, bundlerClient, publicClient, paymasterClient }.
