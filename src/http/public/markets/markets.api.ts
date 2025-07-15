import { HttpMethod } from '../../common/api.types';
import { Depth, Market, TickerRequest, Ticker, Kline, KlineRequest, MarkPrice, OpenInterest, FundingIntervalRatesRequest, FundingIntervalRates, TickerInterval } from './markets.types';
import { BpxHttpHandler } from '../../bpxHttpHandler';

export class MarketsApi {

  constructor(private httpHandler: BpxHttpHandler) {}

  
  // https://docs.backpack.exchange/#tag/Markets/operation/get_markets
  async getMarkets() {
    return this.httpHandler.execute<Market[]>(HttpMethod.GET, '/api/v1/markets');
  }
  
  // https://docs.backpack.exchange/#tag/Markets/operation/get_market
  async getMarket(symbol: string) {
    return this.httpHandler.execute<Market>(HttpMethod.GET, '/api/v1/market', { symbol });
  }

  // https://docs.backpack.exchange/#tag/Markets/operation/get_ticker
  async getTicker(queryParams: TickerRequest) {
    return this.httpHandler.execute<Ticker>(HttpMethod.GET, '/api/v1/ticker', queryParams);
  }

  // https://docs.backpack.exchange/#tag/Markets/operation/get_tickers
  async getTickers(interval?: TickerInterval) {
    return this.httpHandler.execute<Ticker[]>(HttpMethod.GET, '/api/v1/tickers', interval ? { interval } : undefined);
  }

  // https://docs.backpack.exchange/#tag/Markets/operation/get_depth
  async getDepth(symbol: string) {
    return this.httpHandler.execute<Depth>(HttpMethod.GET, '/api/v1/depth', { symbol });
  }

  // https://docs.backpack.exchange/#tag/Markets/operation/get_klines
  async getKlines(queryParams: KlineRequest) {
    return this.httpHandler.execute<Kline[]>(HttpMethod.GET, '/api/v1/klines', queryParams);
  }

  // https://docs.backpack.exchange/#tag/Markets/operation/get_mark_prices
  async getMarkPrices(symbol?: string) {
    return this.httpHandler.execute<MarkPrice[]>(HttpMethod.GET, '/api/v1/markPrices', symbol ? { symbol } : undefined);
  }

  // https://docs.backpack.exchange/#tag/Markets/operation/get_open_interest
  async getOpenInterest(symbol?: string) {
    return this.httpHandler.execute<OpenInterest[]>(HttpMethod.GET, '/api/v1/openInterest', symbol ? { symbol } : undefined);
  }

  // https://docs.backpack.exchange/#tag/Markets/operation/get_funding_interval_rates
  async getFundingIntervalRates(queryParams: FundingIntervalRatesRequest) {
    return this.httpHandler.execute<FundingIntervalRates[]>(HttpMethod.GET, '/api/v1/fundingRates', queryParams);
  }

} 