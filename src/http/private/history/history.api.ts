import { HttpMethod } from '../../common/api.types';

import { BorrowLendMovement, BorrowLendPositionRow, BorrowHistoryRequest, InterestHistoryRequest, BorrowPositionHistoryRequest, FillHistoryRequest, OrderFill, InterestPayment, FundingPaymentsRequest, FundingPayment, OrderHistoryRequest, Order, ProfitAndLossHistoryRequest, PnlPayment, SettlementHistoryRequest, Settlement, DustConversionHistoryRequest, DustConversion, RfqHistoryRequest, RequestForQuoteHistorical, QuoteHistorical, QuoteHistoryRequest, Strategy, StrategyHistoryRequest } from './history.types';
import { BpxHttpHandler } from '../../bpxHttpHandler';

export class HistoryApi {

  constructor(private httpHandler: BpxHttpHandler) {}

  // https://docs.backpack.exchange/#tag/History/operation/get_borrow_lend_history
  async getBorrowLendHistory(queryParams: BorrowHistoryRequest) {
    return this.httpHandler.execute<BorrowLendMovement[]>(HttpMethod.GET, '/wapi/v1/history/borrowLend', queryParams);
  }

  // https://docs.backpack.exchange/#tag/History/operation/get_interest_history
  async getInterestHistory(queryParams: InterestHistoryRequest) {
    return this.httpHandler.execute<InterestPayment[]>(HttpMethod.GET, '/wapi/v1/history/interest', queryParams);
  }

  // https://docs.backpack.exchange/#tag/History/operation/get_borrow_lend_position_history
  async getBorrowLendPositionHistory(queryParams: BorrowPositionHistoryRequest) {
    return this.httpHandler.execute<BorrowLendPositionRow[]>(HttpMethod.GET, '/wapi/v1/history/borrowLend/positions', queryParams);
  }

  // https://docs.backpack.exchange/#tag/History/operation/get_dust_history
  async getDustConversionHistory(queryParams: DustConversionHistoryRequest) {
    return this.httpHandler.execute<DustConversion[]>(HttpMethod.GET, '/wapi/v1/history/dust', queryParams);
  }

  // https://docs.backpack.exchange/#tag/History/operation/get_fills
  async getFillHistory(queryParams: FillHistoryRequest) {
    return this.httpHandler.execute<OrderFill[]>(HttpMethod.GET, '/wapi/v1/history/fills', queryParams);
  }

  // https://docs.backpack.exchange/#tag/History/operation/get_funding_payments
  async getFundingPayments(queryParams: FundingPaymentsRequest) {
    return this.httpHandler.execute<FundingPayment[]>(HttpMethod.GET, '/wapi/v1/history/funding', queryParams);
  }

  // https://docs.backpack.exchange/#tag/History/operation/get_order_history
  async getOrderHistory(queryParams: OrderHistoryRequest) {
    return this.httpHandler.execute<Order[]>(HttpMethod.GET, '/wapi/v1/history/orders', queryParams);
  }

  // https://docs.backpack.exchange/#tag/History/operation/get_pnl_payments
  async getProfitAndLossHistory(queryParams: ProfitAndLossHistoryRequest) {
    return this.httpHandler.execute<PnlPayment[]>(HttpMethod.GET, '/wapi/v1/history/pnl', queryParams);
  }

  // https://docs.backpack.exchange/#tag/History/operation/get_rfq_history
  async getRfqHistory(queryParams: RfqHistoryRequest) {
    return this.httpHandler.execute<RequestForQuoteHistorical[]>(HttpMethod.GET, '/wapi/v1/history/rfq', queryParams);
  }

  // https://docs.backpack.exchange/#tag/History/operation/get_quote_history
  async getQuoteHistory(queryParams: QuoteHistoryRequest) {
    return this.httpHandler.execute<QuoteHistorical[]>(HttpMethod.GET, '/wapi/v1/history/quote', queryParams);
  }

  // https://docs.backpack.exchange/#tag/History/operation/get_settlement_history
  async getSettlementHistory(queryParams: SettlementHistoryRequest) {
    return this.httpHandler.execute<Settlement[]>(HttpMethod.GET, '/wapi/v1/history/settlement', queryParams);
  }

  // https://docs.backpack.exchange/#tag/History/operation/get_strategies_history
  async getStrategyHistory(queryParams: StrategyHistoryRequest) {
    return this.httpHandler.execute<Strategy[]>(HttpMethod.GET, '/wapi/v1/history/strategies', queryParams);
  }

}