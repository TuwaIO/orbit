# parseCaip10AccountId()

> **parseCaip10AccountId**(`accountId`): \{ `address`: `string`; `chainId`: `` `${string}:${string}` ``; `namespace`: `string`; `reference`: `string`; \} \| `undefined`

Defined in: [utils/caip.ts:114](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/caip.ts#L114)

Splits a CAIP-10 account ID into its chain and address, validating both.

## Parameters

### accountId

`string`

The CAIP-10 account ID to parse.

## Returns

\{ `address`: `string`; `chainId`: `` `${string}:${string}` ``; `namespace`: `string`; `reference`: `string`; \} \| `undefined`

The chain ID, its namespace and reference, and the address, or `undefined` when the value is not a valid
CAIP-10 account ID.

## Example

```typescript
parseCaip10AccountId('eip155:8453:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913');
// { chainId: 'eip155:8453', namespace: 'eip155', reference: '8453', address: '0x8335…' }
```
