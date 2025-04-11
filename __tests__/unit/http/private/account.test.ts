import { MarketAsset, CollateralSummary } from '../../../../src/http/public/assets/assets.types';
import { ApiResponse, isSuccess } from '../../../../src/http/bpxHttpHandler';
import { createClient } from '../../setup';
import { UpdateAccountRequest, MaxOrderQuantityRequest, MaxWithdrawalQuantityRequest, MaxOrderQuantity, AccountSummary, MaxWithdrawalQuantity } from '../../../../src/http/private/account/account.types';
import { Side } from '../../../../src/http/common/common.types';

describe('Account API Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Get account', () => {
    it('Get account information', async () => {
      const response: ApiResponse<AccountSummary> = await bpxClient.account.getAccount();
      expect(isSuccess(response)).toBe(true);

      expect(response.data).toMatchObject({
        autoBorrowSettlements: expect.any(Boolean),
        autoLend: expect.any(Boolean),
        autoRealizePnl: expect.any(Boolean),
        autoRepayBorrows: expect.any(Boolean),
        borrowLimit: expect.any(String),
        futuresMakerFee: expect.any(String),
        futuresTakerFee: expect.any(String),
        leverageLimit: expect.any(String),
        limitOrders: expect.any(Number),
        liquidating: expect.any(Boolean),
        positionLimit: expect.any(String),
        spotMakerFee: expect.any(String),
        spotTakerFee: expect.any(String),
        triggerOrders: expect.any(Number)
      });
    });
  });

  // WARNING: This test changes the account settings
  describe.skip('Update account', () => {
    it('Update account settings', async () => {
      const settings: UpdateAccountRequest = {
        autoBorrowSettlements: false,
        autoLend: false,
        autoRepayBorrows: false,
        leverageLimit: '5'
      };
      
      const response = await bpxClient.account.updateAccount(settings);
      
      expect(isSuccess(response)).toBe(true);
    });
  });

  describe('Get max borrow quantity', () => {
    it('Retrieves the maxmimum quantity an account can borrow for a given asset', async () => {
      const symbol = 'SOL';
      const response = await bpxClient.account.getMaxBorrowQuantity(symbol);
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toMatchObject({
        maxBorrowQuantity: expect.any(String),
        symbol: symbol
      });
    });
  });

  describe('Get max order quantity', () => {
    it('Retrieves the maxmimum quantity an account can trade for a given symbol', async () => {
      const params: MaxOrderQuantityRequest = {
        symbol: 'SOL_USDC',
        side: Side.Bid
      };
      
      const response = await bpxClient.account.getMaxOrderQuantity(params);
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toMatchObject({
        maxOrderQuantity: expect.any(String),
        side: params.side,
        symbol: params.symbol,
      });

      const data = response.data as MaxOrderQuantity;
      
      if (data.autoBorrow !== null) {
        expect(typeof data.autoBorrow).toBe('boolean');
      }
      if (data.autoBorrowRepay !== null) {
        expect(typeof data.autoBorrowRepay).toBe('boolean');
      }
      if (data.autoLendRedeem !== null) {
        expect(typeof data.autoLendRedeem).toBe('boolean');
      }
      if (data.price !== null) {
        expect(typeof data.price).toBe('string');
      }
      if (data.reduceOnly !== null) {
        expect(typeof data.reduceOnly).toBe('boolean');
      }
    });
  });

  describe('Get max withdrawal quantity', () => {
    it('Retrieves the maxmimum quantity an account can withdraw for a given asset', async () => {
      const params: MaxWithdrawalQuantityRequest = {
        symbol: 'BTC',
      };
      
      const response = await bpxClient.account.getMaxWithdrawalQuantity(params);
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toMatchObject({
        maxWithdrawalQuantity: expect.any(String),
        symbol: params.symbol,
      });

      const data = response.data as MaxWithdrawalQuantity;
      
      if (data.autoBorrow !== null) {
        expect(typeof data.autoBorrow).toBe('boolean');
      }
      if (data.autoLendRedeem !== null) {
        expect(typeof data.autoLendRedeem).toBe('boolean');
      }
    });
  });
});
