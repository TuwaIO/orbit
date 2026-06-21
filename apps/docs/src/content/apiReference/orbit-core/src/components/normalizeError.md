[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# normalizeError()

> **normalizeError**(`error`): [`TuwaErrorState`](../interfaces/TuwaErrorState.md)

Defined in: [packages/orbit-core/src/utils/normalizeError.ts:145](https://github.com/TuwaIO/orbit/blob/87f8ca9885375ed00fc139a33147200ac10c74cf/packages/orbit-core/src/utils/normalizeError.ts#L145)

Normalizes any error into a persistence-safe TuwaErrorState.

## Parameters

### error

`unknown`

Any error value (Error, string, object, etc.)

## Returns

[`TuwaErrorState`](../interfaces/TuwaErrorState.md)

TuwaErrorState with user-friendly message and full raw details

## Example

```typescript
try {
  await sendTransaction();
} catch (e) {
  const normalized = normalizeError(e);
  set({ error: normalized });
}
```
