/**
 * An address or a hash shortened to its start and end, as wallets show it.
 *
 * @example
 * ```typescript
 * shortAddress('0x1111111111111111111111111111111111112222'); // "0x1111…2222"
 * ```
 *
 * @param address - The address or hash (`0x…` or base58).
 * @param head - Characters kept at the start; `0x` counts toward it (default `6` for `0x`, `4` otherwise).
 * @param tail - Characters kept at the end (default `4`).
 * @returns The shortened value; a value that nothing would be saved on stays unchanged.
 */
export function shortAddress(address: string, head = address.startsWith('0x') ? 6 : 4, tail = 4): string {
  return address.length <= head + tail + 1 ? address : `${address.slice(0, head)}…${address.slice(-tail)}`;
}
