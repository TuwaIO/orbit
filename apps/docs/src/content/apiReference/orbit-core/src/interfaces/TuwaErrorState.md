[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# TuwaErrorState

Defined in: [packages/orbit-core/src/utils/normalizeError.ts:11](https://github.com/TuwaIO/orbit/blob/87f8ca9885375ed00fc139a33147200ac10c74cf/packages/orbit-core/src/utils/normalizeError.ts#L11)

Normalized error state that is safe for Zustand persistence.
- `message`: User-friendly error message for display
- `raw`: Full error details as JSON-serializable object for debugging/copying

## Properties

### message

> **message**: `string`

Defined in: [packages/orbit-core/src/utils/normalizeError.ts:12](https://github.com/TuwaIO/orbit/blob/87f8ca9885375ed00fc139a33147200ac10c74cf/packages/orbit-core/src/utils/normalizeError.ts#L12)

***

### raw

> **raw**: `Record`\<`string`, `unknown`\>

Defined in: [packages/orbit-core/src/utils/normalizeError.ts:13](https://github.com/TuwaIO/orbit/blob/87f8ca9885375ed00fc139a33147200ac10c74cf/packages/orbit-core/src/utils/normalizeError.ts#L13)
