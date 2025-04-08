import { MarketType, SelfTradePrevention, Side, TimeInForce, BorrowLendSide } from "../../common/common.types";

export interface BorrowHistoryRequest {
  type?: BorrowLendEventType;
  sources?: string;
  positionId?: string;
  symbol?: string;
  limit?: number;
  offset?: number;
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
