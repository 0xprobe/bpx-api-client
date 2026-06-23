import { HttpMethod } from "./common/api.types";

export const API_ENDPOINT_INSTRUCTION_MAP: Record<string, string> = {
  // Account
  [`${HttpMethod.GET}:/api/v1/account`]: 'accountQuery',
  [`${HttpMethod.PATCH}:/api/v1/account`]: 'accountUpdate',
  [`${HttpMethod.POST}:/api/v1/account/convertDust`]: 'convertDust',
  [`${HttpMethod.GET}:/api/v1/account/limits/borrow`]: 'maxBorrowQuantity',
  [`${HttpMethod.GET}:/api/v1/account/limits/order`]: 'maxOrderQuantity',
  [`${HttpMethod.GET}:/api/v1/account/limits/withdrawal`]: 'maxWithdrawalQuantity',
  
  // Borrow Lend
  [`${HttpMethod.GET}:/api/v1/borrowLend/positions`]: 'borrowLendPositionQuery',
  [`${HttpMethod.POST}:/api/v1/borrowLend`]: 'borrowLendExecute',
  // DISABLED: GET /api/v1/borrowLend/position/liquidationPrice cannot currently be
  // called with API-key auth. The failure is NOT an instruction/signature problem:
  // a wrong instruction on a normal endpoint returns 400 "Invalid signature", but
  // this endpoint returns 401 "Unauthorized" for every instruction tried (~20
  // candidates), i.e. it is rejected by an authorization gate before signature
  // verification. The same key works on /borrowLend/positions (200), so it is not a
  // general borrow-lend permission issue. Likely session-only or needs a scope the
  // API key cannot grant. Re-enable if Backpack confirms API-key access + instruction.
  // [`${HttpMethod.GET}:/api/v1/borrowLend/position/liquidationPrice`]: '???',

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
  [`${HttpMethod.GET}:/wapi/v1/history/dust`]: 'dustHistoryQueryAll',
  [`${HttpMethod.GET}:/wapi/v1/history/fills`]: 'fillHistoryQueryAll',
  [`${HttpMethod.GET}:/wapi/v1/history/funding`]: 'fundingHistoryQueryAll',
  [`${HttpMethod.GET}:/wapi/v1/history/orders`]: 'orderHistoryQueryAll',
  [`${HttpMethod.GET}:/wapi/v1/history/position`]: 'positionHistoryQueryAll',
  [`${HttpMethod.GET}:/wapi/v1/history/rfq`]: 'rfqHistoryQueryAll',
  [`${HttpMethod.GET}:/wapi/v1/history/rfq/fill`]: 'rfqFillHistoryQueryAll',
  [`${HttpMethod.GET}:/wapi/v1/history/quote`]: 'quoteHistoryQueryAll',
  [`${HttpMethod.GET}:/wapi/v1/history/quote/fill`]: 'quoteFillHistoryQueryAll',
  [`${HttpMethod.GET}:/wapi/v1/history/settlement`]: 'settlementHistoryQueryAll',
  [`${HttpMethod.GET}:/wapi/v1/history/strategies`]: 'strategyHistoryQueryAll',

  // Order
  [`${HttpMethod.GET}:/api/v1/order`]: 'orderQuery',
  [`${HttpMethod.POST}:/api/v1/order`]: 'orderExecute',
  [`${HttpMethod.DELETE}:/api/v1/order`]: 'orderCancel',
  [`${HttpMethod.POST}:/api/v1/orders`]: 'orderExecute',
  [`${HttpMethod.GET}:/api/v1/orders`]: 'orderQueryAll',
  [`${HttpMethod.DELETE}:/api/v1/orders`]: 'orderCancelAll',

  // RFQ
  [`${HttpMethod.GET}:/api/v1/rfqs`]: 'rfqQuery',
  [`${HttpMethod.POST}:/api/v1/rfq`]: 'rfqSubmit',
  [`${HttpMethod.POST}:/api/v1/rfq/accept`]: 'quoteAccept',
  [`${HttpMethod.POST}:/api/v1/rfq/refresh`]: 'rfqRefresh',
  [`${HttpMethod.POST}:/api/v1/rfq/cancel`]: 'rfqCancel',
  [`${HttpMethod.POST}:/api/v1/rfq/quote`]: 'quoteSubmit',

  // Strategy
  [`${HttpMethod.GET}:/api/v1/strategy`]: 'strategyQuery',
  [`${HttpMethod.GET}:/api/v1/strategies`]: 'strategyQueryAll',
  [`${HttpMethod.POST}:/api/v1/strategy`]: 'strategyCreate',
  [`${HttpMethod.DELETE}:/api/v1/strategy`]: 'strategyCancel',
  [`${HttpMethod.DELETE}:/api/v1/strategies`]: 'strategyCancelAll'

};
