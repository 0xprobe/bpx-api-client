import { MarketType, SelfTradePrevention, Side, TimeInForce, SortDirection, SlippageToleranceType } from "../../common/common.types";

export { SlippageToleranceType };

export interface StrategyRequest {
  clientStrategyId?: number;
  strategyId?: string;
  symbol: string;
}

export interface StrategiesRequest {
  marketType?: MarketType;
  strategyType?: StrategyTypeEnum;
  symbol?: string;
}

export interface StrategyCreatePayload {
  autoLend?: boolean;
  autoLendRedeem?: boolean;
  autoBorrow?: boolean;
  autoBorrowRepay?: boolean;
  clientStrategyId?: number;
  strategyType: StrategyTypeEnum;
  quantity?: string;
  price?: string;
  postOnly?: boolean;
  reduceOnly?: boolean;
  selfTradePrevention?: SelfTradePrevention;
  side: Side;
  symbol: string;
  timeInForce?: TimeInForce;
  duration?: number;
  interval?: number;
  randomizedIntervalQuantity?: boolean;
  slippageTolerance?: string;
  slippageToleranceType?: SlippageToleranceType;
}

export interface StrategyCancelPayload {
  clientStrategyId?: number;
  strategyId?: string;
  symbol: string;
}

export interface StrategyCancelAllPayload {
  symbol: string;
  strategyType?: StrategyTypeEnum;
}

// StrategyType is a discriminated union on `strategyType`; currently the only
// variant is the scheduled strategy.
export type StrategyType = StrategyType_ScheduledStrategy;

export interface StrategyType_ScheduledStrategy extends ScheduledStrategy {
  strategyType: StrategyTypeEnum;
}

export interface ScheduledStrategy {
  id: string;
  clientStrategyId?: number;
  createdAt: number;
  executedQuantity: string;
  executedQuoteQuantity: string;
  quantity: string;
  reduceOnly?: boolean;
  selfTradePrevention: SelfTradePrevention;
  status: StrategyStatus;
  side: Side;
  symbol: string;
  timeInForce: TimeInForce;
  duration: number;
  interval: number;
  randomizedIntervalQuantity?: boolean;
  slippageTolerance?: string;
  slippageToleranceType?: SlippageToleranceType;
}

export interface StrategyHistoryRequest {
  strategyId?: string;
  symbol?: string;
  limit?: number;
  offset?: number;
  marketType?: MarketType[];
  sortDirection?: SortDirection;
}

export interface Strategy {
  id: string;
  createdAt: string;
  executedQuantity: string | null;
  executedQuoteQuantity: string | null;
  cancelReason: StrategyCrankCancelReason | null;
  strategyType: StrategyTypeEnum;
  quantity: string;
  selfTradePrevention: SelfTradePrevention;
  status: StrategyStatus;
  side: Side;
  symbol: string;
  timeInForce: TimeInForce;
  clientStrategyId?: number;
  duration: number;
  interval: number;
  randomizedIntervalQuantity: boolean;
  quoteAsset?: string;
  slippageTolerance?: string;
  slippageToleranceType?: SlippageToleranceType;
}

export enum StrategyCrankCancelReason {
  Expired = 'Expired',
  FillOrKill = 'FillOrKill',
  InsufficientBorrowableQuantity = 'InsufficientBorrowableQuantity',
  InsufficientFunds = 'InsufficientFunds',
  InsufficientLiquidity = 'InsufficientLiquidity',
  InvalidPrice = 'InvalidPrice',
  InvalidQuantity = 'InvalidQuantity',
  InsufficientMargin = 'InsufficientMargin',
  Liquidation = 'Liquidation',
  PositionLimit = 'PositionLimit',
  PriceOutOfBounds = 'PriceOutOfBounds',
  ReduceOnlyNotReduced = 'ReduceOnlyNotReduced',
  SelfTradePrevention = 'SelfTradePrevention',
  Unknown = 'Unknown',
  UserPermissions = 'UserPermissions'
}

export enum StrategyTypeEnum {
  Scheduled = 'Scheduled'
}

export enum StrategyStatus {
  Running = 'Running',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Terminated = 'Terminated'
}
