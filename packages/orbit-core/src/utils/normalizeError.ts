/**
 * Persistence-safe error normalization for Web3 errors.
 * Handles circular references, functions, and non-serializable properties.
 */

/**
 * Normalized error state that is safe for Zustand persistence.
 * - `message`: User-friendly error message for display
 * - `raw`: Full error details as JSON-serializable object for debugging/copying
 */
export interface TuwaErrorState {
  message: string;
  raw: Record<string, unknown>;
}

/**
 * Known error fields to extract from Web3 errors (viem, wagmi, wallet providers).
 */
const KNOWN_ERROR_FIELDS = [
  'code',
  'name',
  'shortMessage',
  'details',
  'cause',
  'metaMessages',
  'data',
  'reason',
  'method',
  'transaction',
  'receipt',
  'action',
  'version',
] as const;

/**
 * Creates a JSON replacer that handles circular references and non-serializable values.
 */
function createSafeReplacer(): (key: string, value: unknown) => unknown {
  const seen = new WeakSet<object>();

  return (_key: string, value: unknown): unknown => {
    // Handle primitives
    if (value === null || typeof value !== 'object') {
      // Skip functions and symbols
      if (typeof value === 'function' || typeof value === 'symbol') {
        return undefined;
      }
      // Handle bigint
      if (typeof value === 'bigint') {
        return value.toString();
      }
      return value;
    }

    // Handle circular references
    if (seen.has(value)) {
      return '[Circular]';
    }
    seen.add(value);

    // Handle Error objects specially
    if (value instanceof Error) {
      const errorObj: Record<string, unknown> = {
        name: value.name,
        message: value.message,
      };

      // Extract stack in development
      if (value.stack) {
        errorObj.stack = value.stack;
      }

      // Extract any additional properties
      for (const key of Object.keys(value)) {
        if (!(key in errorObj)) {
          errorObj[key] = (value as unknown as Record<string, unknown>)[key];
        }
      }

      return errorObj;
    }

    return value;
  };
}

/**
 * Extracts known fields from an error object.
 */
function extractKnownFields(error: unknown): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  if (error && typeof error === 'object') {
    for (const field of KNOWN_ERROR_FIELDS) {
      if (field in error) {
        result[field] = (error as Record<string, unknown>)[field];
      }
    }

    // Always include message if present
    if ('message' in error) {
      result.message = (error as Record<string, unknown>).message;
    }

    // Include stack for debugging
    if ('stack' in error) {
      result.stack = (error as Record<string, unknown>).stack;
    }
  }

  return result;
}

/**
 * Safely serializes an error object to a JSON-serializable format.
 * Handles circular references, functions, and non-serializable values.
 */
function safeSerialize(value: unknown): Record<string, unknown> {
  try {
    const replacer = createSafeReplacer();
    const jsonString = JSON.stringify(value, replacer);
    return JSON.parse(jsonString) as Record<string, unknown>;
  } catch {
    // Fallback if serialization fails
    return { _serializationError: 'Failed to serialize error object' };
  }
}

/**
 * Normalizes any error into a persistence-safe TuwaErrorState.
 *
 * @param error - Any error value (Error, string, object, etc.)
 * @returns TuwaErrorState with user-friendly message and full raw details
 *
 * @example
 * ```typescript
 * try {
 *   await sendTransaction();
 * } catch (e) {
 *   const normalized = normalizeError(e);
 *   set({ error: normalized });
 * }
 * ```
 */
export function normalizeError(error: unknown): TuwaErrorState {
  // Handle null/undefined
  if (error == null) {
    return {
      message: 'Unknown error',
      raw: { originalType: 'null' },
    };
  }

  // Handle string errors
  if (typeof error === 'string') {
    return {
      message: error,
      raw: { message: error, originalType: 'string' },
    };
  }

  // Handle Error instances
  if (error instanceof Error) {
    // Use shortMessage if available (viem errors), otherwise message
    const message =
      ('shortMessage' in error && typeof error.shortMessage === 'string' ? error.shortMessage : error.message) ||
      'Unknown error';

    // Extract known fields first, then merge with full serialization
    const knownFields = extractKnownFields(error);
    const fullSerialized = safeSerialize(error);

    return {
      message,
      raw: {
        ...fullSerialized,
        ...knownFields, // Known fields take precedence
        originalType: error.name || 'Error',
      },
    };
  }

  // Handle plain objects
  if (typeof error === 'object') {
    const message =
      ('message' in error && typeof error.message === 'string'
        ? error.message
        : 'shortMessage' in error && typeof error.shortMessage === 'string'
          ? error.shortMessage
          : 'Unknown error') || 'Unknown error';

    return {
      message,
      raw: {
        ...safeSerialize(error),
        originalType: 'object',
      },
    };
  }

  // Handle other primitives
  return {
    message: String(error),
    raw: { value: String(error), originalType: typeof error },
  };
}
