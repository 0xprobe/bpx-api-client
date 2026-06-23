import { MarketType, PositionImfFunction, SortDirection } from "../../common/common.types";

export interface PositionRequest {
  symbol?: string;
  marketType?: MarketType;
}

export interface FuturePositionWithMargin {
  breakEvenPrice: string;
  entryPrice: string;
  estLiquidationPrice: string;
  imf: string;
  imfFunction: PositionImfFunction;
  markPrice: string;
  mmf: string;
  mmfFunction: PositionImfFunction;
  netCost: string;
  netQuantity: string;
  netExposureQuantity: string;
  netExposureNotional: string;
  pnlRealized: string;
  pnlUnrealized: string;
  cumulativeFundingPayment: string;
  subaccountId: number | null;
  symbol: string;
  userId: number;
  positionId: string;
  cumulativeInterest: string;
}

export interface FundingPaymentsRequest {
  subaccountId?: number;
  symbol?: string;
  limit?: number;
  offset?: number;
}

export interface FundingPayment {
  userId: number;
  subaccountId: number | null;
  symbol: string;
  quantity: string;
  intervalEndTimestamp: string;
  fundingRate: string;
}

export interface PositionHistoryRequest {
  symbol?: string;
  state?: PositionState;
  marketType?: MarketType[];
  limit?: number;
  offset?: number;
  sortDirection?: SortDirection;
}

export enum PositionState {
  Open = 'Open',
  Closed = 'Closed'
}

export interface PositionHistoryRow {
  id: string;
  symbol: string;
  netQuantity: string;
  netExposureQuantity: string;
  netExposureNotional: string;
  netCost: string;
  markPrice: string;
  entryPrice: string;
  cumulativePnlRealized: string;
  unrealizedPnl: string;
  fundingQuantity: string;
  interest: string;
  liquidated: string;
  imf: string;
  fees: string;
  state: PositionState;
  closedVolume: string;
  liquidationFees: string;
  closingPrice?: string;
  accountLeverage?: string;
  openedAt?: string;
  closedAt?: string;
}
