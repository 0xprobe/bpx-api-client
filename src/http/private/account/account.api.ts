import { HttpMethod } from '../../common/api.types';
import { AccountSummary, MaxBorrowQuantity, MaxOrderQuantity, MaxOrderQuantityRequest, MaxWithdrawalQuantity, MaxWithdrawalQuantityRequest, UpdateAccountRequest } from './account.types';
import { BpxHttpHandler } from '../../bpxHttpHandler';

export class AccountApi {

    constructor(private httpHandler: BpxHttpHandler) {}

  // https://docs.backpack.exchange/#tag/Account/operation/get_account
  async getAccount() {
      return this.httpHandler.execute<AccountSummary>(HttpMethod.GET, '/api/v1/account');
  }

  // https://docs.backpack.exchange/#tag/Account/operation/update_account_settings
  async updateAccount(body: UpdateAccountRequest) {
      return this.httpHandler.execute<AccountSummary>(HttpMethod.PATCH, '/api/v1/account', body);
  }

  // https://docs.backpack.exchange/#tag/Account/operation/get_max_borrow_quantity
  async getMaxBorrowQuantity(symbol: string) {
      return this.httpHandler.execute<MaxBorrowQuantity>(HttpMethod.GET, '/api/v1/account/limits/borrow', { symbol });
  }

  // https://docs.backpack.exchange/#tag/Account/operation/get_max_order_quantity
  async getMaxOrderQuantity(queryParams: MaxOrderQuantityRequest) {
      return this.httpHandler.execute<MaxOrderQuantity>(HttpMethod.GET, '/api/v1/account/limits/order', queryParams);
  }

  // https://docs.backpack.exchange/#tag/Account/operation/get_max_withdrawal_quantity
  async getMaxWithdrawalQuantity(queryParams: MaxWithdrawalQuantityRequest) {
      return this.httpHandler.execute<MaxWithdrawalQuantity>(HttpMethod.GET, '/api/v1/account/limits/withdrawal', queryParams);
  }
  
}