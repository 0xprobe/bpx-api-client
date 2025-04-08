import { Depth, FundingIntervalRates, Kline, KlineInterval, Market, MarkPrice, OpenInterest, Ticker, TickerInterval } from '../../../../src/http/public/markets/markets.types';
import { isSuccess } from '../../../../src/http/bpxHttpHandler';
import { createClient } from '../../setup';

describe('Public Markets API Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;
  const testSymbol = 'BTC_USDC_PERP';

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('getMarket', () => {
    it('should return market information for a specific symbol', async () => {
      const response = await bpxClient.markets.getMarket(testSymbol);
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      
      const market = response.data as Market;
      expect(market).toMatchObject({
        symbol: expect.any(String),
        baseSymbol: expect.any(String),
        quoteSymbol: expect.any(String),
        marketType: expect.stringMatching(/^(SPOT|PERP|IPERP|DATED|PREDICTION|RFQ)$/),
        orderBookState: expect.any(String),
        createdAt: expect.any(String)
      });
    });
  });

  describe('getMarkets', () => {
    it('should return list of all markets', async () => {
      const response = await bpxClient.markets.getMarkets();
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const markets = response.data as Market[];
      expect(markets.length).toBeGreaterThan(0);
      
      // Verify structure of the first market
      const firstMarket = markets[0];
      expect(firstMarket).toHaveProperty('symbol');
      expect(firstMarket).toHaveProperty('baseSymbol');
      expect(firstMarket).toHaveProperty('quoteSymbol');
      expect(firstMarket).toHaveProperty('marketType');
      expect(firstMarket).toHaveProperty('orderBookState');
      expect(firstMarket).toHaveProperty('createdAt');
    });
  });

  describe('getTicker', () => {
    it('should return ticker information for a specific symbol', async () => {
      const response = await bpxClient.markets.getTicker({ symbol: testSymbol });
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      
      const ticker = response.data as Ticker;
      expect(ticker).toMatchObject({
        symbol: expect.any(String),
        firstPrice: expect.any(String),
        lastPrice: expect.any(String),
        priceChange: expect.any(String),
        priceChangePercent: expect.any(String),
        high: expect.any(String),
        low: expect.any(String),
        volume: expect.any(String),
        quoteVolume: expect.any(String),
        trades: expect.any(String)
      });
    });
  });

  describe('getTickers', () => {
    it('should return tickers for all markets', async () => {
      const response = await bpxClient.markets.getTickers(TickerInterval.OneDay);
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const tickers = response.data as Ticker[];
      expect(tickers.length).toBeGreaterThan(0);
      
      // Verify structure of the first ticker
      const firstTicker = tickers[0];
      expect(firstTicker).toHaveProperty('symbol');
      expect(firstTicker).toHaveProperty('firstPrice');
      expect(firstTicker).toHaveProperty('lastPrice');
      expect(firstTicker).toHaveProperty('priceChange');
      expect(firstTicker).toHaveProperty('priceChangePercent');
      expect(firstTicker).toHaveProperty('high');
      expect(firstTicker).toHaveProperty('low');
      expect(firstTicker).toHaveProperty('volume');
      expect(firstTicker).toHaveProperty('quoteVolume');
      expect(firstTicker).toHaveProperty('trades');
    });
  });

  describe('getDepth', () => {
    it('should return order book depth for a specific symbol', async () => {
      const response = await bpxClient.markets.getDepth(testSymbol);
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      
      const depth = response.data as Depth;
      expect(depth).toMatchObject({
        bids: expect.arrayContaining([
          expect.arrayContaining([
            expect.any(String),  // price
            expect.any(String)   // quantity
          ])
        ]),
        asks: expect.arrayContaining([
          expect.arrayContaining([
            expect.any(String),  // price
            expect.any(String)   // quantity
          ])
        ]),
        lastUpdateId: expect.any(String),
        timestamp: expect.any(Number)
      });
    });
  });

  describe('getKlines', () => {
    it('should return kline data for a specific symbol', async () => {
      const now = Math.floor(Date.now() / 1000); // Convert to Unix timestamp (seconds)
      const oneHourAgo = now - 3600; // 1 hour ago in seconds
      
      const response = await bpxClient.markets.getKlines({
        symbol: testSymbol,
        interval: KlineInterval.OneHour,
        startTime: oneHourAgo,
        endTime: now
      });
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const klines = response.data as Kline[];
      expect(klines.length).toBeGreaterThan(0);
      
      // Verify structure of the first kline
      const firstKline = klines[0];
      expect(firstKline).toMatchObject({
        start: expect.any(String),
        end: expect.any(String),
        open: expect.any(String),
        high: expect.any(String),
        low: expect.any(String),
        close: expect.any(String),
        volume: expect.any(String),
        quoteVolume: expect.any(String),
        trades: expect.any(String)
      });
    });
  });

  describe('getMarkPrices', () => {
    it('should return mark prices for all markets', async () => {
      const response = await bpxClient.markets.getMarkPrices();
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const markPrices = response.data as MarkPrice[];
      expect(markPrices.length).toBeGreaterThan(0);
      
      // Verify structure of the first mark price
      const firstMarkPrice = markPrices[0];
      expect(firstMarkPrice).toMatchObject({
        symbol: expect.any(String),
        fundingRate: expect.any(String),
        indexPrice: expect.any(String),
        markPrice: expect.any(String),
        nextFundingTimestamp: expect.any(Number)
      });
    });
  });

  describe('getOpenInterest', () => {
    it('should return open interest for all markets', async () => {
      const response = await bpxClient.markets.getOpenInterest();
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const openInterests = response.data as OpenInterest[];
      expect(openInterests.length).toBeGreaterThan(0);
      
      // Verify structure of the first open interest
      const firstOpenInterest = openInterests[0];
      expect(firstOpenInterest).toMatchObject({
        symbol: expect.any(String),
        openInterest: expect.any(String),
        timestamp: expect.any(Number)
      });
    });
  });

  describe('getFundingIntervalRates', () => {
    it('should return funding interval rates for a specific symbol', async () => {
      const response = await bpxClient.markets.getFundingIntervalRates({
        symbol: testSymbol,
        limit: 10
      });
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const fundingRates = response.data as FundingIntervalRates[];
      expect(fundingRates.length).toBeGreaterThan(0);
      
      // Verify structure of the first funding rate
      const firstFundingRate = fundingRates[0];
      expect(firstFundingRate).toMatchObject({
        symbol: expect.any(String),
        intervalEndTimestamp: expect.any(String),
        fundingRate: expect.any(String)
      });
    });
  });
}); 