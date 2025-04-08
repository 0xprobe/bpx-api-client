export interface BorrowLendMarket {
  state: BorrowLendBookState;
  assetMarkPrice: string;
  borrowInterestRate: string;
  borrowedQuantity: string;
  fee: string;
  lendInterestRate: string;
  lentQuantity: string;
  maxUtilization: string;
  openBorrowLendLimit: string;
  optimalUtilization: string;
  symbol: string;
  timestamp: string;
  throttleUtilizationThreshold: string;
  throttleUtilizationBound: string;
  throttleUpdateFraction: string;
  utilization: string;
  stepSize: string;
}

export enum BorrowLendBookState {
  Open = 'Open',
  Closed = 'Closed',
  RepayOnly = 'RepayOnly'
}

export interface BorrowLendMarketsHistoryRequest {
  interval: BorrowLendMarketHistoryInterval;
  symbol?: string;
}

export enum BorrowLendMarketHistoryInterval {
  OneDay = '1d',
  OneWeek = '1w',
  OneMonth = '1month',
  OneYear = '1year'
}

export interface BorrowLendHistory {
  borrowInterestRate: string;
  borrowedQuantity: string;
  lendInterestRate: string;
  lentQuantity: string;
  timestamp: string;
  utilization: string;
}
