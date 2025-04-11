import { BorrowLendExecutePayload, BorrowLendPositionWithMargin } from '../../../../src/http/private/borrowLend/borrowLend.types';
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
});
