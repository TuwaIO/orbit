# formatBaseUnits()

> **formatBaseUnits**(`value`, `decimals`): `string` \| `undefined`

Defined in: [utils/formatBaseUnits.ts:15](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/formatBaseUnits.ts#L15)

An integer amount in the smallest unit of a currency as a decimal number, for example wei as gwei (`decimals` 9) or
lamports as SOL (`decimals` 9): exact, with a dot, without grouping, trailing zeros or rounding.

## Parameters

### value

`string` \| `number` \| `bigint` \| `null` \| `undefined`

The amount, as a number, a decimal string or a bigint.

### decimals

`number`

The number of decimals of the displayed unit.

## Returns

`string` \| `undefined`

The decimal string, or `undefined` when `value` is missing, negative or not an integer.

## Example

```typescript
formatBaseUnits('89540000', 6); // "89.54"
formatBaseUnits(1500000000n, 9); // "1.5"
```
