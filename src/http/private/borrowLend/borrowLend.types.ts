import { PositionImfFunction, BorrowLendSide, SortDirection } from "../../common/common.types";

export interface BorrowLendPositionWithMargin {
  cumulativeInterest: string;
  id: string;
  imf: string;
  imfFunction: PositionImfFunction;
  netQuantity: string;
  markPrice: string;
  mmf: string;
  mmfFunction: PositionImfFunction;
  netExposureQuantity: string;
  netExposureNotional: string;
  symbol: string;
}

export interface BorrowLendExecutePayload {
  quantity: string;
  side: BorrowLendSide;
  symbol: string;
}

// DISABLED: see getEstimatedLiquidationPrice in borrowLend.api.ts — the endpoint's
// signing instruction is not documented and the community-SDK value returns 401.
// Re-enable these types together with the method once the instruction is known.
//
// export interface EstimatedLiquidationPriceRequest {
//   subaccountId?: number;
//   borrow: string;
// }
//
// export interface PositionEstimatedLiquidationPrice {
//   liquidationPrice: string;
//   markPrice: string;
// }

export interface BorrowHistoryRequest {
  type?: BorrowLendEventType;
  sources?: string;
  positionId?: string;
  symbol?: string;
  limit?: number;
  offset?: number;
  sortDirection?: SortDirection;
}

export enum BorrowLendEventType {
  Borrow = 'Borrow',
  BorrowRepay = 'BorrowRepay',
  Lend = 'Lend',
  LendRedeem = 'LendRedeem'
}

export interface BorrowLendMovement {
  eventType: BorrowLendEventType;
  positionId: string;
  positionQuantity: string | null;
  quantity: string;
  source: BorrowLendSource;
  symbol: string;
  timestamp: string;
  spotMarginOrderId: string | null;
}

export enum BorrowLendSource {
  AdlProvider = 'AdlProvider',
  AutoBorrowRepay = 'AutoBorrowRepay',
  AutoLend = 'AutoLend',
  BackstopProvider = 'BackstopProvider',
  Interest = 'Interest',
  Liquidation = 'Liquidation',
  LiquidationAdl = 'LiquidationAdl',
  LiquidationBackstop = 'LiquidationBackstop',
  Manual = 'Manual',
  Reconciliation = 'Reconciliation',
  SpotMargin = 'SpotMargin',
  Withdrawal = 'Withdrawal'
}

export interface InterestHistoryRequest {
  asset?: string;
  symbol?: string;
  positionId?: string;
  limit?: number;
  offset?: number;
  source?: InterestPaymentSource;
  sortDirection?: SortDirection;
}

export enum InterestPaymentSource {
  UnrealizedPnl = 'UnrealizedPnl',
  BorrowLend = 'BorrowLend'
}

export interface InterestPayment {
  paymentType: string;
  interestRate: string;
  interval: number;
  marketSymbol: string;
  positionId: string;
  quantity: string;
  symbol: string;
  timestamp: string;
}

export interface BorrowPositionHistoryRequest {
  symbol?: string;
  side?: BorrowLendSide;
  state?: BorrowLendPositionState;
  limit?: number;
  offset?: number;
  sortDirection?: SortDirection;
}

export enum BorrowLendPositionState {
  Open = 'Open',
  Closed = 'Closed'
}

export interface BorrowLendPositionRow {
  positionId: string;
  quantity: string;
  symbol: string;
  source: BorrowLendSource;
  cumulativeInterest: string;
  avgInterestRate: string;
  side: BorrowLendSide;
  createdAt: string;
}

