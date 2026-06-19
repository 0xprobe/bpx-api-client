import { isSuccess } from '../../../../src/http/bpxHttpHandler';
import { createClient } from '../../setup';
import { FuturePositionWithMargin, FundingPaymentsRequest, FundingPayment, PositionHistoryRequest, PositionHistoryRow } from '../../../../src/http/private/position/position.types';

describe('Position API Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Get open positions', () => {
    it('Retrieves account position summary', async () => {
      const response = await bpxClient.position.getOpenPositions();

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
        if (position.subaccountId !== null) {
          expect(typeof position.subaccountId).toBe('number');
        }
      });
    });
  });

  describe('Get funding payments', () => {
    it('Users funding payment history for futures', async () => {
      const request: FundingPaymentsRequest = {
        limit: 10,
        offset: 0
      };

      const response = await bpxClient.position.getFundingPayments(request);

      expect(isSuccess(response)).toBe(true);
      const payments = response.data as FundingPayment[];
      // expect(payments.length).toBeGreaterThan(0);

      payments.forEach(payment => {
        expect(payment).toMatchObject({
          userId: expect.any(Number),
          symbol: expect.any(String),
          quantity: expect.any(String),
          intervalEndTimestamp: expect.any(String),
          fundingRate: expect.any(String)
        });
        if (payment.subaccountId !== null) {
          expect(typeof payment.subaccountId).toBe('number');
        }
      });
    });
  });

  describe('Get position history', () => {
    it('Retrieves the position history for the user', async () => {
      const request: PositionHistoryRequest = {
        limit: 10,
        offset: 0
      };

      const response = await bpxClient.position.getPositionHistory(request);

      expect(isSuccess(response)).toBe(true);
      const positions = response.data as PositionHistoryRow[];
      // expect(positions.length).toBeGreaterThan(0);

      positions.forEach(position => {
        expect(position).toMatchObject({
          id: expect.any(String),
          symbol: expect.any(String),
          netQuantity: expect.any(String),
          netExposureQuantity: expect.any(String),
          netExposureNotional: expect.any(String),
          netCost: expect.any(String),
          markPrice: expect.any(String),
          entryPrice: expect.any(String),
          cumulativePnlRealized: expect.any(String),
          unrealizedPnl: expect.any(String),
          fundingQuantity: expect.any(String),
          interest: expect.any(String),
          liquidated: expect.any(String),
          imf: expect.any(String),
          fees: expect.any(String),
          state: expect.stringMatching(/^(Open|Closed)$/),
          closedVolume: expect.any(String),
          liquidationFees: expect.any(String)
        });
      });
    });
  });

});
