import { MarketAsset, CollateralSummary } from '../../../../src/http/public/assets/assets.types';
import { ApiResponse, isSuccess } from '../../../../src/http/bpxHttpHandler';
import { createClient } from '../../setup';
import { UpdateAccountRequest, MaxOrderQuantityRequest, MaxWithdrawalQuantityRequest, MaxOrderQuantity, AccountSummary } from '../../../../src/http/private/account/account.types';

describe('Account API Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('getAccount', () => {
    it('should get account details successfully', async () => {
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

  describe('updateAccount', () => {
    it('should update account settings successfully', async () => {
      const settings: UpdateAccountRequest = {
        autoBorrowSettlements: false,
        autoLend: false,
        autoRepayBorrows: false,
        leverageLimit: '7'
      };
      
      const response = await bpxClient.account.updateAccount(settings);
      
      expect(isSuccess(response)).toBe(true);
    });
  });

  describe('getMaxBorrowQuantity', () => {
    it('should get max borrow quantity successfully', async () => {
      const symbol = 'SOL';
      const response = await bpxClient.account.getMaxBorrowQuantity(symbol);
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toMatchObject({
        maxBorrowQuantity: expect.any(String),
        symbol: symbol
      });
    });
  });

  describe('getMaxOrderQuantity', () => {
    it('should get max order quantity successfully', async () => {
      const params: MaxOrderQuantityRequest = {
        symbol: 'SOL_USDC',
        side: 'Bid'
      };
      
      const response = await bpxClient.account.getMaxOrderQuantity(params);
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toMatchObject({
        maxOrderQuantity: expect.any(String),
        side: params.side,
        symbol: params.symbol,
      });

      const data = response.data as MaxOrderQuantity;
      
      // Optional properties type checking if they exist and not null
      if (data.price !== null) {
        expect(typeof data.price).toBe('string');
      }
      if (data.reduceOnly !== null) {
        expect(typeof data.reduceOnly).toBe('boolean');
      }
      if (data.autoBorrow !== null) {
        expect(typeof data.autoBorrow).toBe('boolean');
      }
      if (data.autoBorrowRepay !== null) {
        expect(typeof data.autoBorrowRepay).toBe('boolean');
      }
      if (data.autoLendRedeem !== null) {
        expect(typeof data.autoLendRedeem).toBe('boolean');
      }
    });
  });

  describe('getMaxWithdrawalQuantity', () => {
    it('should get max withdrawal quantity successfully', async () => {
      const params: MaxWithdrawalQuantityRequest = {
        symbol: 'BTC',
        autoBorrow: false,
        autoLendRedeem: false
      };
      
      const response = await bpxClient.account.getMaxWithdrawalQuantity(params);
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toMatchObject({
        maxWithdrawalQuantity: expect.any(String),
        symbol: params.symbol,
        autoBorrow: params.autoBorrow,
        autoLendRedeem: params.autoLendRedeem
      });
    });
  });
});
