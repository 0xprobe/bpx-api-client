import { MarketType, SelfTradePrevention, Side, TimeInForce, BorrowLendSide, OrderDirection } from "../../common/common.types";
import { OrderStatus } from "../order/order.types";

export interface BorrowHistoryRequest {
  type?: BorrowLendEventType;
  sources?: string;
  positionId?: string;
  symbol?: string;
  limit?: number;
  offset?: number;
  sortDirection?: OrderDirection;
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
  sortDirection?: OrderDirection;
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
  sortDirection?: OrderDirection;
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

export interface DustConversionHistoryRequest {
  id?: number;
  symbol?: string;
  limit?: number;
  offset?: number;
  sortDirection?: OrderDirection;
}

export interface DustConversion {
  id: number;
  quantity: string;
  symbol: string;
  usdcReceived: string;
  timestamp: string;
}

export interface FillHistoryRequest {
  orderId?: string;
  from?: number;
  to?: number;
  symbol?: string;
  limit?: number;
  offset?: number;
  fillType?: FillType;
  marketType?: MarketType[];
}

export enum FillType {
  User = 'User',
  BookLiquidation = 'BookLiquidation',
  Adl = 'Adl',
  Backstop = 'Backstop',
  Liquidation = 'Liquidation',
  AllLiquidation = 'AllLiquidation',
  CollateralConversion = 'CollateralConversion',
  CollateralConversionAndSpotLiquidation = 'CollateralConversionAndSpotLiquidation'
}

export interface OrderFill {
  clientId: string | null;
  fee: string;
  feeSymbol: string;
  isMaker: boolean;
  orderId: string;
  price: string;
  quantity: string;
  side: Side;
  symbol: string;
  systemOrderType?: SystemOrderType;
  timestamp: string;
  tradeId?: number;
}

export enum SystemOrderType {
  CollateralConversion = 'CollateralConversion',
  FutureExpiry = 'FutureExpiry',
  LiquidatePositionOnAdl = 'LiquidatePositionOnAdl',
  LiquidatePositionOnBook = 'LiquidatePositionOnBook',
  LiquidatePositionOnBackstop = 'LiquidatePositionOnBackstop',
  OrderBookClosed = 'OrderBookClosed'
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

export interface OrderHistoryRequest {
  orderId?: string;
  symbol?: string;
  limit?: number;
  offset?: number;
  marketType?: MarketType[];
}

export interface Order {
  id: string;
  createdAt: string;
  executedQuantity: string | null;
  executedQuoteQuantity: string | null;
  expiryReason: OrderExpiryReason | null;
  orderType: OrderTypeEnum;
  postOnly?: boolean;
  price?: string;
  quantity?: string;
  quoteQuantity?: string;
  selfTradePrevention: SelfTradePrevention;
  status: string;
  side: Side;
  stopLossTriggerPrice: string | null;
  stopLossLimitPrice: string | null;
  stopLossTriggerBy: string | null;
  symbol: string;
  takeProfitTriggerPrice: string | null;
  takeProfitLimitPrice: string | null;
  takeProfitTriggerBy: string | null;
  timeInForce: TimeInForce;
  triggerBy: string | null;
  triggerPrice: string | null;
  triggerQuantity: string | null;
}

export enum OrderExpiryReason {
  AccountTradingSuspended = 'AccountTradingSuspended',
  FillOrKill = 'FillOrKill',
  InsufficientBorrowableQuantity = 'InsufficientBorrowableQuantity',
  InsufficientFunds = 'InsufficientFunds',
  InsufficientLiquidity = 'InsufficientLiquidity',
  InvalidPrice = 'InvalidPrice',
  InvalidQuantity = 'InvalidQuantity',
  ImmediateOrCancel = 'ImmediateOrCancel',
  InsufficientMargin = 'InsufficientMargin',
  Liquidation = 'Liquidation',
  PostOnlyTaker = 'PostOnlyTaker',
  ReduceOnlyNotReduced = 'ReduceOnlyNotReduced',
  SelfTradePrevention = 'SelfTradePrevention',
  PriceImpact = 'PriceImpact',
  Unknown = 'Unknown',
  UserPermissions = 'UserPermissions'
}

export enum OrderTypeEnum {
  Market = 'Market',
  Limit = 'Limit'
}

export interface ProfitAndLossHistoryRequest {
  subaccountId?: number;
  symbol?: string;
  limit?: number;
  offset?: number;
}

export interface PnlPayment {
  pnlRealized: string;
  symbol: string;
  timestamp: string;
}
export interface RfqHistoryRequest {
  rfqId?: string;
  symbol?: string;
  status?: OrderStatus;
  side?: Side;
  limit?: number;
  offset?: number;
  sortDirection?: OrderDirection;
}

export interface RfqHistory {
  userId: number;
  subaccountId: number | null;
  rfqId: string;
  clientId: number | null;
  symbol: string;
  side: Side;
  price: string;
  quantity: string;
  quoteQuantity: string;
  submissionTime: string;
  expiryTime: string;
  status: OrderStatus;
  executionMode: 'AwaitAccept';
  createdAt: string;
}

export interface QuoteHistoryRequest {
  quoteId?: string;
  symbol?: string;
  status?: OrderStatus;
  limit?: number;
  offset?: number;
  sortDirection?: OrderDirection;
}

export interface QuoteHistory {
  userId: number;
  subaccountId: number | null;
  rfqId: string;
  quoteId: string;
  clientId: number | null;
  bidPrice: string;
  askPrice: string;
  status: OrderStatus;
  createdAt: string;
}

export interface SettlementHistoryRequest {
  limit?: number;
  offset?: number;
  source?: SettlementSourceFilter;
}

export enum SettlementSourceFilter {
  BackstopLiquidation = 'BackstopLiquidation',
  CulledBorrowInterest = 'CulledBorrowInterest',
  CulledRealizePnl = 'CulledRealizePnl',
  CulledRealizePnlBookUtilization = 'CulledRealizePnlBookUtilization',
  FundingPayment = 'FundingPayment',
  RealizePnl = 'RealizePnl',
  TradingFees = 'TradingFees',
  TradingFeesSystem = 'TradingFeesSystem'
}

export interface Settlement {
  quantity: string;
  source: SettlementSource;
  subaccountId: number | null;
  timestamp: string;
  userId: number;
}

export enum SettlementSource {
  TradingFees = 'TradingFees',
  TradingFeesSystem = 'TradingFeesSystem',
  FundingPayment = 'FundingPayment',
  CulledBorrowInterest = 'CulledBorrowInterest',
  CulledRealizePnlAuto = 'CulledRealizePnlAuto',
  CulledRealizePnlBookUtilisation = 'CulledRealizePnlBookUtilisation',
  CulledRealizePnlAccountThreshold = 'CulledRealizePnlAccountThreshold',
  CulledRealizePnlSystemThreshold = 'CulledRealizePnlSystemThreshold',
  RealizePnl = 'RealizePnl',
  BackstopProviderLiquidation = 'BackstopProviderLiquidation',
  BackstopAdlLiquidation = 'BackstopAdlLiquidation',
  BackstopLiquidityFundProceeds = 'BackstopLiquidityFundProceeds'
}

export interface StrategyHistoryRequest {
  strategyId?: string;
  symbol?: string;
  limit?: number;
  offset?: number;
  marketType?: MarketType[];
  sortDirection?: OrderDirection;
}
export interface StrategyHistory {
  id: string;
  createdAt: string;
  executedQuantity: string | null;
  executedQuoteQuantity: string | null;
  cancelReason: OrderExpiryReason | null;
  strategyType: string;
  quantity: string;
  selfTradePrevention: SelfTradePrevention;
  status: string;
  side: Side;
  symbol: string;
  timeInForce: TimeInForce;
  clientStrategyId?: number;
  duration?: number;
  interval?: number;
  randomizedIntervalQuantity?: boolean;
}