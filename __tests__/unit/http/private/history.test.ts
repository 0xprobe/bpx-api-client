import { BorrowHistoryRequest, BorrowLendMovement, BorrowLendPositionRow, BorrowPositionHistoryRequest, DustConversion, DustConversionHistoryRequest, FillHistoryRequest, FundingPayment, FundingPaymentsRequest, InterestHistoryRequest, InterestPayment, Order, OrderFill, OrderHistoryRequest, PnlPayment, ProfitAndLossHistoryRequest, QuoteHistorical, QuoteHistoryRequest, RequestForQuoteHistorical, RfqHistoryRequest, Settlement, SettlementHistoryRequest, Strategy, StrategyHistoryRequest } from '../../../../src/http/private/history/history.types';
import { isSuccess } from '../../../../src/http/bpxHttpHandler';
import { createClient } from '../../setup';

describe('History API Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Get borrow history', () => {
    it('History of borrow and lend operations for the account', async () => {
      const request: BorrowHistoryRequest = {
        limit: 10,
        offset: 0
      };
      
      const response = await bpxClient.history.getBorrowLendHistory(request);
      
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
      
      const response = await bpxClient.history.getInterestHistory(request);
      
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
      
      const response = await bpxClient.history.getBorrowLendPositionHistory(request);
      
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

  describe('Get dust conversion history', () => {
    it('Retrieves the dust conversion history for the user', async () => {
      const request: DustConversionHistoryRequest = {
        limit: 10,
        offset: 0
      };
      
      const response = await bpxClient.history.getDustConversionHistory(request);
      
      expect(isSuccess(response)).toBe(true);
      console.log(response.data);
      const conversions = response.data as DustConversion[];
      // expect(positions.length).toBeGreaterThan(0);

      conversions.forEach(conversion => {
        expect(conversion).toMatchObject({
          id: expect.any(Number),
          quantity: expect.any(String),
          symbol: expect.any(String),
          usdcReceived: expect.any(String),
          timestamp: expect.any(String)
        });
      });
    });
  });

  describe('Get fill history', () => {
    it('Retrieves historical fills, with optional filtering for a specific order or symbol', async () => {
      const request: FillHistoryRequest = {
        limit: 10,
        offset: 0
      };
      
      const response = await bpxClient.history.getFillHistory(request);
      
      expect(isSuccess(response)).toBe(true);
      const fills = response.data as OrderFill[];
      // expect(fills.length).toBeGreaterThan(0);

      fills.forEach(fill => {
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
        if (fill.clientId !== null) {
          expect(typeof fill.clientId).toBe('string');
        }
        if (fill.systemOrderType !== null) {
          expect(typeof fill.systemOrderType).toBe('string');
        }
        if (fill.tradeId !== null) {
          expect(typeof fill.tradeId).toBe('number');
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
      
      const response = await bpxClient.history.getFundingPayments(request);
      
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

  describe('Get order history', () => {
    it('Retrieves the order history for the user', async () => {
      const request: OrderHistoryRequest = {
        limit: 10,
        offset: 0
      };
      
      const response = await bpxClient.history.getOrderHistory(request);
      
      expect(isSuccess(response)).toBe(true);
      const orders = response.data as Order[];
      // expect(orders.length).toBeGreaterThan(0);

      orders.forEach(order => {
        expect(order).toMatchObject({
          id: expect.any(String),
          createdAt: expect.any(String),
          orderType: expect.any(String),
          selfTradePrevention: expect.any(String),
          status: expect.any(String),
          side: expect.any(String),
          symbol: expect.any(String),
          timeInForce: expect.any(String)
        });
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
        if (order.clientId !== null) {
          expect(typeof order.clientId).toBe('number');
        }
        if (order.systemOrderType !== null) {
          expect(typeof order.systemOrderType).toBe('string');
        }
        if (order.strategyId !== null) {
          expect(typeof order.strategyId).toBe('string');
        }
      });
    });
  });

  describe('Get profit and loss history', () => {
    it('History of profit and loss realization for an account', async () => {
      const request: ProfitAndLossHistoryRequest = {
        limit: 10,
        offset: 0
      };
      
      const response = await bpxClient.history.getProfitAndLossHistory(request);
      
      expect(isSuccess(response)).toBe(true);
      const payments = response.data as PnlPayment[];
      // expect(payments.length).toBeGreaterThan(0);

      payments.forEach(payment => {
        expect(payment).toMatchObject({
          pnlRealized: expect.any(String),
          symbol: expect.any(String),
          timestamp: expect.any(String)
        });
      });
    });
  });

  describe('Get Rfq history', () => {
    it('Retrieves the rfq history for the user', async () => {
      const request: RfqHistoryRequest = {
        limit: 10,
        offset: 0
      };
      
      const response = await bpxClient.history.getRfqHistory(request);

      expect(isSuccess(response)).toBe(true);
      const rfqs = response.data as RequestForQuoteHistorical[];
      // expect(rfqs.length).toBeGreaterThan(0);

      rfqs.forEach(rfq => {
        expect(rfq).toMatchObject({
          userId: expect.any(Number),
          rfqId: expect.any(String),
          symbol: expect.any(String),
          side: expect.any(String),
          submissionTime: expect.any(String),
          expiryTime: expect.any(String),
          status: expect.any(String),
          executionMode: expect.any(String),
          createdAt: expect.any(String)
        });
        if (rfq.subaccountId !== null) {
          expect(typeof rfq.subaccountId).toBe('number');
        }
        if (rfq.clientId !== null) {
          expect(typeof rfq.clientId).toBe('number');
        }
        if (rfq.price !== null) {
          expect(typeof rfq.price).toBe('string');
        }
        if (rfq.quantity !== null) {
          expect(typeof rfq.quantity).toBe('string');
        }
        if (rfq.quoteQuantity !== null) {
          expect(typeof rfq.quoteQuantity).toBe('string');
        }
      });
    });
  });

  describe('Get quote history', () => {
    it('Retrieves the quote history for the user', async () => {
      const request: QuoteHistoryRequest = {
        limit: 10,
        offset: 0
      };
      
      const response = await bpxClient.history.getQuoteHistory(request);

      expect(isSuccess(response)).toBe(true);
      const quotes = response.data as QuoteHistorical[];
      // expect(quotes.length).toBeGreaterThan(0);

      quotes.forEach(quote => {
        expect(quote).toMatchObject({
          userId: expect.any(Number),
          rfqId: expect.any(String),
          quoteId: expect.any(String),
          symbol: expect.any(String),
          side: expect.any(String),
          bidPrice: expect.any(String),
          askPrice: expect.any(String),
          status: expect.any(String),
          createdAt: expect.any(String)
        });
        if (quote.subaccountId !== null) {
          expect(typeof quote.subaccountId).toBe('number');
        }
        if (quote.clientId !== null) {
          expect(typeof quote.clientId).toBe('number');
        }
      });
    });
  });

  describe('Get settlement history', () => {
    it('History of settlement operations for the account', async () => {
      const request: SettlementHistoryRequest = {
        limit: 10,
        offset: 0
      };
      
      const response = await bpxClient.history.getSettlementHistory(request);
      
      expect(isSuccess(response)).toBe(true);
      const settlements = response.data as Settlement[];
      // expect(settlements.length).toBeGreaterThan(0);

      settlements.forEach(settlement => {
        expect(settlement).toMatchObject({
          quantity: expect.any(String),
          source: expect.any(String),
          timestamp: expect.any(String),
          userId: expect.any(Number)
        });
        if (settlement.subaccountId !== null) {
          expect(typeof settlement.subaccountId).toBe('number');
        }
      });
    });
  });

  describe('Get strategy history', () => {
    it('Retrieves the strategy history for the user', async () => {
      const request: StrategyHistoryRequest = {
        limit: 10,
        offset: 0
      };
      
      const response = await bpxClient.history.getStrategyHistory(request);
      
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
        if (strategy.executedQuantity !== null) {
          expect(typeof strategy.executedQuantity).toBe('string');
        }
        if (strategy.executedQuoteQuantity !== null) {
          expect(typeof strategy.executedQuoteQuantity).toBe('string');
        }
        if (strategy.cancelReason !== null) {
          expect(typeof strategy.cancelReason).toBe('string');
        }
        if (strategy.quantity !== null) {
          expect(typeof strategy.quantity).toBe('string');
        }
        if (strategy.clientStrategyId !== null) {
          expect(typeof strategy.clientStrategyId).toBe('number');
        }
      });
    });
  });
  
});