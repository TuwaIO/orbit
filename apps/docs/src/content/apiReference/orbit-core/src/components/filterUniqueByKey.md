[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# filterUniqueByKey()

> **filterUniqueByKey**\<`T`\>(`array`, `key`): `T`[]

Defined in: [packages/orbit-core/src/utils/filterUniqueByKey.ts:13](https://github.com/TuwaIO/orbit/blob/dbd48a891d655266bf02a1dde85e978a83466bd2/packages/orbit-core/src/utils/filterUniqueByKey.ts#L13)

Filters an array of objects to keep only the first occurrence of an object
based on a unique value of a specified key.

This function is generic and type-safe. It iterates through the array and uses a
Set to track already encountered key values, effectively removing duplicates.

## Type Parameters

### T

`T`

The type of the objects in the array.

## Parameters

### array

`T`[]

The array of objects to be filtered.

### key

keyof `T`

The object key (property name) whose values must be unique.

## Returns

`T`[]

The filtered array containing only objects with unique key values.
