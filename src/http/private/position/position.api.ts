import { HttpMethod } from '../../common/api.types';
import { FuturePositionWithMargin, PositionRequest, FundingPaymentsRequest, FundingPayment, PositionHistoryRequest, PositionHistoryRow } from './position.types';
import { BpxHttpHandler } from '../../bpxHttpHandler';

export class PositionApi {

  constructor(private httpHandler: BpxHttpHandler) {}

  // https://docs.backpack.exchange/#tag/Position/operation/get_positions
  async getOpenPositions(queryParams?: PositionRequest) {
    return this.httpHandler.execute<FuturePositionWithMargin[]>(HttpMethod.GET, '/api/v1/position', queryParams);
  }

  // https://docs.backpack.exchange/#tag/Position/operation/get_funding_payments
  async getFundingPayments(queryParams: FundingPaymentsRequest) {
    return this.httpHandler.execute<FundingPayment[]>(HttpMethod.GET, '/wapi/v1/history/funding', queryParams);
  }

  // https://docs.backpack.exchange/#tag/Position/operation/get_position_history
  async getPositionHistory(queryParams: PositionHistoryRequest) {
    return this.httpHandler.execute<PositionHistoryRow[]>(HttpMethod.GET, '/wapi/v1/history/position', queryParams);
  }

}
