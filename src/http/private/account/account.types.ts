export interface AccountSummary {
  autoBorrowSettlements: boolean;
  autoLend: boolean;
  autoRealizePnl: boolean;
  autoRepayBorrows: boolean;
  borrowLimit: string;
  futuresMakerFee: string;
  futuresTakerFee: string;
  leverageLimit: string;
  limitOrders: number;
  liquidating: boolean;
  positionLimit: string;
  spotMakerFee: string;
  spotTakerFee: string;
  triggerOrders: number;
}

export interface UpdateAccountRequest {
  autoBorrowSettlements?: boolean;
  autoLend?: boolean;
  autoRepayBorrows?: boolean;
  leverageLimit?: string;
}

export interface MaxBorrowQuantity {
  maxBorrowQuantity: string;
  symbol: string;
}

export interface MaxOrderQuantityRequest {
  symbol: string;
  side: string;
  price?: string;
  reduceOnly?: boolean;
  autoBorrow?: boolean;
  autoBorrowRepay?: boolean;
  autoLendRedeem?: boolean;
}

export interface MaxOrderQuantity {
  autoBorrow: boolean | null;
  autoBorrowRepay: boolean | null;
  autoLendRedeem: boolean | null;
  maxOrderQuantity: string;
  price: string | null;
  side: string;
  symbol: string;
  reduceOnly: boolean | null;
}

export interface MaxWithdrawalQuantityRequest {
  symbol: string;
  autoBorrow?: boolean;
  autoLendRedeem?: boolean;
}

export interface MaxWithdrawalQuantity {
  autoBorrow: boolean | null;
  autoLendRedeem: boolean | null;
  maxWithdrawalQuantity: string;
  symbol: string;
}
