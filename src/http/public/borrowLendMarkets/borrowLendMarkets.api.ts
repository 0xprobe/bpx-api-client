import { HttpMethod } from '../../common/api.types';
import { ApyRates, ApyRatesRequest, BorrowLendHistory, BorrowLendMarket, BorrowLendMarketHistoryInterval, BorrowLendMarketsHistoryRequest } from './borrowLendMarkets.types';
import { BpxHttpHandler } from '../../bpxHttpHandler';

export class BorrowLendMarketsApi {

  constructor(private httpHandler: BpxHttpHandler) {}

  // https://docs.backpack.exchange/#tag/Borrow-Lend-Markets/operation/get_borrow_lend_markets
  async getBorrowLendMarkets() {
      return this.httpHandler.execute<BorrowLendMarket[]>(HttpMethod.GET, '/api/v1/borrowLend/markets');
  }

  // https://docs.backpack.exchange/#tag/Borrow-Lend-Markets/operation/get_borrow_lend_markets_history
  async getBorrowLendMarketsHistory(queryParams: BorrowLendMarketsHistoryRequest) {
    return this.httpHandler.execute<BorrowLendHistory[]>(HttpMethod.GET, '/api/v1/borrowLend/markets/history', queryParams);
  }

  // https://docs.backpack.exchange/#tag/Borrow-Lend-Markets/operation/get_apy_rates
  async getApyRates(queryParams?: ApyRatesRequest) {
    return this.httpHandler.execute<ApyRates>(HttpMethod.GET, '/api/v1/borrowLend/apy', queryParams);
  }

}