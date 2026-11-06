# shortAddress()

> **shortAddress**(`address`, `head?`, `tail?`): `string`

Defined in: [utils/shortAddress.ts:14](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/shortAddress.ts#L14)

An address or a hash shortened to its start and end, as wallets show it.

## Parameters

### address

`string`

The address or hash (`0x…` or base58).

### head?

`number` = `...`

Characters kept at the start; `0x` counts toward it (default `6` for `0x`, `4` otherwise).

### tail?

`number` = `4`

Characters kept at the end (default `4`).

## Returns

`string`

The shortened value; a value that nothing would be saved on stays unchanged.

## Example

```typescript
shortAddress('0x1111111111111111111111111111111111112222'); // "0x1111…2222"
```
