# getEvmChains()

> **getEvmChains**(`appChains?`): `number`[]

Defined in: [packages/orbit-evm/src/utils/chainsUtils.ts:16](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/chainsUtils.ts#L16)

Gets the EVM chain IDs from an app's viem chain configuration.

## Parameters

### appChains?

readonly \[`Chain`, `Chain`\]

The viem chains configured in the app.

## Returns

`number`[]

The positive numeric chain IDs, or an empty array if no chains are provided.
