# toEvmChainId()

> **toEvmChainId**(`chainId`): `number` \| `undefined`

Defined in: [utils/caip.ts:85](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/caip.ts#L85)

Reads the EVM chain number from an `eip155` CAIP-2 chain ID, a decimal string or a number: the reverse of
[toCaip2ChainId](/packages/orbit-core/functions/toCaip2ChainId.md) for EVM chains.

## Parameters

### chainId

`string` \| `number`

An `eip155` CAIP-2 chain ID, an EVM chain number or its decimal string.

## Returns

`number` \| `undefined`

The chain number, or `undefined` when the value names no EVM chain or the number is not a safe integer.

## Example

```typescript
toEvmChainId('eip155:8453'); // 8453
toEvmChainId('8453'); // 8453
toEvmChainId('solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'); // undefined
```
