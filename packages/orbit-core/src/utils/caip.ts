import { isAddress } from './addressValidation';
import { getSolanaChainId } from './solanaChainIds';

/**
 * A CAIP-2 chain ID: `<namespace>:<reference>`, for example `eip155:8453` or
 * `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp`.
 */
export type Caip2ChainId = `${string}:${string}`;

/** A CAIP-10 account ID: `<CAIP-2 chain ID>:<address>`, for example `eip155:1:0xab16…`. */
export type Caip10AccountId = `${string}:${string}:${string}`;

/**
 * A CAIP-19 asset type ID: `<CAIP-2 chain ID>/<asset namespace>:<asset reference>`, for example
 * `eip155:8453/erc20:0x8335…` (an ERC-20 token), `solana:5eykt…/token:EPjF…` (an SPL token) or `eip155:1/slip44:60`
 * (the native coin).
 */
export type Caip19AssetId = `${string}:${string}/${string}:${string}`;

const NAMESPACE = /^[-a-z0-9]{3,8}$/;
const REFERENCE = /^[-_a-zA-Z0-9]{1,32}$/;
const ACCOUNT_ADDRESS = /^[-.%a-zA-Z0-9]{1,128}$/;
const ASSET_REFERENCE = /^[-.%a-zA-Z0-9]{1,128}$/;

/**
 * Splits a CAIP-2 chain ID into its namespace and reference, validating both against the CAIP-2 grammar.
 *
 * @example
 * ```typescript
 * parseCaip2ChainId('eip155:8453'); // { namespace: 'eip155', reference: '8453' }
 * parseCaip2ChainId('8453'); // undefined
 * ```
 *
 * @param chainId - The chain ID to parse.
 * @returns The namespace and reference, or `undefined` when the value is not a CAIP-2 chain ID.
 */
export function parseCaip2ChainId(chainId: string): { namespace: string; reference: string } | undefined {
  const separator = chainId.indexOf(':');
  if (separator < 0) return undefined;
  const namespace = chainId.slice(0, separator);
  const reference = chainId.slice(separator + 1);
  return NAMESPACE.test(namespace) && REFERENCE.test(reference) ? { namespace, reference } : undefined;
}

/**
 * Turns a chain identifier into a CAIP-2 chain ID: EVM chain numbers and their decimal strings become
 * `eip155:<number>`, every Solana form accepted by {@link getSolanaChainId} becomes its genesis-hash ID, and a valid
 * CAIP-2 chain ID is returned as it is.
 *
 * @example
 * ```typescript
 * toCaip2ChainId(8453); // "eip155:8453"
 * toCaip2ChainId('solana:devnet'); // "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1"
 * toCaip2ChainId('base'); // undefined
 * ```
 *
 * @param chainId - An EVM chain number, a Solana chain in any form, or a CAIP-2 chain ID.
 * @returns The CAIP-2 chain ID, or `undefined` when the value cannot be read as one.
 */
export function toCaip2ChainId(chainId: string | number): Caip2ChainId | undefined {
  if (typeof chainId === 'number') {
    return Number.isSafeInteger(chainId) && chainId > 0 ? `eip155:${chainId}` : undefined;
  }
  const solana = getSolanaChainId(chainId);
  if (solana) return solana as Caip2ChainId;
  if (/^[1-9][0-9]{0,15}$/.test(chainId)) return `eip155:${chainId}`;
  return parseCaip2ChainId(chainId) ? (chainId as Caip2ChainId) : undefined;
}

// EVM and Solana addresses are checked by their own rules; other namespaces only by the CAIP-10 grammar
function isAccountAddress(namespace: string, address: string): boolean {
  if (namespace === 'eip155') return isAddress(address, 'evm');
  if (namespace === 'solana') return isAddress(address, 'solana');
  return ACCOUNT_ADDRESS.test(address);
}

/**
 * Builds a CAIP-10 account ID. The chain is normalized with {@link toCaip2ChainId}; the address is trimmed, checked
 * against its chain (`0x` and 40 hex characters for EVM, base58 for Solana) and keeps its case.
 *
 * @example
 * ```typescript
 * formatCaip10AccountId(8453, '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913');
 * // "eip155:8453:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
 * formatCaip10AccountId('devnet', '0x1234'); // undefined
 * ```
 *
 * @param chainId - The chain, in any form accepted by {@link toCaip2ChainId}.
 * @param address - The account address.
 * @returns The CAIP-10 account ID, or `undefined` when the chain or the address is invalid.
 */
