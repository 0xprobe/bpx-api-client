import { MarketType, SelfTradePrevention, Side, TimeInForce } from "../../common/common.types";

export interface OrderRequest {
  clientId?: number;
  orderId?: string;
  symbol: string;
}

export type OpenOrder = MarketOrder | LimitOrder;

export interface MarketOrder {
  orderType: OrderType.Market | OrderType.StopMarket;
  id: string;
  clientId: number | null;
  createdAt: number;
  executedQuantity: string;
  executedQuoteQuantity: string;
  quantity: string | null;
  quoteQuantity: string | null;
  reduceOnly: boolean | null;
  timeInForce: TimeInForce;
  selfTradePrevention: SelfTradePrevention;
  side: Side;
  status: OrderStatus;
  stopLossTriggerPrice: string | null;
  stopLossLimitPrice: string | null;
  stopLossTriggerBy: string | null;
  symbol: string;
  takeProfitTriggerPrice: string | null;
  takeProfitLimitPrice: string | null;
  takeProfitTriggerBy: string | null;
  triggerBy: string | null;
  triggerPrice: string | null;
  triggerQuantity: string | null;
  triggeredAt: number | null;
  relatedOrderId: string | null;
  strategyId: string | null;
}

export interface LimitOrder {
  orderType: OrderType.Limit | OrderType.StopLimit;
  id: string;
  clientId: number | null;
  createdAt: number;
  executedQuantity: string;
  executedQuoteQuantity: string;
  postOnly: boolean;
  price: string;
  quantity: string;
  reduceOnly: boolean | null;
  selfTradePrevention: SelfTradePrevention;
  status: OrderStatus;
  stopLossTriggerPrice: string | null;
  stopLossLimitPrice: string | null;
  stopLossTriggerBy: string | null;
  side: Side;
  symbol: string;
  takeProfitTriggerPrice: string | null;
  takeProfitLimitPrice: string | null;
  takeProfitTriggerBy: string | null;
  timeInForce: TimeInForce;
  triggerBy: string | null;
  triggerPrice: string | null;
  triggerQuantity: string | null;
  triggeredAt: number | null;
  relatedOrderId: string | null;
  strategyId: string | null;
}

export enum OrderType {
  Market = 'Market',
  Limit = 'Limit',
  StopMarket = 'StopMarket',
  StopLimit = 'StopLimit'
}

export enum OrderStatus {
  Cancelled = 'Cancelled',
  Expired = 'Expired',
  Filled = 'Filled',
  New = 'New',
  PartiallyFilled = 'PartiallyFilled',
  TriggerPending = 'TriggerPending',
  TriggerFailed = 'TriggerFailed'
}

export interface OrderExecutePayload {
  
  autoLend?: boolean;
  autoLendRedeem?: boolean;
  autoBorrow?: boolean;
  autoBorrowRepay?: boolean;

  clientId?: number;
  orderType: OrderType;
  postOnly?: boolean;
  price?: string;
  quantity?: string;
  quoteQuantity?: string;
  reduceOnly?: boolean;
  selfTradePrevention?: SelfTradePrevention;
  side: Side;
  symbol: string;
  timeInForce?: TimeInForce;
  
  stopLossLimitPrice?: string;
  stopLossTriggerBy?: string;
  stopLossTriggerPrice?: string;

  takeProfitLimitPrice?: string;
  takeProfitTriggerBy?: string;
  takeProfitTriggerPrice?: string;

  triggerBy?: string;
  triggerPrice?: string;
  triggerQuantity?: string;
}

export interface OpenOrdersRequest {
  marketType?: MarketType;
  symbol?: string;
}

export interface OrderCancelAllPayload {
  symbol: string;
  orderType?: CancelOrderTypeEnum;
}

export enum CancelOrderTypeEnum {
  RestingLimitOrder = 'RestingLimitOrder',
  ConditionalOrder = 'ConditionalOrder'
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
  postOnly: boolean | null;
  price: string | null;
  quantity: string | null;
  quoteQuantity: string | null;
  selfTradePrevention: SelfTradePrevention;
  status: OrderStatus;
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
  clientId: number | null;
  systemOrderType: SystemOrderType | null;
  strategyId: string | null;
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