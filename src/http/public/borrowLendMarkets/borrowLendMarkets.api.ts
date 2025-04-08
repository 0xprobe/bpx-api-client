import { HttpMethod } from '../../common/api.types';
import { BorrowLendHistory, BorrowLendMarket, BorrowLendMarketHistoryInterval, BorrowLendMarketsHistoryRequest } from './borrowLendMarkets.types';
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

}