# waitFor()

> **waitFor**(`predicate`, `maxChecks?`, `checkIntervalMs?`): `Promise`\<`void`\>

Defined in: [utils/waitFor.ts:16](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/waitFor.ts#L16)

Polls a predicate until it returns a truthy value.

## Parameters

### predicate

() => `boolean` \| `undefined`

Condition to check on every attempt.

### maxChecks?

`number` = `50`

Maximum number of attempts. Defaults to 50.

### checkIntervalMs?

`number` = `200`

Delay between attempts in milliseconds. Defaults to 200.

## Returns

`Promise`\<`void`\>

A promise that resolves as soon as the predicate is truthy.

## Example

```typescript
// Wait up to 10 seconds (50 × 200 ms) for an injected provider.
await waitFor(() => typeof window !== 'undefined' && 'ethereum' in window);
```

## Throws

"Predicate not fulfilled in time" if the predicate is still falsy after `maxChecks` attempts.
