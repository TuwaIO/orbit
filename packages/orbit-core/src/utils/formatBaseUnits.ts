/**
 * An integer amount in the smallest unit of a currency as a decimal number, for example wei as gwei (`decimals` 9) or
 * lamports as SOL (`decimals` 9): exact, with a dot, without grouping, trailing zeros or rounding.
 *
 * @example
 * ```typescript
 * formatBaseUnits('89540000', 6); // "89.54"
 * formatBaseUnits(1500000000n, 9); // "1.5"
 * ```
 *
 * @param value - The amount, as a number, a decimal string or a bigint.
 * @param decimals - The number of decimals of the displayed unit.
 * @returns The decimal string, or `undefined` when `value` is missing, negative or not an integer.
 */
export function formatBaseUnits(
  value: string | number | bigint | null | undefined,
  decimals: number,
): string | undefined {
  if (value === null || value === undefined) return undefined;
  const digits = String(value);
  if (!/^\d+$/.test(digits)) return undefined;

  const padded = digits.padStart(decimals + 1, '0');
  const whole = padded.slice(0, padded.length - decimals).replace(/^0+(?=\d)/, '');
  const fraction = padded.slice(padded.length - decimals).replace(/0+$/, '');
  return fraction ? `${whole}.${fraction}` : whole;
}
