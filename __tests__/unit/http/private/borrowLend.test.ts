import { BorrowLendExecutePayload, BorrowLendPositionWithMargin, BorrowHistoryRequest, BorrowLendMovement, InterestHistoryRequest, InterestPayment, BorrowPositionHistoryRequest, BorrowLendPositionRow } from '../../../../src/http/private/borrowLend/borrowLend.types';
import { BorrowLendSide } from '../../../../src/http/common/common.types';
import { isSuccess } from '../../../../src/http/bpxHttpHandler';
import { createClient } from '../../setup';

describe('Borrow Lend API Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Get borrow lend positions', () => {
    it('Retrieves all the open borrow lending positions for the account', async () => {

      const response = await bpxClient.borrowLend.getBorrowLendPositions();
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const positions = response.data as BorrowLendPositionWithMargin[];
      // expect(positions.length).toBeGreaterThan(0);

      response.data.forEach(position => {
        expect(position).toMatchObject({
          cumulativeInterest: expect.any(String),
          id: expect.any(String),
          imf: expect.any(String),
          imfFunction: {
            type: 'sqrt',
            base: expect.any(String),
            factor: expect.any(String)
          },
          netQuantity: expect.any(String),
          markPrice: expect.any(String),
          mmf: expect.any(String),
          mmfFunction: {
            type: 'sqrt',
            base: expect.any(String),
            factor: expect.any(String)
          },
          netExposureQuantity: expect.any(String),
          netExposureNotional: expect.any(String),
          symbol: expect.any(String)
        });
      });
    });
  });

  // DISABLED: getEstimatedLiquidationPrice is commented out in borrowLend.api.ts
  // because the endpoint's signing instruction is unknown (community-SDK value
  // returns 401 with a valid key). Re-enable this test once the method is restored.
  //
  // describe('Get estimated liquidation price', () => {
  //   it('Retrieves the estimated liquidation price for a potential borrow lend position', async () => {
  //     // The `borrow` param is a base64 encoded JSON of a BorrowLendExecutePayload.
  //     const payload: BorrowLendExecutePayload = {
  //       quantity: '0.0001',
  //       side: BorrowLendSide.Borrow,
  //       symbol: 'BTC'
  //     };
  //     const borrow = Buffer.from(JSON.stringify(payload)).toString('base64');
  //
  //     const response = await bpxClient.borrowLend.getEstimatedLiquidationPrice({ borrow });
  //
  //     expect(isSuccess(response)).toBe(true);
  //     expect(response.data).toBeDefined();
  //
  //     const estimate = response.data as PositionEstimatedLiquidationPrice;
  //     expect(estimate).toMatchObject({
  //       liquidationPrice: expect.any(String),
  //       markPrice: expect.any(String)
  //     });
  //   });
  // });

  // WARNING: This test executes borrow/lend
  describe.skip('Execute borrow lend', () => {
    it('Executes a borrow of 0.0001 BTC', async () => {
      const payload: BorrowLendExecutePayload = {
        quantity: '0.0001',
        side: BorrowLendSide.Borrow,
        symbol: 'BTC'
      };
      
      const response = await bpxClient.borrowLend.executeBorrowLend(payload);
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data).toMatchObject({
        id: expect.any(String),
        quantity: payload.quantity,
        side: payload.side,
        symbol: payload.symbol
      });
    });
  });

  describe('Get borrow history', () => {
    it('History of borrow and lend operations for the account', async () => {
      const request: BorrowHistoryRequest = {
        limit: 10,
        offset: 0
      };

      const response = await bpxClient.borrowLend.getBorrowLendHistory(request);

      expect(isSuccess(response)).toBe(true);
      const movements = response.data as BorrowLendMovement[];
      // expect(movements.length).toBeGreaterThan(0);

      movements.forEach(movement => {
        expect(movement).toMatchObject({
          eventType: expect.any(String),
          positionId: expect.any(String),
          quantity: expect.any(String),
          source: expect.any(String),
          symbol: expect.any(String),
          timestamp: expect.any(String)
        });
        if (movement.positionQuantity !== null) {
          expect(typeof movement.positionQuantity).toBe('string');
        }
        if (movement.spotMarginOrderId !== null) {
          expect(typeof movement.spotMarginOrderId).toBe('string');
        }
      });
    });
  });

  describe('Get interest history', () => {
    it('History of the interest payments for borrows and lends for the account', async () => {
      const request: InterestHistoryRequest = {
        limit: 10,
        offset: 0
      };

      const response = await bpxClient.borrowLend.getInterestHistory(request);

      expect(isSuccess(response)).toBe(true);
      const payments = response.data as InterestPayment[];
      // expect(payments.length).toBeGreaterThan(0);

      payments.forEach(payment => {
        expect(payment).toMatchObject({
          paymentType: expect.any(String),
          interestRate: expect.any(String),
          interval: expect.any(Number),
          marketSymbol: expect.any(String),
          positionId: expect.any(String),
          quantity: expect.any(String),
          symbol: expect.any(String),
          timestamp: expect.any(String)
        });
      });
    });
  });

  describe('Get borrow position history', () => {
    it('History of borrow and lend positions for the account', async () => {
      const request: BorrowPositionHistoryRequest = {
        limit: 10,
        offset: 0
      };

      const response = await bpxClient.borrowLend.getBorrowLendPositionHistory(request);

      expect(isSuccess(response)).toBe(true);
      const positions = response.data as BorrowLendPositionRow[];
      // expect(positions.length).toBeGreaterThan(0);

      positions.forEach(position => {
        expect(position).toMatchObject({
          positionId: expect.any(String),
          quantity: expect.any(String),
          symbol: expect.any(String),
          source: expect.any(String),
          cumulativeInterest: expect.any(String),
          avgInterestRate: expect.any(String),
          side: expect.any(String),
          createdAt: expect.any(String)
        });
      });
    });
  });
});
