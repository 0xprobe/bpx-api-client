import { Side } from '../../../../src/http/common/common.types';
import { StrategyCancelAllPayload, StrategyCancelPayload, StrategyCreatePayload, StrategyType, StrategyTypeEnum, StrategyHistoryRequest, Strategy } from '../../../../src/http/private/strategy/strategy.types';
import { isSuccess } from '../../../../src/http/bpxHttpHandler';
import { createClient } from '../../setup';

describe('Strategy API Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Get open strategies', () => {
    it('Retrieves all the open strategies for the account', async () => {
      const response = await bpxClient.strategy.getOpenStrategies();

      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);

      const strategies = response.data as StrategyType[];
      // expect(strategies.length).toBeGreaterThan(0);

      strategies.forEach(strategy => {
        expect(strategy).toMatchObject({
          id: expect.any(String),
          strategyType: expect.any(String),
          createdAt: expect.any(Number),
          executedQuantity: expect.any(String),
          executedQuoteQuantity: expect.any(String),
          quantity: expect.any(String),
          selfTradePrevention: expect.any(String),
          status: expect.any(String),
          side: expect.any(String),
          symbol: expect.any(String),
          timeInForce: expect.any(String),
          duration: expect.any(Number),
          interval: expect.any(Number)
        });
      });
    });
  });

  // Requires an existing strategy id, so it is skipped by default.
  describe.skip('Get strategy', () => {
    it('Retrieves an open strategy', async () => {
      const response = await bpxClient.strategy.getStrategy({ symbol: 'SOL_USDC', strategyId: '<existing-strategy-id>' });

      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      const strategy = response.data as StrategyType;
      expect(strategy).toMatchObject({
        id: expect.any(String),
        strategyType: expect.any(String),
        status: expect.any(String),
        side: expect.any(String),
        symbol: expect.any(String)
      });
    });
  });

  // WARNING: This test creates a real strategy.
  describe.skip('Create strategy', () => {
    it('Creates a scheduled strategy', async () => {
      const payload: StrategyCreatePayload = {
        strategyType: StrategyTypeEnum.Scheduled,
        side: Side.Bid,
        symbol: 'SOL_USDC',
        quantity: '0.1',
        duration: 3600,
        interval: 60
      };

      const response = await bpxClient.strategy.createStrategy(payload);

      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      const strategy = response.data as StrategyType;
      expect(strategy).toMatchObject({
        id: expect.any(String),
        strategyType: expect.any(String),
        side: payload.side,
        symbol: payload.symbol
      });
    });
  });

  // WARNING: This test cancels a real strategy.
  describe.skip('Cancel strategy', () => {
    it('Cancels an open strategy', async () => {
      const payload: StrategyCancelPayload = {
        symbol: 'SOL_USDC',
        strategyId: '<existing-strategy-id>'
      };

      const response = await bpxClient.strategy.cancelStrategy(payload);

      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
    });
  });

  // WARNING: This test cancels all open strategies on the market.
  describe.skip('Cancel open strategies', () => {
    it('Cancels all open strategies on the specified market', async () => {
      const payload: StrategyCancelAllPayload = {
        symbol: 'SOL_USDC'
      };

      const response = await bpxClient.strategy.cancelOpenStrategies(payload);

      expect(isSuccess(response)).toBe(true);
      expect(Array.isArray(response.data)).toBe(true);
    });
  });

  describe('Get strategy history', () => {
    it('Retrieves the strategy history for the user', async () => {
      const request: StrategyHistoryRequest = {
        limit: 10,
        offset: 0
      };

      const response = await bpxClient.strategy.getStrategyHistory(request);

      expect(isSuccess(response)).toBe(true);
      const strategies = response.data as Strategy[];
      // expect(strategies.length).toBeGreaterThan(0);

      strategies.forEach(strategy => {
        expect(strategy).toMatchObject({
          id: expect.any(String),
          createdAt: expect.any(String),
          strategyType: expect.any(String),
          selfTradePrevention: expect.any(String),
          status: expect.any(String),
          side: expect.any(String),
          symbol: expect.any(String),
          timeInForce: expect.any(String),
          duration: expect.any(Number),
          interval: expect.any(Number),
          randomizedIntervalQuantity: expect.any(Boolean)
        });
      });
    });
  });

});
