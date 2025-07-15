import { Depth, FundingIntervalRates, Kline, KlineInterval, KlinePriceType, Market, MarkPrice, OpenInterest, Ticker, TickerInterval } from '../../../../src/http/public/markets/markets.types';
import { isSuccess } from '../../../../src/http/bpxHttpHandler';
import { createClient } from '../../setup';

describe('Public Markets API Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;
  const BTC_USDC_PERP = 'BTC_USDC_PERP';

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Get markets', () => {
    it('Retrieves all the markets that are supported by the exchange', async () => {
      const response = await bpxClient.markets.getMarkets();
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const markets = response.data as Market[];
      expect(markets.length).toBeGreaterThan(0);
      
      markets.forEach(market => {
        expect(market).toMatchObject({
          symbol: expect.any(String),
          baseSymbol: expect.any(String),
          quoteSymbol: expect.any(String),
          marketType: expect.any(String),
          filters: expect.any(Object),
          orderBookState: expect.stringMatching(/^(Open|Closed|CancelOnly|LimitOnly|PostOnly)$/),
          createdAt: expect.any(String)
        });

        if (market.imfFunction !== null) {
          expect(market.imfFunction).toMatchObject({
            type: expect.any(String),
            base: expect.any(String),
            factor: expect.any(String)
          });
        }
        if (market.mmfFunction !== null) {
          expect(market.mmfFunction).toMatchObject({
            type: expect.any(String),
            base: expect.any(String),
            factor: expect.any(String)
          });
        }
        if (market.fundingInterval !== null) {
          expect(typeof market.fundingInterval).toBe('number');
        }
        if (market.openInterestLimit !== null) {
          expect(typeof market.openInterestLimit).toBe('string');
        }
        if (market.fundingRateUpperBound !== null) {
          expect(typeof market.fundingRateUpperBound).toBe("string");
        }
        if (market.fundingRateLowerBound !== null) {
          expect(typeof market.fundingRateLowerBound).toBe("string");
        }
      });
    });
  });

  describe('Get market', () => {
    it('Retrieves a market supported by the exchange', async () => {
      const response = await bpxClient.markets.getMarket(BTC_USDC_PERP);
      
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

      if (market.imfFunction !== null) {
        expect(market.imfFunction).toMatchObject({
          type: expect.any(String),
          base: expect.any(String),
          factor: expect.any(String)
        });
      }
      if (market.mmfFunction !== null) {
        expect(market.mmfFunction).toMatchObject({
          type: expect.any(String),
          base: expect.any(String),
          factor: expect.any(String)
        });
      }
      if (market.fundingInterval !== null) {
        expect(typeof market.fundingInterval).toBe('number');
      }
      if (market.openInterestLimit !== null) {
        expect(typeof market.openInterestLimit).toBe('string');
      }
    });
  });

  describe('Get ticker', () => {
    it('Retrieves summarised statistics for the last 24 hours for the given market symbol', async () => {
      const response = await bpxClient.markets.getTicker({ symbol: BTC_USDC_PERP });
      
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

  describe('Get tickers', () => {
    it('Retrieves summarised statistics for the last 24 hours for all market symbols', async () => {

      const intervalArray = Object.values(TickerInterval);
      const randomInterval = intervalArray[Math.floor(Math.random() * intervalArray.length)];

      const response = await bpxClient.markets.getTickers(randomInterval);
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const tickers = response.data as Ticker[];
      expect(tickers.length).toBeGreaterThan(0);
      
      tickers.forEach(ticker => {
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
  });

  describe('Get depth', () => {
    it('Retrieves the order book depth for a given market symbol', async () => {
      const response = await bpxClient.markets.getDepth(BTC_USDC_PERP);
      
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

  describe('Get K-lines', () => {
    it('Get K-Lines for the given market symbol, optionally providing a startTime and endTime', async () => {
      
      const now = Math.floor(Date.now() / 1000); // Convert to Unix timestamp (seconds)
      const oneHourAgo = now - 3600; // 1 hour ago in seconds

      const intervalArray = Object.values(KlineInterval);
      const randomInterval = intervalArray[Math.floor(Math.random() * intervalArray.length)];
      
      const response = await bpxClient.markets.getKlines({
        symbol: BTC_USDC_PERP,
        interval: randomInterval,
        startTime: oneHourAgo,
        endTime: now,
        priceType: KlinePriceType.Last
      });
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const klines = response.data as Kline[];
      // expect(klines.length).toBeGreaterThan(0);
      
      klines.forEach(kline => {
        expect(kline).toMatchObject({
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
  });

  describe('Get all mark prices', () => {
    it('Retrieves mark price, index price and the funding rate for the current interval for all symbols, or the symbol specified', async () => {
      const response = await bpxClient.markets.getMarkPrices();
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const markPrices = response.data as MarkPrice[];
      expect(markPrices.length).toBeGreaterThan(0);
      
      markPrices.forEach(markPrice => {
        expect(markPrice).toMatchObject({
          symbol: expect.any(String),
          fundingRate: expect.any(String),
          indexPrice: expect.any(String),
          markPrice: expect.any(String),
          nextFundingTimestamp: expect.any(Number)
        });
      });
    });
  });

  describe('Get open interest', () => {
    it('Retrieves the current open interest for the given market', async () => {
      const response = await bpxClient.markets.getOpenInterest();
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const openInterests = response.data as OpenInterest[];
      expect(openInterests.length).toBeGreaterThan(0);
      
      openInterests.forEach(openInterest => {
        expect(openInterest).toMatchObject({
          symbol: expect.any(String),
          timestamp: expect.any(Number)
        });
        if (openInterest.openInterest !== null) {
          expect(typeof openInterest.openInterest).toBe('string');
        }
      });
    });
  });

  describe('Get funding interval rates', () => {
    it('Funding interval rate history for futures', async () => {
      const response = await bpxClient.markets.getFundingIntervalRates({
        symbol: BTC_USDC_PERP,
        limit: 10
      });
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const fundingRates = response.data as FundingIntervalRates[];
      expect(fundingRates.length).toBeGreaterThan(0);
      
      fundingRates.forEach(fundingRate => {
        expect(fundingRate).toMatchObject({
          symbol: expect.any(String),
          intervalEndTimestamp: expect.any(String),
          fundingRate: expect.any(String)
        });
      });
    });
  });

}); 