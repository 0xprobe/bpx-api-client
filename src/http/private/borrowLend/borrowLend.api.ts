import { HttpMethod } from '../../common/api.types';
import { BorrowLendExecutePayload, BorrowLendPositionWithMargin } from './borrowLend.types';
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
    
}