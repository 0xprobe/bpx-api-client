import { isSuccess } from '../../../../src/http/bpxHttpHandler';
import { createClient } from '../../setup';
import { FuturePositionWithMargin } from '../../../../src/http/private/futures/futures.types';

describe('Futures API Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Get open positions', () => {
    it('Retrieves account position summary', async () => {
      const response = await bpxClient.futures.getOpenPositions();
      
      expect(isSuccess(response)).toBe(true);
      const positions = response.data as FuturePositionWithMargin[];
      // expect(positions.length).toBeGreaterThan(0);

      positions.forEach(position => {
        expect(position).toMatchObject({
          breakEvenPrice: expect.any(String),
          entryPrice: expect.any(String),
          estLiquidationPrice: expect.any(String),
          imf: expect.any(String),
          imfFunction: {
            type: 'sqrt',
            base: expect.any(String),
            factor: expect.any(String)
          },
          markPrice: expect.any(String),
          mmf: expect.any(String),
          mmfFunction: {
            type: 'sqrt',
            base: expect.any(String),
            factor: expect.any(String)
          },
          netCost: expect.any(String),
          netQuantity: expect.any(String),
          netExposureQuantity: expect.any(String),
          netExposureNotional: expect.any(String),
          pnlRealized: expect.any(String),
          pnlUnrealized: expect.any(String),
          cumulativeFundingPayment: expect.any(String),
          symbol: expect.any(String),
          userId: expect.any(Number),
          positionId: expect.any(String),
          cumulativeInterest: expect.any(String)
        });
        // Optional fields type checking if they exist
        if (position.subaccountId !== null) {
          expect(typeof position.subaccountId).toBe('number');
        }
      });
    });
  });
}); 