import { BorrowLendHistory, BorrowLendMarket, BorrowLendMarketHistoryInterval, BorrowLendBookState } from '../../../../src/http/public/borrowLendMarkets/borrowLendMarkets.types';
import { isSuccess } from '../../../../src/http/bpxHttpHandler';
import { createClient } from '../../setup';

describe('Public BorrowLendMarkets API Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('getBorrowLendMarkets', () => {
    it('should return list of borrow lend markets', async () => {
      const response = await bpxClient.borrowLendMarkets.getBorrowLendMarkets();
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const markets = response.data as BorrowLendMarket[];
      expect(markets.length).toBeGreaterThan(0);
      
      // Verify structure of the first market
      const firstMarket = markets[0];
      expect(firstMarket).toMatchObject({
        state: expect.stringMatching(/^(Open|Closed|CancelOnly|LimitOnly|PostOnly)$/),
        assetMarkPrice: expect.any(String),
        borrowInterestRate: expect.any(String),
        borrowedQuantity: expect.any(String),
        fee: expect.any(String),
        lendInterestRate: expect.any(String),
        lentQuantity: expect.any(String),
        maxUtilization: expect.any(String),
        openBorrowLendLimit: expect.any(String),
        optimalUtilization: expect.any(String),
        symbol: expect.any(String),
        timestamp: expect.any(String),
        throttleUtilizationThreshold: expect.any(String),
        throttleUtilizationBound: expect.any(String),
        throttleUpdateFraction: expect.any(String),
        utilization: expect.any(String),
        stepSize: expect.any(String)
      });
      
      // Verify state is one of the valid enum values
      expect(Object.values(BorrowLendBookState)).toContain(firstMarket.state);
    });
  });

  describe('getBorrowLendMarketsHistory', () => {
    it('should return borrow lend markets history with daily interval', async () => {
      const response = await bpxClient.borrowLendMarkets.getBorrowLendMarketsHistory({
        interval: BorrowLendMarketHistoryInterval.OneDay
      });
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const history = response.data as BorrowLendHistory[];
      expect(history.length).toBeGreaterThan(0);
      
      // Verify structure of the first history entry
      const firstEntry = history[0];
      expect(firstEntry).toMatchObject({
        borrowInterestRate: expect.any(String),
        borrowedQuantity: expect.any(String),
        lendInterestRate: expect.any(String),
        lentQuantity: expect.any(String),
        timestamp: expect.any(String),
        utilization: expect.any(String)
      });
    });

    it('should return borrow lend markets history with weekly interval', async () => {
      const response = await bpxClient.borrowLendMarkets.getBorrowLendMarketsHistory({
        interval: BorrowLendMarketHistoryInterval.OneWeek
      });
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const history = response.data as BorrowLendHistory[];
      expect(history.length).toBeGreaterThan(0);
    });

    it('should return borrow lend markets history with monthly interval', async () => {
      const response = await bpxClient.borrowLendMarkets.getBorrowLendMarketsHistory({
        interval: BorrowLendMarketHistoryInterval.OneMonth
      });
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const history = response.data as BorrowLendHistory[];
      expect(history.length).toBeGreaterThan(0);
    });

    it('should return borrow lend markets history with yearly interval', async () => {
      const response = await bpxClient.borrowLendMarkets.getBorrowLendMarketsHistory({
        interval: BorrowLendMarketHistoryInterval.OneYear
      });
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const history = response.data as BorrowLendHistory[];
      expect(history.length).toBeGreaterThan(0);
    });
  });
}); 