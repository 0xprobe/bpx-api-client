import { HttpMethod } from "./common/api.types";

export const API_ENDPOINT_INSTRUCTION_MAP: Record<string, string> = {
  // Account
  [`${HttpMethod.GET}:/api/v1/account`]: 'accountQuery',
  [`${HttpMethod.PATCH}:/api/v1/account`]: 'accountUpdate',
  [`${HttpMethod.GET}:/api/v1/account/limits/borrow`]: 'maxBorrowQuantity',
  [`${HttpMethod.GET}:/api/v1/account/limits/order`]: 'maxOrderQuantity',
  [`${HttpMethod.GET}:/api/v1/account/limits/withdrawal`]: 'maxWithdrawalQuantity',
  
  // Borrow Lend
  [`${HttpMethod.GET}:/api/v1/borrowLend/positions`]: 'borrowLendPositionQuery',
  [`${HttpMethod.POST}:/api/v1/borrowLend`]: 'borrowLendExecute',

  // Capital
  [`${HttpMethod.GET}:/api/v1/capital`]: 'balanceQuery',
  [`${HttpMethod.GET}:/api/v1/capital/collateral`]: 'collateralQuery',
  [`${HttpMethod.GET}:/wapi/v1/capital/deposits`]: 'depositQueryAll',
  [`${HttpMethod.GET}:/wapi/v1/capital/deposit/address`]: 'depositAddressQuery',
  [`${HttpMethod.GET}:/wapi/v1/capital/withdrawals`]: 'withdrawalQueryAll',
  [`${HttpMethod.POST}:/wapi/v1/capital/withdrawals`]: 'withdraw',

  // Futures
  [`${HttpMethod.GET}:/api/v1/position`]: 'positionQuery',
  
  // History
  [`${HttpMethod.GET}:/wapi/v1/history/borrowLend`]: 'borrowHistoryQueryAll',
  [`${HttpMethod.GET}:/wapi/v1/history/interest`]: 'interestHistoryQueryAll',
  [`${HttpMethod.GET}:/wapi/v1/history/borrowLend/positions`]: 'borrowPositionHistoryQueryAll',
  [`${HttpMethod.GET}:/wapi/v1/history/fills`]: 'fillHistoryQueryAll',
  [`${HttpMethod.GET}:/wapi/v1/history/funding`]: 'fundingHistoryQueryAll',
  [`${HttpMethod.GET}:/wapi/v1/history/orders`]: 'orderHistoryQueryAll',
  [`${HttpMethod.GET}:/wapi/v1/history/pnl`]: 'pnlHistoryQueryAll',
  [`${HttpMethod.GET}:/wapi/v1/history/settlement`]: 'settlementHistoryQueryAll',

  // Order
  [`${HttpMethod.GET}:/api/v1/order`]: 'orderQuery',
  [`${HttpMethod.POST}:/api/v1/order`]: 'orderExecute',
  [`${HttpMethod.DELETE}:/api/v1/order`]: 'orderCancel',
  [`${HttpMethod.GET}:/api/v1/orders`]: 'orderQueryAll',
  [`${HttpMethod.DELETE}:/api/v1/orders`]: 'orderCancelAll',

  // RFQ
  [`${HttpMethod.GET}:/api/v1/rfq/quote`]: 'quoteSubmit'

};
