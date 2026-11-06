# globalSingleton()

> **globalSingleton**\<`T`\>(`key`, `create`): `T`

Defined in: [utils/globalSingleton.ts:10](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/globalSingleton.ts#L10)

One object for all copies of a package on a page, kept on `globalThis` under `Symbol.for(key)`. A bundler can load a
package twice, and two copies of a React context or a registry do not see each other.

## Type Parameters

### T

`T`

The type of the object.

## Parameters

### key

`string`

The name of the symbol. It must never change: published copies find each other through it.

### create

() => `T`

Makes the object, called only when no copy has made it yet.

## Returns

`T`

The object.
