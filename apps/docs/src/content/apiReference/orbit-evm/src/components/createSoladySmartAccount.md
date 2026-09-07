[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# createSoladySmartAccount()

> **createSoladySmartAccount**(`params`): `Promise`\<[`SoladySmartAccount`](../type-aliases/SoladySmartAccount.md)\>

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:220](https://github.com/TuwaIO/orbit/blob/d4110954ce16280c0b562c8d9e6ad0f6c0a602f2/packages/orbit-evm/src/utils/bundlerUtils.ts#L220)

Instantiates a Solady ERC-4337 smart account with automatic wallet signing delegation
and Solady factory-compliant deterministic salt.

## Parameters

### params

[`CreateSoladySmartAccountParams`](../interfaces/CreateSoladySmartAccountParams.md)

Configuration parameters including client and walletClient.

## Returns

`Promise`\<[`SoladySmartAccount`](../type-aliases/SoladySmartAccount.md)\>

Promise resolving to the initialized SoladySmartAccount.
