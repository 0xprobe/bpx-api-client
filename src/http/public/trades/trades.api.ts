import { HttpMethod } from '../../common/api.types';
import { TradesRequest, Trade } from './trades.types';
import { BpxHttpHandler } from '../../bpxHttpHandler';

export class TradesApi {

  constructor(private httpHandler: BpxHttpHandler) {}

  // https://docs.backpack.exchange/#tag/Trades/operation/get_recent_trades
  async getRecentTrades(queryParams: TradesRequest) {
    return this.httpHandler.execute<Trade[]>(HttpMethod.GET, '/api/v1/trades', queryParams);
  }

  // https://docs.backpack.exchange/#tag/Trades/operation/get_historical_trades
  async getHistoricalTrades(queryParams: TradesRequest) {
    return this.httpHandler.execute<Trade[]>(HttpMethod.GET, '/api/v1/trades/history', queryParams);
  }
  
}