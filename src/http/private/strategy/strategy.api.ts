import { HttpMethod } from '../../common/api.types';
import { StrategyType, StrategyRequest, StrategiesRequest, StrategyCreatePayload, StrategyCancelPayload, StrategyCancelAllPayload, StrategyHistoryRequest, Strategy } from './strategy.types';
import { BpxHttpHandler } from '../../bpxHttpHandler';

export class StrategyApi {

  constructor(private httpHandler: BpxHttpHandler) {}

  // https://docs.backpack.exchange/#tag/Strategy/operation/get_strategy
  async getStrategy(queryParams: StrategyRequest) {
    return this.httpHandler.execute<StrategyType>(HttpMethod.GET, '/api/v1/strategy', queryParams);
  }

  // https://docs.backpack.exchange/#tag/Strategy/operation/get_open_strategies
  async getOpenStrategies(queryParams?: StrategiesRequest) {
    return this.httpHandler.execute<StrategyType[]>(HttpMethod.GET, '/api/v1/strategies', queryParams);
  }

  // https://docs.backpack.exchange/#tag/Strategy/operation/strategy_create
  async createStrategy(body: StrategyCreatePayload) {
    return this.httpHandler.execute<StrategyType>(HttpMethod.POST, '/api/v1/strategy', body);
  }

  // https://docs.backpack.exchange/#tag/Strategy/operation/cancel_strategy
  async cancelStrategy(body: StrategyCancelPayload) {
    return this.httpHandler.execute<StrategyType>(HttpMethod.DELETE, '/api/v1/strategy', body);
  }

  // https://docs.backpack.exchange/#tag/Strategy/operation/cancel_open_strategies
  async cancelOpenStrategies(body: StrategyCancelAllPayload) {
    return this.httpHandler.execute<StrategyType[]>(HttpMethod.DELETE, '/api/v1/strategies', body);
  }

  // https://docs.backpack.exchange/#tag/Strategy/operation/get_strategies_history
  async getStrategyHistory(queryParams: StrategyHistoryRequest) {
    return this.httpHandler.execute<Strategy[]>(HttpMethod.GET, '/wapi/v1/history/strategies', queryParams);
  }

}
