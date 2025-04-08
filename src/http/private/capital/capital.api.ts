import { HttpMethod } from '../../common/api.types';
import { AccountWithdrawalPayload, Balance, Deposit, DepositAddress, TransfersRequest, MarginAccountSummary, Withdrawal } from './capital.types';
import { BpxHttpHandler } from '../../bpxHttpHandler';

export class CapitalApi {

  constructor(private httpHandler: BpxHttpHandler) {}

  // https://docs.backpack.exchange/#tag/Capital/operation/get_balances
  async getBalances() {
    return this.httpHandler.execute<Balance>(HttpMethod.GET, '/api/v1/capital');
  }

  // https://docs.backpack.exchange/#tag/Capital/operation/get_collateral
  async getCollateral() {
    return this.httpHandler.execute<MarginAccountSummary>(HttpMethod.GET, '/api/v1/capital/collateral');
  }

  // https://docs.backpack.exchange/#tag/Capital/operation/get_deposits
  async getDeposits(queryParams: TransfersRequest) {
    return this.httpHandler.execute<Deposit[]>(HttpMethod.GET, '/wapi/v1/capital/deposits', queryParams);
  }

  // https://docs.backpack.exchange/#tag/Capital/operation/get_deposit_address
  async getDepositAddress(blockchain: string) {
    return this.httpHandler.execute<DepositAddress>(HttpMethod.GET, '/wapi/v1/capital/deposit/address', { blockchain });
  }

  // https://docs.backpack.exchange/#tag/Capital/operation/get_withdrawals
  async getWithdrawals(queryParams: TransfersRequest) {
    return this.httpHandler.execute<Withdrawal[]>(HttpMethod.GET, '/wapi/v1/capital/withdrawals', queryParams);
  }

  // https://docs.backpack.exchange/#tag/Capital/operation/request_withdrawal
  async requestWithdrawal(body: AccountWithdrawalPayload) {
    return this.httpHandler.execute<Withdrawal>(HttpMethod.POST, '/wapi/v1/capital/withdrawals', body);
  }

}