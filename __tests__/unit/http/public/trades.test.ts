import { Trade } from '../../../../src/http/public/trades/trades.types';
import { isSuccess } from '../../../../src/http/bpxHttpHandler';
import { createClient } from '../../setup';

describe('Public Trades API Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('getRecentTrades', () => {
    it('should return recent trades for a symbol', async () => {
      const symbol = 'BTC_USDC';
      const response = await bpxClient.trades.getRecentTrades({ symbol });
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const trades = response.data as Trade[];
      expect(trades.length).toBeGreaterThan(0);

      // Verify structure of the first trade
      const firstTrade = trades[0];
          
      if (firstTrade.id !== undefined) {
        expect(typeof firstTrade.id).toBe('number');
      }

      expect(firstTrade).toMatchObject({
        price: expect.any(String),
        quantity: expect.any(String),
        quoteQuantity: expect.any(String),
        timestamp: expect.any(Number),
        isBuyerMaker: expect.any(Boolean)
      });
    });
  });

  describe('getAggregateTrades', () => {
    it('should return aggregate trades for a symbol', async () => {
      const symbol = 'BTC_USDC';
      const response = await bpxClient.trades.getHistoricalTrades({ symbol });
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const trades = response.data as Trade[];
      expect(trades.length).toBeGreaterThan(0);
      
      // Verify structure of the first aggregate trade
      const firstTrade = trades[0];

      if (firstTrade.id !== undefined) {
        expect(typeof firstTrade.id).toBe('number');
      }

      expect(firstTrade).toMatchObject({
        price: expect.any(String),
        quantity: expect.any(String),
        quoteQuantity: expect.any(String),
        timestamp: expect.any(Number),
        isBuyerMaker: expect.any(Boolean)
      });

    });
  });
}); 