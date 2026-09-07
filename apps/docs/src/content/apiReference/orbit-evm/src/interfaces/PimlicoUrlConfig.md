[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# PimlicoUrlConfig

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:36](https://github.com/TuwaIO/orbit/blob/d6b82d7622d466a80528d456740a10576d03cc15/packages/orbit-evm/src/utils/bundlerUtils.ts#L36)

Configuration options for generating Pimlico Bundler RPC URLs.

## Properties

### apiKey?

> `optional` **apiKey?**: `string`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:40](https://github.com/TuwaIO/orbit/blob/d6b82d7622d466a80528d456740a10576d03cc15/packages/orbit-evm/src/utils/bundlerUtils.ts#L40)

Optional Pimlico API key. If omitted, falls back to public RPC or bundlerUrl.

***

### bundlerUrl?

> `optional` **bundlerUrl?**: `string`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:42](https://github.com/TuwaIO/orbit/blob/d6b82d7622d466a80528d456740a10576d03cc15/packages/orbit-evm/src/utils/bundlerUtils.ts#L42)

Optional explicit custom bundler RPC URL that takes precedence.

***

### chainId

> **chainId**: `number`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:38](https://github.com/TuwaIO/orbit/blob/d6b82d7622d466a80528d456740a10576d03cc15/packages/orbit-evm/src/utils/bundlerUtils.ts#L38)

Target EVM chain ID (e.g. 1 for Ethereum Mainnet, 11155111 for Sepolia).
