import { HttpMethod } from '../../common/api.types';
import { OrderRequest, OrderExecutePayload, OpenOrdersRequest, OrderCancelAllPayload, OpenOrder } from './order.types';
import { BpxHttpHandler } from '../../bpxHttpHandler';

export class OrderApi {

  constructor(private httpHandler: BpxHttpHandler) {}

  // https://docs.backpack.exchange/#tag/Order/operation/get_order
  async getOpenOrder(queryParams: OrderRequest) {
    return this.httpHandler.execute<OpenOrder>(HttpMethod.GET, '/api/v1/order', queryParams);
  }

  // https://docs.backpack.exchange/#tag/Order/operation/execute_order
  async executeOrder(body: OrderExecutePayload) {
    return this.httpHandler.execute<OpenOrder>(HttpMethod.POST, '/api/v1/order', body);
  }

  // https://docs.backpack.exchange/#tag/Order/operation/cancel_order
  async cancelOpenOrder(body: OrderRequest) {
    return this.httpHandler.execute<OpenOrder>(HttpMethod.DELETE, '/api/v1/order', body);
  }

  // https://docs.backpack.exchange/#tag/Order/operation/execute_order_batch
  async executeOrders(body: OrderExecutePayload[]) {
    return this.httpHandler.execute<OpenOrder[]>(HttpMethod.POST, '/api/v1/orders', body);
  }

  //https://docs.backpack.exchange/#tag/Order/operation/get_open_orders
  async getOpenOrders(queryParams: OpenOrdersRequest) {
    return this.httpHandler.execute<OpenOrder[]>(HttpMethod.GET, '/api/v1/orders', queryParams);
  }

  //https://docs.backpack.exchange/#tag/Order/operation/cancel_open_orders
  async cancelOpenOrders(body: OrderCancelAllPayload) {
    return this.httpHandler.execute<OpenOrder[]>(HttpMethod.DELETE, '/api/v1/orders', body);
  }
  
}