export function formatCaip10AccountId(chainId: string | number, address: string): Caip10AccountId | undefined {
  const chain = toCaip2ChainId(chainId);
  if (!chain) return undefined;
  const parsed = parseCaip2ChainId(chain);
  const trimmed = address.trim();
  if (!parsed || !isAccountAddress(parsed.namespace, trimmed)) return undefined;
  return `${chain}:${trimmed}`;
}

/**
 * Splits a CAIP-10 account ID into its chain and address, validating both.
 *
 * @example
 * ```typescript
 * parseCaip10AccountId('eip155:8453:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913');
 * // { chainId: 'eip155:8453', namespace: 'eip155', reference: '8453', address: '0x8335…' }
 * ```
 *
 * @param accountId - The CAIP-10 account ID to parse.
 * @returns The chain ID, its namespace and reference, and the address, or `undefined` when the value is not a valid
 * CAIP-10 account ID.
 */
export function parseCaip10AccountId(
  accountId: string,
): { chainId: Caip2ChainId; namespace: string; reference: string; address: string } | undefined {
  const separator = accountId.lastIndexOf(':');
  if (separator < 0) return undefined;
  const chain = parseCaip2ChainId(accountId.slice(0, separator));
  const address = accountId.slice(separator + 1);
  if (!chain || !isAccountAddress(chain.namespace, address)) return undefined;
  return {
    chainId: `${chain.namespace}:${chain.reference}`,
    namespace: chain.namespace,
    reference: chain.reference,
    address,
  };
}

/**
 * Builds a CAIP-19 asset type ID from a chain, an asset namespace (`erc20`, `token`, `slip44`, …) and an asset
 * reference (a token contract, an SPL mint, a SLIP-44 coin type).
 *
 * @example
 * ```typescript
 * formatCaip19AssetId(8453, 'erc20', '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913');
 * // "eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
 * formatCaip19AssetId('mainnet', 'slip44', '501'); // "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp/slip44:501"
 * ```
 *
 * @param chainId - The chain, in any form accepted by {@link toCaip2ChainId}.
 * @param assetNamespace - The CAIP-19 asset namespace: 3–8 lowercase letters, digits or `-`.
 * @param assetReference - The asset reference within that namespace.
 * @returns The CAIP-19 asset type ID, or `undefined` when any part is invalid.
 */
export function formatCaip19AssetId(
  chainId: string | number,
  assetNamespace: string,
  assetReference: string,
): Caip19AssetId | undefined {
  const chain = toCaip2ChainId(chainId);
  if (!chain || !NAMESPACE.test(assetNamespace) || !ASSET_REFERENCE.test(assetReference)) return undefined;
  return `${chain}/${assetNamespace}:${assetReference}`;
}

/**
 * Splits a CAIP-19 asset type ID into its chain, asset namespace and asset reference. IDs of single tokens
 * (`eip155:1/erc721:0x…/1`) are not asset types and are rejected.
 *
 * @example
 * ```typescript
 * parseCaip19AssetId('eip155:1/slip44:60'); // { chainId: 'eip155:1', assetNamespace: 'slip44', assetReference: '60' }
 * ```
 *
 * @param assetId - The CAIP-19 asset type ID to parse.
 * @returns The chain ID, asset namespace and asset reference, or `undefined` when the value is not a valid CAIP-19
 * asset type ID.
 */
export function parseCaip19AssetId(
  assetId: string,
): { chainId: Caip2ChainId; assetNamespace: string; assetReference: string } | undefined {
  const slash = assetId.indexOf('/');
  if (slash < 0) return undefined;
  const chain = parseCaip2ChainId(assetId.slice(0, slash));
  const rest = assetId.slice(slash + 1);
  const colon = rest.indexOf(':');
  if (!chain || colon < 0) return undefined;
  const assetNamespace = rest.slice(0, colon);
  const assetReference = rest.slice(colon + 1);
  if (!NAMESPACE.test(assetNamespace) || !ASSET_REFERENCE.test(assetReference)) return undefined;
  return { chainId: `${chain.namespace}:${chain.reference}`, assetNamespace, assetReference };
}
