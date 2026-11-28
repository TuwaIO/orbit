import { afterEach, beforeEach, describe, expect, it, type MockInstance, vi } from 'vitest';

import {
  clearSolanaAvatarCache,
  getSolanaAddressAvatar,
  getSolanaAvatarCacheSize,
  preloadSolanaAvatar,
} from './getSolanaAddressAvatar';

const ADDRESS = 'So11111111111111111111111111111111111111112';
const OTHER_ADDRESS = '11111111111111111111111111111111';
const SVG_URL = 'data:image/svg+xml,';

/** The SVG of an avatar drawn here, which is a `data:` URL. */
const svgOf = (url: string) => {
  expect(url.startsWith(SVG_URL)).toBe(true);
  return decodeURIComponent(url.slice(SVG_URL.length));
};

/** The cells an avatar drawn here fills, as `x,y`. */
const cellsOf = (url: string) => [...svgOf(url).matchAll(/<rect x="(\d+)" y="(\d+)"/g)].map(([, x, y]) => `${x},${y}`);

const snsAnswer = (domain: string, image: string) =>
  ({ ok: true, json: async () => ({ result: [{ domain, image }] }) }) as unknown as Response;

describe('getSolanaAddressAvatar', () => {
  // A test reaches no network: a request it does not answer itself fails
  let fetchSpy: MockInstance<typeof fetch>;

  beforeEach(() => {
    clearSolanaAvatarCache();
    vi.restoreAllMocks();
    fetchSpy = vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('A test sends nothing over the network'));
  });

  afterEach(() => {
    clearSolanaAvatarCache();
    vi.restoreAllMocks();
  });

  it('draws the avatar of an address here, with no request', async () => {
    expect(svgOf(await getSolanaAddressAvatar(ADDRESS))).toMatch(/^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('draws the same avatar for an address every time, and another one for another address', async () => {
    const avatar = await getSolanaAddressAvatar(ADDRESS);

    expect(await getSolanaAddressAvatar(ADDRESS)).toBe(avatar);
    expect(await getSolanaAddressAvatar(OTHER_ADDRESS)).not.toBe(avatar);
  });

  it('fills cells of a grid of 5 by 5, mirrored about its middle column', async () => {
    for (const input of [ADDRESS, OTHER_ADDRESS, 'name.sol']) {
      const cells = new Set(cellsOf(await getSolanaAddressAvatar(input)));
      expect(cells.size).toBeGreaterThan(0);
      for (const cell of cells) {
        const [x, y] = cell.split(',').map(Number);
        expect(x).toBeLessThan(5);
        expect(y).toBeLessThan(5);
        expect(cells.has(`${4 - x},${y}`)).toBe(true);
      }
    }
  });

  it('draws an avatar for an empty input too', async () => {
    expect(cellsOf(await getSolanaAddressAvatar('')).length).toBeGreaterThan(0);
  });

  it('asks no SNS service for a .sol domain unless snsAvatar is on', async () => {
    svgOf(await getSolanaAddressAvatar('test.sol'));
    svgOf(await getSolanaAddressAvatar('test.sol', { snsAvatar: false }));
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('with snsAvatar, takes the image of a .sol domain from the SNS image API and keeps it', async () => {
    const image = 'https://arweave.net/avatar-image.png';
    fetchSpy.mockResolvedValueOnce(snsAnswer('test.sol', image));

    expect(await getSolanaAddressAvatar('test.sol', { snsAvatar: true })).toBe(image);
    expect(await getSolanaAddressAvatar('test.sol', { snsAvatar: true })).toBe(image);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith('https://image-api.bonfida.com/image?domain=test.sol');
    expect(getSolanaAvatarCacheSize()).toBe(1);
  });

  it('without snsAvatar, draws the avatar of a domain whose SNS image it kept', async () => {
    fetchSpy.mockResolvedValueOnce(snsAnswer('test.sol', 'https://arweave.net/a.png'));
    await getSolanaAddressAvatar('test.sol', { snsAvatar: true });

    svgOf(await getSolanaAddressAvatar('test.sol'));
  });

  it('with snsAvatar, draws the avatar here when the SNS image API has none', async () => {
    fetchSpy.mockResolvedValueOnce({ ok: false } as unknown as Response);

    svgOf(await getSolanaAddressAvatar('test.sol', { snsAvatar: true }));
  });

  it('with snsAvatar, sends nothing for an address, which has no SNS image', async () => {
    svgOf(await getSolanaAddressAvatar(ADDRESS, { snsAvatar: true }));
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('preloads with the options it is given', async () => {
    fetchSpy.mockResolvedValue(snsAnswer('test.sol', 'https://arweave.net/a.png'));

    await preloadSolanaAvatar('test.sol');
    expect(fetchSpy).not.toHaveBeenCalled();

    await preloadSolanaAvatar('test.sol', { snsAvatar: true });
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
