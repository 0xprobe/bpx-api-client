import { HttpMethod } from '../../common/api.types';
import { BorrowLendExecutePayload, BorrowLendPositionWithMargin, BorrowHistoryRequest, BorrowLendMovement, InterestHistoryRequest, InterestPayment, BorrowPositionHistoryRequest, BorrowLendPositionRow } from './borrowLend.types';
import { BpxHttpHandler } from '../../bpxHttpHandler';

export class BorrowLendApi {

  constructor(private httpHandler: BpxHttpHandler) {}

  // https://docs.backpack.exchange/#tag/Borrow-Lend/operation/get_borrow_lend_positions
  async getBorrowLendPositions() {
      return this.httpHandler.execute<BorrowLendPositionWithMargin[]>(HttpMethod.GET, '/api/v1/borrowLend/positions');
  }

  // https://docs.backpack.exchange/#tag/Borrow-Lend/operation/execute_borrow_lend
  async executeBorrowLend(body: BorrowLendExecutePayload) {
      return this.httpHandler.execute<BorrowLendPositionWithMargin>(HttpMethod.POST, '/api/v1/borrowLend', body);
  }

  // https://docs.backpack.exchange/#tag/Borrow-Lend/operation/get_borrow_lend_estimated_liquidation_price
  //
  // DISABLED: This endpoint requires a signed request, but its signing
  // instruction is not documented in the OpenAPI spec. The value found in a
  // community SDK ('borrowLendPositionLiquidationPrice') was tested with a valid
  // API key and still returns 401 Unauthorized, so it is incorrect/unverified.
  // Re-enable this method (and the related types in borrowLend.types.ts and the
  // entry in instruction.ts) once the correct instruction is known.
  //
  // async getEstimatedLiquidationPrice(queryParams: EstimatedLiquidationPriceRequest) {
  //     return this.httpHandler.execute<PositionEstimatedLiquidationPrice>(HttpMethod.GET, '/api/v1/borrowLend/position/liquidationPrice', queryParams);
  // }

  // https://docs.backpack.exchange/#tag/Borrow-Lend/operation/get_borrow_lend_history
  async getBorrowLendHistory(queryParams: BorrowHistoryRequest) {
    return this.httpHandler.execute<BorrowLendMovement[]>(HttpMethod.GET, '/wapi/v1/history/borrowLend', queryParams);
  }

  // https://docs.backpack.exchange/#tag/Borrow-Lend/operation/get_interest_history
  async getInterestHistory(queryParams: InterestHistoryRequest) {
    return this.httpHandler.execute<InterestPayment[]>(HttpMethod.GET, '/wapi/v1/history/interest', queryParams);
  }

  // https://docs.backpack.exchange/#tag/Borrow-Lend/operation/get_borrow_lend_position_history
  async getBorrowLendPositionHistory(queryParams: BorrowPositionHistoryRequest) {
    return this.httpHandler.execute<BorrowLendPositionRow[]>(HttpMethod.GET, '/wapi/v1/history/borrowLend/positions', queryParams);
  }

}