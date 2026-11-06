# errorChain()

> **errorChain**(`error`): `unknown`[]

Defined in: [utils/errorChain.ts:8](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/errorChain.ts#L8)

An error and the causes it wraps, of any kind, as wallet libraries wrap what the wallet answered several levels down.
A cause that loops ends the list.

## Parameters

### error

`unknown`

What was thrown.

## Returns

`unknown`[]

The error first, then each `cause` in turn; empty for `null` or `undefined`.
