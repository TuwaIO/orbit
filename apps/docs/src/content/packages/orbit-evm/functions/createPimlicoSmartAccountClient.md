# createPimlicoSmartAccountClient()

> **createPimlicoSmartAccountClient**(`config`): `Promise`\<[`PimlicoSmartAccountClientResult`](/packages/orbit-evm/interfaces/PimlicoSmartAccountClientResult.md)\>

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:284](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L284)

High-level orchestration utility that instantiates a Solady smart account,
configures a Pimlico paymaster (sponsorship), and binds them to a Pimlico Bundler client.

## Parameters

### config

[`PimlicoSmartAccountClientConfig`](/packages/orbit-evm/interfaces/PimlicoSmartAccountClientConfig.md)

Configuration options including chain, wallet/wagmi, and Pimlico credentials.

## Returns

`Promise`\<[`PimlicoSmartAccountClientResult`](/packages/orbit-evm/interfaces/PimlicoSmartAccountClientResult.md)\>

Promise resolving to { account, bundlerClient, publicClient, paymasterClient }.
