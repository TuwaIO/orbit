import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createRpcOver, URL_REST_MS } from './createRpcOver';

const MAIN = 'https://main.example/';
const SPARE = 'https://spare.example/';
type Answer = number | 'refused';

/** Two endpoints of a cluster, each with what it answers: a slot, or nothing. */
function endpoints(answers: Record<string, Answer>) {
  const asked: string[] = [];
  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: string | URL | Request) => {
      const url = String(input instanceof Request ? input.url : input);
      asked.push(url);
      const answer = answers[url];
      if (answer === 'refused') throw new TypeError('fetch failed');
      if (answer >= 400) return new Response('too many requests', { status: answer });
      return Response.json({ jsonrpc: '2.0', id: '0', result: answer });
    }),
  );
  return { asked, answers };
}

describe('createRpcOver', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it.each<[string, Answer]>([
    ['out of its limit', 429],
    ['down', 503],
    ['out of reach', 'refused'],
  ])('reads the next endpoint while the first is %s', async (_name, refusal) => {
    const { asked } = endpoints({ [MAIN]: refusal, [SPARE]: 7 });

    expect(await createRpcOver([MAIN, SPARE]).getSlot().send()).toBe(7n);
    expect(asked).toEqual([MAIN, SPARE]);
  });

  it('leaves an endpoint that failed alone for a while, then reads it first again', async () => {
    const { asked, answers } = endpoints({ [MAIN]: 429, [SPARE]: 7 });
    const rpc = createRpcOver([MAIN, SPARE]);
    await rpc.getSlot().send();
    await rpc.getSlot().send();
    expect(asked).toEqual([MAIN, SPARE, SPARE]);

    answers[MAIN] = 9;
    vi.advanceTimersByTime(URL_REST_MS);
    expect(await rpc.getSlot().send()).toBe(9n);
    expect(asked.at(-1)).toBe(MAIN);
  });

  it('asks every endpoint when all of them have failed, and gives the last error', async () => {
    const { asked, answers } = endpoints({ [MAIN]: 429, [SPARE]: 503 });
    const rpc = createRpcOver([MAIN, SPARE]);
    await expect(rpc.getSlot().send()).rejects.toThrow('503');

    answers[SPARE] = 7;
    expect(await rpc.getSlot().send()).toBe(7n);
    expect(asked).toEqual([MAIN, SPARE, MAIN, SPARE]);
  });

  it('asks no other endpoint once the caller gave up', async () => {
    const controller = new AbortController();
    const { asked } = endpoints({ [MAIN]: 'refused', [SPARE]: 7 });
    controller.abort();

    await expect(createRpcOver([MAIN, SPARE]).getSlot().send({ abortSignal: controller.signal })).rejects.toThrow();
    expect(asked).not.toContain(SPARE);
  });

  it('is the plain RPC of its endpoint when there is one', async () => {
    const { asked } = endpoints({ [MAIN]: 429 });

    await expect(createRpcOver([MAIN]).getSlot().send()).rejects.toThrow('429');
    expect(asked).toEqual([MAIN]);
  });
});
