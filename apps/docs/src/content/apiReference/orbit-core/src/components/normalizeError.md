[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# normalizeError()

> **normalizeError**(`error`): [`TuwaErrorState`](../interfaces/TuwaErrorState.md)

Defined in: [packages/orbit-core/src/utils/normalizeError.ts:145](https://github.com/TuwaIO/orbit/blob/dbd48a891d655266bf02a1dde85e978a83466bd2/packages/orbit-core/src/utils/normalizeError.ts#L145)

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
