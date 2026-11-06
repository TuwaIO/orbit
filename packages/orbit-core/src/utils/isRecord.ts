/**
 * Whether a value is an object with fields to read: anything but `null` and an array, class instances included.
 *
 * @param value - The value.
 * @returns `true` for an object.
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
