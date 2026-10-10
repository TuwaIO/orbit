# createSoladySmartAccount()

> **createSoladySmartAccount**(`params`): `Promise`\<[`SoladySmartAccount`](/packages/orbit-evm/type-aliases/SoladySmartAccount.md)\>

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:277](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L277)

Instantiates a Solady ERC-4337 smart account with automatic wallet signing delegation
and Solady factory-compliant deterministic salt.

## Parameters

### params

[`CreateSoladySmartAccountParams`](/packages/orbit-evm/interfaces/CreateSoladySmartAccountParams.md)

Configuration parameters including client and walletClient.

## Returns

`Promise`\<[`SoladySmartAccount`](/packages/orbit-evm/type-aliases/SoladySmartAccount.md)\>

Promise resolving to the initialized SoladySmartAccount.
