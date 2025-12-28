/**
 * Check if a string is a valid Ethereum address
 */
function isEvmAddress(value: string): boolean {
  // Check if it starts with 0x and has correct length (42 characters total)
  return /^0x[a-fA-F0-9]{40}$/.test(value.trim());
}

/**
 * Check if a string is a valid Solana address (Base58 format)
 */
function isSolanaAddress(value: string): boolean {
  // Solana addresses are 32-44 characters long and use Base58 encoding
  // Base58 uses: 123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  return base58Regex.test(value.trim());
}

/**
 * Universal address validation function that supports multiple blockchain formats
 * @param value - Address string to validate
 * @param type - Optional blockchain type to validate against ('evm' | 'solana' | 'auto')
 * @returns boolean indicating if the address is valid
 */
export function isAddress(value: string, type: 'evm' | 'solana' | 'auto' = 'auto'): boolean {
  if (!value) {
    return false;
  }

  const trimmedValue = value.trim();

  switch (type) {
    case 'evm':
      return isEvmAddress(trimmedValue);
    case 'solana':
      return isSolanaAddress(trimmedValue);
    case 'auto':
    default:
      // Try EVM first (more common), then Solana
      return isEvmAddress(trimmedValue) || isSolanaAddress(trimmedValue);
  }
}
