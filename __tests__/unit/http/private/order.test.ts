import { isSuccess } from '../../../../src/http/bpxHttpHandler';
import { createClient } from '../../setup';
import { OrderRequest, OrderExecutePayload, OpenOrdersRequest, OrderCancelAllPayload, OrderType, OpenOrder } from '../../../../src/http/private/order/order.types';
import { Side, TimeInForce } from '../../../../src/http/common/common.types';

describe('Order API Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;
  let orderId: string;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Execute order', () => {
    it('Submits an order to the matching engine for execution', async () => {
      const payload: OrderExecutePayload = {
        symbol: 'SOL_USDC',
        side: Side.Bid,
        orderType: OrderType.Limit,
        quantity: '0.07',
        price: '95',
        timeInForce: TimeInForce.GTC,
        postOnly: true
      };
      
      const response = await bpxClient.order.executeOrder(payload);
      
      expect(isSuccess(response)).toBe(true);
      const order = response.data as OpenOrder;
      
      // Save order ID for other tests
      orderId = order.id;
      
      // Common fields for both MarketOrder and LimitOrder
      expect(order).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(Number),
        executedQuantity: expect.any(String),
        executedQuoteQuantity: expect.any(String),
        selfTradePrevention: expect.any(String),
        side: payload.side,
        status: expect.any(String),
        symbol: payload.symbol,
        timeInForce: payload.timeInForce
      });

      // Optional fields type checking if they exist
      if (order.clientId !== null) {
        expect(typeof order.clientId).toBe('number');
      }
      if (order.reduceOnly !== null) {
        expect(typeof order.reduceOnly).toBe('boolean');
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
      if (order.triggeredAt !== null) {
        expect(typeof order.triggeredAt).toBe('number');
      }
      if (order.relatedOrderId !== null) {
        expect(typeof order.relatedOrderId).toBe('string');
      }

      // MarketOrder specific fields
      if (order.orderType === 'Market' || order.orderType === 'StopMarket') {
        expect(order).toMatchObject({
          orderType: expect.stringMatching(/^(Market|StopMarket)$/),
          quantity: expect.any(String),
          quoteQuantity: expect.any(String)
        });
      }
      // LimitOrder specific fields
      else if (order.orderType === 'Limit' || order.orderType === 'StopLimit') {
        expect(order).toMatchObject({
          orderType: expect.stringMatching(/^(Limit|StopLimit)$/),
          postOnly: expect.any(Boolean),
          price: payload.price,
          quantity: payload.quantity
        });
      }
    });
  });

  describe('Get open order', () => {
    it('Retrieves an open order from the order book', async () => {
      const request: OrderRequest = {
        symbol: 'SOL_USDC',
        orderId: orderId // Use the saved order ID
      };
      
      const response = await bpxClient.order.getOpenOrder(request);
      
      expect(isSuccess(response)).toBe(true);
      const order = response.data as OpenOrder;
      
      // Common fields for both MarketOrder and LimitOrder
      expect(order).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(Number),
        executedQuantity: expect.any(String),
        executedQuoteQuantity: expect.any(String),
        selfTradePrevention: expect.any(String),
        side: expect.any(String),
        status: expect.any(String),
        symbol: expect.any(String),
        timeInForce: expect.any(String)
      });

      // Optional fields type checking if they exist
      if (order.clientId !== null) {
        expect(typeof order.clientId).toBe('number');
      }
      if (order.reduceOnly !== null) {
        expect(typeof order.reduceOnly).toBe('boolean');
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
      if (order.triggeredAt !== null) {
        expect(typeof order.triggeredAt).toBe('number');
      }
      if (order.relatedOrderId !== null) {
        expect(typeof order.relatedOrderId).toBe('string');
      }

      // MarketOrder specific fields
      if (order.orderType === 'Market' || order.orderType === 'StopMarket') {
        expect(order).toMatchObject({
          orderType: expect.stringMatching(/^(Market|StopMarket)$/),
          quantity: expect.any(String),
          quoteQuantity: expect.any(String)
        });
      }
      // LimitOrder specific fields
      else if (order.orderType === 'Limit' || order.orderType === 'StopLimit') {
        expect(order).toMatchObject({
          orderType: expect.stringMatching(/^(Limit|StopLimit)$/),
          postOnly: expect.any(Boolean),
          price: expect.any(String),
          quantity: expect.any(String)
        });
      }
    });
  });

  describe('Cancel open order', () => {
    it('Cancels an open order from the order book', async () => {
      const request: OrderRequest = {
        symbol: 'SOL_USDC',
        orderId: orderId // Use the saved order ID
      };
      
      const response = await bpxClient.order.cancelOpenOrder(request);
      
      expect(isSuccess(response)).toBe(true);
      const order = response.data as OpenOrder;
      
      // Common fields for both MarketOrder and LimitOrder
      expect(order).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(Number),
        executedQuantity: expect.any(String),
        executedQuoteQuantity: expect.any(String),
        selfTradePrevention: expect.any(String),
        side: expect.any(String),
        status: expect.any(String),
        symbol: expect.any(String),
        timeInForce: expect.any(String)
      });

      // Optional fields type checking if they exist
      if (order.clientId !== null) {
        expect(typeof order.clientId).toBe('number');
      }
      if (order.reduceOnly !== null) {
        expect(typeof order.reduceOnly).toBe('boolean');
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
      if (order.triggeredAt !== null) {
        expect(typeof order.triggeredAt).toBe('number');
      }
      if (order.relatedOrderId !== null) {
        expect(typeof order.relatedOrderId).toBe('string');
      }

      // MarketOrder specific fields
      if (order.orderType === 'Market' || order.orderType === 'StopMarket') {
        expect(order).toMatchObject({
          orderType: expect.stringMatching(/^(Market|StopMarket)$/),
          quantity: expect.any(String),
          quoteQuantity: expect.any(String)
        });
      }
      // LimitOrder specific fields
      else if (order.orderType === 'Limit' || order.orderType === 'StopLimit') {
        expect(order).toMatchObject({
          orderType: expect.stringMatching(/^(Limit|StopLimit)$/),
          postOnly: expect.any(Boolean),
          price: expect.any(String),
          quantity: expect.any(String)
        });
      }
    });
  });

  describe('Get open orders', () => {
    it('Retrieves all open orders', async () => {
      const request: OpenOrdersRequest = {
        symbol: 'SOL_USDC'
      };
      
      const response = await bpxClient.order.getOpenOrders(request);
      
      expect(isSuccess(response)).toBe(true);
      const orders = response.data as OpenOrder[];
      // expect(orders.length).toBeGreaterThan(0);

      orders.forEach(order => {
        // Common fields for both MarketOrder and LimitOrder
        expect(order).toMatchObject({
          id: expect.any(String),
          createdAt: expect.any(Number),
          executedQuantity: expect.any(String),
          executedQuoteQuantity: expect.any(String),
          selfTradePrevention: expect.any(String),
          side: expect.any(String),
          status: expect.any(String),
          symbol: expect.any(String),
          timeInForce: expect.any(String)
        });

        // Optional fields type checking if they exist
        if (order.clientId !== null) {
          expect(typeof order.clientId).toBe('number');
        }
        if (order.reduceOnly !== null) {
          expect(typeof order.reduceOnly).toBe('boolean');
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
        if (order.triggeredAt !== null) {
          expect(typeof order.triggeredAt).toBe('number');
        }
        if (order.relatedOrderId !== null) {
          expect(typeof order.relatedOrderId).toBe('string');
        }

        // MarketOrder specific fields
        if (order.orderType === 'Market' || order.orderType === 'StopMarket') {
          expect(order).toMatchObject({
            orderType: expect.stringMatching(/^(Market|StopMarket)$/),
            quantity: expect.any(String),
            quoteQuantity: expect.any(String)
          });
        }
        // LimitOrder specific fields
        else if (order.orderType === 'Limit' || order.orderType === 'StopLimit') {
          expect(order).toMatchObject({
            orderType: expect.stringMatching(/^(Limit|StopLimit)$/),
            postOnly: expect.any(Boolean),
            price: expect.any(String),
            quantity: expect.any(String)
          });
        }
      });
    });
  });

  describe('Cancel open orders', () => {
    it('Cancels all open orders on the specified market', async () => {
      const request: OrderCancelAllPayload = {
        symbol: 'SOL_USDC'
      };
      
      const response = await bpxClient.order.cancelOpenOrders(request);
      
      expect(isSuccess(response)).toBe(true);
      const orders = response.data as OpenOrder[];
      // expect(orders.length).toBeGreaterThan(0);

      orders.forEach(order => {
        // Common fields for both MarketOrder and LimitOrder
        expect(order).toMatchObject({
          id: expect.any(String),
          createdAt: expect.any(Number),
          executedQuantity: expect.any(String),
          executedQuoteQuantity: expect.any(String),
          selfTradePrevention: expect.any(String),
          side: expect.any(String),
          status: expect.any(String),
          symbol: expect.any(String),
          timeInForce: expect.any(String)
        });

        // Optional fields type checking if they exist
        if (order.clientId !== null) {
          expect(typeof order.clientId).toBe('number');
        }
        if (order.reduceOnly !== null) {
          expect(typeof order.reduceOnly).toBe('boolean');
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
        if (order.triggeredAt !== null) {
          expect(typeof order.triggeredAt).toBe('number');
        }
        if (order.relatedOrderId !== null) {
          expect(typeof order.relatedOrderId).toBe('string');
        }

        // MarketOrder specific fields
        if (order.orderType === 'Market' || order.orderType === 'StopMarket') {
          expect(order).toMatchObject({
            orderType: expect.stringMatching(/^(Market|StopMarket)$/),
            quantity: expect.any(String),
            quoteQuantity: expect.any(String)
          });
        }
        // LimitOrder specific fields
        else if (order.orderType === 'Limit' || order.orderType === 'StopLimit') {
          expect(order).toMatchObject({
            orderType: expect.stringMatching(/^(Limit|StopLimit)$/),
            postOnly: expect.any(Boolean),
            price: expect.any(String),
            quantity: expect.any(String)
          });
        }
      });
    });
  });

}); 