[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# checkAndSwitchChain()

> **checkAndSwitchChain**(`chainId`, `config`): `Promise`\<`void`\>

Defined in: [packages/orbit-evm/src/utils/checkAndSwitchChain.ts:20](https://github.com/TuwaIO/orbit/blob/addd21d0aafe36dd9a1d1b63d9124eaa719ba670/packages/orbit-evm/src/utils/checkAndSwitchChain.ts#L20)

Checks if the user's wallet is connected to the specified chain. If not, it prompts
the user to switch to the correct chain.

This function is a crucial prerequisite for any action that requires a specific network.

## Parameters

### chainId

`number`

The ID of the desired blockchain network.

### config

`Config`

The wagmi configuration object.

## Returns

`Promise`\<`void`\>

A promise that resolves when the wallet is on the correct chain.
It rejects if the user cancels the switch or if another error occurs.

## Throws

Throws a specific error if the user rejects the chain switch or if the switch fails for other reasons.
