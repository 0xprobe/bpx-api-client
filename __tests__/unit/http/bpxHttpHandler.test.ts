import { BpxHttpHandler } from '../../../src/http/bpxHttpHandler';
import { BpxCredentials } from '../../../src/authentication/bpxCredentials';
import { HttpMethod } from '../../../src/http/common/api.types';

describe('BpxHttpHandler - GET query string building', () => {
  let handler: BpxHttpHandler;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    handler = new BpxHttpHandler(new BpxCredentials('API-KEY', 'API-SECRET'));
    fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: () => 'application/json' },
      json: async () => ([]),
      text: async () => ''
    });
    (global as any).fetch = fetchMock;
  });

  const calledUrl = () => fetchMock.mock.calls[0][0] as string;

  // Regression test: optional params left undefined/null must not be serialized
  // as the literal strings "undefined"/"null". '/api/v1/trades' is a public
  // endpoint (no instruction), so request signing is skipped here.
  it('drops undefined and null params instead of sending them literally', async () => {
    await handler.execute(HttpMethod.GET, '/api/v1/trades', {
      symbol: 'SOL_USDC',
      limit: undefined,
      offset: null
    });

    const url = calledUrl();
    expect(url).toContain('symbol=SOL_USDC');
    expect(url).not.toContain('undefined');
    expect(url).not.toContain('null');
  });

  it('does not append a trailing "?" for an all-empty/undefined body', async () => {
    await handler.execute(HttpMethod.GET, '/api/v1/trades', {
      symbol: undefined,
      limit: undefined
    });

    expect(calledUrl()).toBe('https://api.backpack.exchange/api/v1/trades');
  });

  it('preserves defined params', async () => {
    await handler.execute(HttpMethod.GET, '/api/v1/trades', { symbol: 'SOL_USDC', limit: 10 });

    const url = calledUrl();
    expect(url).toContain('symbol=SOL_USDC');
    expect(url).toContain('limit=10');
  });

  // Array params must be expanded into repeated keys (style=form, explode=true);
  // the comma-joined form is rejected by the server with a 400.
  it('expands array params into repeated keys', async () => {
    await handler.execute(HttpMethod.GET, '/api/v1/markets', { marketType: ['SPOT', 'PERP'] });

    const url = calledUrl();
    expect(url).toContain('marketType=SPOT&marketType=PERP');
    expect(url).not.toContain('SPOT%2CPERP');
    expect(url).not.toContain('SPOT,PERP');
  });

  it('serializes a single-element array as one key', async () => {
    await handler.execute(HttpMethod.GET, '/api/v1/markets', { marketType: ['PERP'] });

    expect(calledUrl()).toBe('https://api.backpack.exchange/api/v1/markets?marketType=PERP');
  });
});
