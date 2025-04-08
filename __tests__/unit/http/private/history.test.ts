import { BorrowHistoryRequest, BorrowPositionHistoryRequest, FillHistoryRequest, FundingPaymentsRequest, InterestHistoryRequest, OrderHistoryRequest, ProfitAndLossHistoryRequest, SettlementHistoryRequest } from '../../../../src/http/private/history/history.types';
import { isSuccess } from '../../../../src/http/bpxHttpHandler';
import { createClient } from '../../setup';


describe('History API Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('getBorrowLendHistory', () => {
    it('should get borrow lend history successfully', async () => {
      const request: BorrowHistoryRequest = {
        limit: 10,
        offset: 0
      };
      
      const response = await bpxClient.history.getBorrowLendHistory(request);
      
      expect(isSuccess(response)).toBe(true);
      if (Array.isArray(response.data) && response.data.length > 0) {
        const movement = response.data[0];
        
        // Required fields
        expect(movement).toMatchObject({
          eventType: expect.any(String),
          positionId: expect.any(String),
          quantity: expect.any(String),
          source: expect.any(String),
          symbol: expect.any(String),
          timestamp: expect.any(String)
        });

        // Optional fields type checking if they exist
        if (movement.positionQuantity !== null) {
          expect(typeof movement.positionQuantity).toBe('string');
        }
        if (movement.spotMarginOrderId !== null) {
          expect(typeof movement.spotMarginOrderId).toBe('string');
        }
      }
    });
  });

  describe('getInterestHistory', () => {
    it('should get interest history successfully', async () => {
      const request: InterestHistoryRequest = {
        limit: 10,
        offset: 0
      };
      
      const response = await bpxClient.history.getInterestHistory(request);
      
      expect(isSuccess(response)).toBe(true);
      if (Array.isArray(response.data) && response.data.length > 0) {
        const payment = response.data[0];
        
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
      }
    });
  });

  describe('getBorrowLendPositionHistory', () => {
    it('should get borrow lend position history successfully', async () => {
      const request: BorrowPositionHistoryRequest = {
        limit: 10,
        offset: 0
      };
      
      const response = await bpxClient.history.getBorrowLendPositionHistory(request);
      
      expect(isSuccess(response)).toBe(true);
      if (Array.isArray(response.data) && response.data.length > 0) {
        const position = response.data[0];
        
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
      }
    });
  });

  describe('getFillHistory', () => {
    it('should get fill history successfully', async () => {
      const request: FillHistoryRequest = {
        limit: 10,
        offset: 0
      };
      
      const response = await bpxClient.history.getFillHistory(request);
      
      expect(isSuccess(response)).toBe(true);
      if (Array.isArray(response.data) && response.data.length > 0) {
        const fill = response.data[0];
        
        // Required fields
        expect(fill).toMatchObject({
          fee: expect.any(String),
          feeSymbol: expect.any(String),
          isMaker: expect.any(Boolean),
          orderId: expect.any(String),
          price: expect.any(String),
          quantity: expect.any(String),
          side: expect.any(String),
          symbol: expect.any(String),
          timestamp: expect.any(String)
        });

        // Optional fields type checking if they exist
        if (fill.clientId !== null) {
          expect(typeof fill.clientId).toBe('string');
        }
        if (fill.systemOrderType !== null) {
          expect(typeof fill.systemOrderType).toBe('string');
        }
        if (fill.tradeId !== null) {
          expect(typeof fill.tradeId).toBe('number');
        }
      }
    });
  });

  describe('getFundingPayments', () => {
    it('should get funding payments successfully', async () => {
      const request: FundingPaymentsRequest = {
        limit: 10,
        offset: 0
      };
      
      const response = await bpxClient.history.getFundingPayments(request);
      
      expect(isSuccess(response)).toBe(true);
      if (Array.isArray(response.data) && response.data.length > 0) {
        const payment = response.data[0];
        
        // Required fields
        expect(payment).toMatchObject({
          userId: expect.any(Number),
          symbol: expect.any(String),
          quantity: expect.any(String),
          intervalEndTimestamp: expect.any(String),
          fundingRate: expect.any(String)
        });

        // Optional fields type checking if they exist
        if (payment.subaccountId !== null) {
          expect(typeof payment.subaccountId).toBe('number');
        }
      }
    });
  });

  describe('getOrderHistory', () => {
    it('should get order history successfully', async () => {
      const request: OrderHistoryRequest = {
        limit: 10,
        offset: 0
      };
      
      const response = await bpxClient.history.getOrderHistory(request);
      
      expect(isSuccess(response)).toBe(true);
      if (Array.isArray(response.data) && response.data.length > 0) {
        const order = response.data[0];
        
        // Required fields
        expect(order).toMatchObject({
          id: expect.any(String),
          orderType: expect.any(String),
          selfTradePrevention: expect.any(String),
          status: expect.any(String),
          side: expect.any(String),
          symbol: expect.any(String),
          timeInForce: expect.any(String)
        });

        // Optional fields type checking if they exist
        if (order.executedQuantity !== null) {
          expect(typeof order.executedQuantity).toBe('string');
        }
        if (order.executedQuoteQuantity !== null) {
          expect(typeof order.executedQuoteQuantity).toBe('string');
        }
        if (order.expiryReason !== null) {
          expect(typeof order.expiryReason).toBe('string');
        }
        if (order.postOnly !== null) {
          expect(typeof order.postOnly).toBe('boolean');
        }
        if (order.price !== null) {
          expect(typeof order.price).toBe('string');
        }
        if (order.quantity !== null) {
          expect(typeof order.quantity).toBe('string');
        }
        if (order.quoteQuantity !== null) {
          expect(typeof order.quoteQuantity).toBe('string');
        }
        if (order.stopLossTriggerPrice !== null) {
          expect(typeof order.stopLossTriggerPrice).toBe('string');
        }
        if (order.stopLossLimitPrice !== null) {
          expect(typeof order.stopLossLimitPrice).toBe('string');
        }
        if (order.stopLossTriggerBy !== null) {
          expect(typeof order.stopLossTriggerBy).toBe('string');
        }
        if (order.takeProfitTriggerPrice !== null) {
          expect(typeof order.takeProfitTriggerPrice).toBe('string');
        }
        if (order.takeProfitLimitPrice !== null) {
          expect(typeof order.takeProfitLimitPrice).toBe('string');
        }
        if (order.takeProfitTriggerBy !== null) {
          expect(typeof order.takeProfitTriggerBy).toBe('string');
        }
        if (order.triggerBy !== null) {
          expect(typeof order.triggerBy).toBe('string');
        }
        if (order.triggerPrice !== null) {
          expect(typeof order.triggerPrice).toBe('string');
        }
        if (order.triggerQuantity !== null) {
          expect(typeof order.triggerQuantity).toBe('string');
        }
      }
    });
  });

  describe('getProfitAndLossHistory', () => {
    it('should get profit and loss history successfully', async () => {
      const request: ProfitAndLossHistoryRequest = {
        limit: 10,
        offset: 0
      };
      
      const response = await bpxClient.history.getProfitAndLossHistory(request);
      
      expect(isSuccess(response)).toBe(true);
      if (Array.isArray(response.data) && response.data.length > 0) {
        const payment = response.data[0];
        
        expect(payment).toMatchObject({
          pnlRealized: expect.any(String),
          symbol: expect.any(String),
          timestamp: expect.any(String)
        });
      }
    });
  });

  describe('getSettlementHistory', () => {
    it('should get settlement history successfully', async () => {
      const request: SettlementHistoryRequest = {
        limit: 10,
        offset: 0
      };
      
      const response = await bpxClient.history.getSettlementHistory(request);
      
      expect(isSuccess(response)).toBe(true);
      if (Array.isArray(response.data) && response.data.length > 0) {
        const settlement = response.data[0];
        
        // Required fields
        expect(settlement).toMatchObject({
          quantity: expect.any(String),
          source: expect.any(String),
          timestamp: expect.any(String),
          userId: expect.any(Number)
        });

        // Optional fields type checking if they exist
        if (settlement.subaccountId !== null) {
          expect(typeof settlement.subaccountId).toBe('number');
        }
      }
    });
  });
}); 