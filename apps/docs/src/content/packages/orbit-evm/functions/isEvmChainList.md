# isEvmChainList()

> **isEvmChainList**(`chains`): `chains is number[]`

Defined in: [packages/orbit-evm/src/utils/chainsUtils.ts:29](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/chainsUtils.ts#L29)

Type guard to check if a chain list contains EVM chain IDs.

## Parameters

### chains

(`string` \| `number`)[]

Mixed list of chain identifiers.

## Returns

`chains is number[]`

`true` if the list is non-empty and contains only numbers.
