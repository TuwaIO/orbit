# parseCaip2ChainId()

> **parseCaip2ChainId**(`chainId`): \{ `namespace`: `string`; `reference`: `string`; \} \| `undefined`

Defined in: [utils/caip.ts:37](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/caip.ts#L37)

Splits a CAIP-2 chain ID into its namespace and reference, validating both against the CAIP-2 grammar.

## Parameters

### chainId

`string`

The chain ID to parse.

## Returns

\{ `namespace`: `string`; `reference`: `string`; \} \| `undefined`

The namespace and reference, or `undefined` when the value is not a CAIP-2 chain ID.

## Example

```typescript
parseCaip2ChainId('eip155:8453'); // { namespace: 'eip155', reference: '8453' }
parseCaip2ChainId('8453'); // undefined
```
