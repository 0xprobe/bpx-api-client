import { ApyRates, BorrowLendHistory, BorrowLendMarket, BorrowLendMarketHistoryInterval, BorrowLendBookState } from '../../../../src/http/public/borrowLendMarkets/borrowLendMarkets.types';
import { isSuccess } from '../../../../src/http/bpxHttpHandler';
import { createClient } from '../../setup';

describe('Public Borrow Lend Markets API Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Get borrow lend markets', () => {
    it('Get borrow lend markets', async () => {
      const response = await bpxClient.borrowLendMarkets.getBorrowLendMarkets();
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const markets = response.data as BorrowLendMarket[];
      expect(markets.length).toBeGreaterThan(0);

      markets.forEach(market => {
        expect(market).toMatchObject({
          state: expect.stringMatching(/^(Open|Closed|RepayOnly)$/),
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
      });
    });
  });

  describe('Get borrow lend market history', () => {
    it('Get borrow lend market history with random interval', async () => {

      const intervalArray = Object.values(BorrowLendMarketHistoryInterval);
      const randomInterval = intervalArray[Math.floor(Math.random() * intervalArray.length)];

      const response = await bpxClient.borrowLendMarkets.getBorrowLendMarketsHistory({
        interval: randomInterval
      });
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const histories = response.data as BorrowLendHistory[];
      // expect(histories.length).toBeGreaterThan(0);
      
      histories.forEach(history => {
        expect(history).toMatchObject({
          borrowInterestRate: expect.any(String),
          borrowedQuantity: expect.any(String),
          lendInterestRate: expect.any(String),
          lentQuantity: expect.any(String),
          timestamp: expect.any(String),
          utilization: expect.any(String)
        });
      });
    });
  });

  describe('Get APY rates', () => {
    it('Get APY rates for borrow/lend markets and staking', async () => {
      const response = await bpxClient.borrowLendMarkets.getApyRates();

      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();

      const apyRates = response.data as ApyRates;
      expect(Array.isArray(apyRates.borrowLend)).toBe(true);
      expect(Array.isArray(apyRates.staking)).toBe(true);

      apyRates.borrowLend.forEach(rate => {
        expect(rate).toMatchObject({
          symbol: expect.any(String),
          borrowRate: expect.any(String),
          lendRate: expect.any(String)
        });
      });

      apyRates.staking.forEach(rate => {
        expect(rate).toMatchObject({
          symbol: expect.any(String),
          dilutionFactor: expect.any(String),
          stakingRate: expect.any(String)
        });
      });
    });
  });

});