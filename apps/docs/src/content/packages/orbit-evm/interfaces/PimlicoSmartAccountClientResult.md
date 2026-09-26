# PimlicoSmartAccountClientResult

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:99](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L99)

Result object returned by `createPimlicoSmartAccountClient`.

## Properties

### account

> **account**: [`SoladySmartAccount`](/packages/orbit-evm/type-aliases/SoladySmartAccount.md)

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:101](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L101)

The instantiated Solady smart account instance.

***

### bundlerClient

> **bundlerClient**: `BundlerClient`\<`HttpTransport`\>

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:103](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L103)

The configured Viem Bundler client.

***

### paymasterClient?

> `optional` **paymasterClient?**: `PaymasterClient`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:107](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L107)

The Pimlico paymaster client if gas sponsorship is enabled.

***

### publicClient

> **publicClient**: `PublicClient`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:105](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L105)

The public client used for chain state reads and fee estimation.
