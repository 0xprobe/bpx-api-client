import { Trade } from '../../../../src/http/public/trades/trades.types';
import { isSuccess } from '../../../../src/http/bpxHttpHandler';
import { createClient } from '../../setup';

describe('Public Trades API Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;
  const BTC_USDC = 'BTC_USDC';

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Get recent trades', () => {
    it('Retrieve the most recent trades for a symbol', async () => {
      const response = await bpxClient.trades.getRecentTrades({ symbol: BTC_USDC });
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const trades = response.data as Trade[];
      expect(trades.length).toBeGreaterThan(0);
      
      trades.forEach(trade => {
        if (trade.id !== null) {
          expect(typeof trade.id).toBe('number');
        }
        expect(trade).toMatchObject({
          price: expect.any(String),
          quantity: expect.any(String),
          quoteQuantity: expect.any(String),
          timestamp: expect.any(Number),
          isBuyerMaker: expect.any(Boolean)
        });
      });
    });
  });

  describe('Get historical trades', () => {
    it('Retrieves all historical trades for the given symbol', async () => {
      const response = await bpxClient.trades.getHistoricalTrades({ symbol: BTC_USDC });
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const trades = response.data as Trade[];
      expect(trades.length).toBeGreaterThan(0);
      
      trades.forEach(trade => {
        if (trade.id !== null) {
          expect(typeof trade.id).toBe('number');
        }
        expect(trade).toMatchObject({
          price: expect.any(String),
          quantity: expect.any(String),
          quoteQuantity: expect.any(String),
          timestamp: expect.any(Number),
          isBuyerMaker: expect.any(Boolean)
        });
      });
    });
  });
  
}); 