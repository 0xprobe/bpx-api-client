import { isSuccess } from '../../../../src/http/bpxHttpHandler';
import { createClient } from '../../setup';
import { AccountWithdrawalPayload, TransfersRequest, Withdrawal } from '../../../../src/http/private/capital/capital.types';

describe('Capital API Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Get balances', () => {
    it('Retrieves account balances and the state of the balances', async () => {
      const response = await bpxClient.capital.getBalances();
      
      expect(isSuccess(response)).toBe(true);
      expect(typeof response.data).toBe('object');
      
      // Check if at least one symbol exists
      const symbols = Object.keys(response.data);
      expect(symbols.length).toBeGreaterThan(0);
      
      // Check structure of all symbols' balances
      symbols.forEach(symbol => {
        expect(response.data[symbol]).toMatchObject({
          available: expect.any(String),
          locked: expect.any(String),
          staked: expect.any(String)
        });
      });
    });
  });

  describe('Get collateral', () => {
    it('Retrieves collateral information for an account', async () => {
      const response = await bpxClient.capital.getCollateral();
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toMatchObject({
        assetsValue: expect.any(String),
        borrowLiability: expect.any(String),
        collateral: expect.arrayContaining([{
          symbol: expect.any(String),
          assetMarkPrice: expect.any(String),
          totalQuantity: expect.any(String),
          balanceNotional: expect.any(String),
          collateralWeight: expect.any(String),
          collateralValue: expect.any(String),
          openOrderQuantity: expect.any(String),
          lendQuantity: expect.any(String),
          availableQuantity: expect.any(String)
        }]),
        imf: expect.any(String),
        unsettledEquity: expect.any(String),
        liabilitiesValue: expect.any(String),
        mmf: expect.any(String),
        netEquity: expect.any(String),
        netEquityAvailable: expect.any(String),
        netEquityLocked: expect.any(String),
        netExposureFutures: expect.any(String),
        pnlUnrealized: expect.any(String),
      });
      // Optional fields type checking if they exist
      if (response.data.marginFraction !== null) {
        expect(typeof response.data.marginFraction).toBe('string');
      }
    });
  });

  describe('Get deposits', () => {
    it('Retrieves deposit history', async () => {
      const request: TransfersRequest = {
        limit: 10,
        offset: 0
      };
      
      const response = await bpxClient.capital.getDeposits(request);
      expect(isSuccess(response)).toBe(true);

      // Check all deposits
      response.data.forEach(deposit => {
        // Required fields
        expect(deposit).toMatchObject({
          id: expect.any(Number),
          source: expect.any(String),
          status: expect.any(String),
          symbol: expect.any(String),
          quantity: expect.any(String),
          createdAt: expect.any(String),
          fiatAmount: expect.any(Number),
          fiatCurrency: expect.any(String),
          institutionBic: expect.any(String),
          platformMemo: expect.any(String),
        });

        // Optional fields type checking if they exist
        if (deposit.toAddress !== null) {
          expect(typeof deposit.toAddress).toBe('string');
        }
        if (deposit.fromAddress !== null) {
          expect(typeof deposit.fromAddress).toBe('string');
        }
        if (deposit.confirmationBlockNumber !== null) {
          expect(typeof deposit.confirmationBlockNumber).toBe('number');
        }
        if (deposit.transactionHash !== null) {
          expect(typeof deposit.transactionHash).toBe('string');
        }
      });
    });
  });

  describe('Get deposit address', () => {
    it('Retrieves the user specific deposit address on the specified blockchain', async () => {
      const blockchain = 'Ethereum';
      const response = await bpxClient.capital.getDepositAddress(blockchain);
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toMatchObject({
        address: expect.any(String)
      });
    });
  });

  describe('Get withdrawals', () => {
    it('Retrieves withdrawal history', async () => {
      const params: TransfersRequest = {
        limit: 10,
        offset: 0
      };
      
      const response = await bpxClient.capital.getWithdrawals(params);
      
      expect(isSuccess(response)).toBe(true);
      response.data.forEach(withdrawal => {
        // Required fields
        expect(withdrawal).toMatchObject({
          id: expect.any(Number),
          blockchain: expect.any(String),
          quantity: expect.any(String),
          fee: expect.any(String),
          fiatFee: expect.any(String),
          fiatState: expect.any(String),
          fiatSymbol: expect.any(String),
          providerId: expect.any(String),
          symbol: expect.any(String),
          status: expect.any(String),
          toAddress: expect.any(String),
          createdAt: expect.any(String),
          isInternal: expect.any(Boolean),
          bankName: expect.any(String),
          bankIdentifier: expect.any(String),
          accountIdentifier: expect.any(String),
          triggerAt: expect.any(String)
        });
        // Optional fields type checking if they exist
        if (withdrawal.clientId !== null) {
          expect(typeof withdrawal.clientId).toBe('string');
        }
        if (withdrawal.identifier !== null) {
          expect(typeof withdrawal.identifier).toBe('string');
        }
        if (withdrawal.subaccountId !== null) {
          expect(typeof withdrawal.subaccountId).toBe('number');
        }
        if (withdrawal.transactionHash !== null) {
          expect(typeof withdrawal.transactionHash).toBe('string');
        }
      });
    });
  });

  // WARNING: This test requests withdrawal
  describe.skip('Request withdrawal', () => {
    it('Requests a withdrawal from the exchange', async () => {
      const payload: AccountWithdrawalPayload = {
        address: 'WITHDRAWAL_ADDRESS',
        blockchain: 'Solana',
        quantity: '0.01',
        symbol: 'SOL'
      };
      
      const response = await bpxClient.capital.requestWithdrawal(payload);

      expect(isSuccess(response)).toBe(true);
      const withdrawal = response.data as Withdrawal;
      
      // Required fields
      expect(withdrawal).toMatchObject({
        id: expect.any(Number),
        blockchain: payload.blockchain,
        quantity: payload.quantity,
        symbol: payload.symbol,
        status: expect.any(String),
        toAddress: payload.address,
        createdAt: expect.any(String),
        isInternal: expect.any(Boolean)
      });

      // Optional fields type checking if they exist
      if (withdrawal.clientId !== null) {
        expect(typeof withdrawal.clientId).toBe('string');
      }
      if (withdrawal.identifier !== null) {
        expect(typeof withdrawal.identifier).toBe('string');
      }
      if (withdrawal.subaccountId !== null) {
        expect(typeof withdrawal.subaccountId).toBe('number');
      }
      if (withdrawal.transactionHash !== null) {
        expect(typeof withdrawal.transactionHash).toBe('string');
      }
    });
  });
}); 