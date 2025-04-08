import { BorrowLendExecutePayload, BorrowLendPositionWithMargin } from '../../../../src/http/private/borrowLend/borrowLend.types';
import { BorrowLendSide } from '../../../../src/http/common/common.types';
import { isSuccess } from '../../../../src/http/bpxHttpHandler';
import { createClient } from '../../setup';

describe('Borrow Lend API Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe.only('getBorrowLendPositions', () => {
    it('should get borrow lend positions successfully', async () => {

      const response = await bpxClient.borrowLend.getBorrowLendPositions();
      
      expect(isSuccess(response)).toBe(true);

      if (Array.isArray(response.data) && response.data.length > 0) {

        expect(response.data).toMatchObject([{
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
        }]);

        const firstPosition = response.data[0];
        expect(firstPosition.imfFunction.type).toBe('sqrt');
        expect(firstPosition.mmfFunction.type).toBe('sqrt');
      }

    });
  });

  describe('executeBorrowLend', () => {
    it('should execute borrow lend successfully', async () => {
      const payload: BorrowLendExecutePayload = {
        quantity: '0.0001',
        side: BorrowLendSide.Borrow, // 'Lend'
        symbol: 'BTC'
      };
      
      const response = await bpxClient.borrowLend.executeBorrowLend(payload);
      
      expect(isSuccess(response)).toBe(true);

    });
  });
});
