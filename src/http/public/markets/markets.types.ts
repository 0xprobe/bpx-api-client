import { MarketType, PositionImfFunction } from "../../common/common.types";

export interface Market {
  symbol: string;
  baseSymbol: string;
  quoteSymbol: string;
  marketType: MarketType;
  filters: OrderBookFilters;
  imfFunction: PositionImfFunction | null;
  mmfFunction: PositionImfFunction | null;
  fundingInterval: number | null;
  fundingRateUpperBound: string | null;
  fundingRateLowerBound: string | null;
  openInterestLimit: string | null;
  orderBookState: OrderBookState;
  createdAt: string;
}

export interface OrderBookFilters {
  price: PriceFilter;
  quantity: QuantityFilter;
}

export enum OrderBookState {
  Open = "Open",
  Closed = "Closed",
  CancelOnly = "CancelOnly",
  LimitOnly = "LimitOnly",
  PostOnly = "PostOnly"
}

export interface PriceFilter {
    minPrice: string;
    maxPrice: string | null;
    tickSize: string;
    maxMultiplier: string | null;
    minMultiplier: string | null;
    maxImpactMultiplier: string | null;
    minImpactMultiplier: string | null;
    meanMarkPriceBand: PriceBandMarkPrice | null;
    meanPremiumBand: PriceBandMeanPremium | null;
    borrowEntryFeeMaxMultiplier: string | null;
    borrowEntryFeeMinMultiplier: string | null;
}

export interface PriceBandMarkPrice {
  maxMultiplier: string;
  minMultiplier: string;
}

export interface PriceBandMeanPremium {
    tolerancePct: string;
}

export interface QuantityFilter {
  minQuantity: string;
  maxQuantity: string | null;
  stepSize: string;
}

export interface TickerRequest {
  symbol: string;
  interval?: TickerInterval;
}

export enum TickerInterval {
  OneDay = '1d',
  OneWeek = '1w'
}

export interface Ticker {
  symbol: string;
  firstPrice: string;
  lastPrice: string;
  priceChange: string;
  priceChangePercent: string;
  high: string;
  low: string;
  volume: string;
  quoteVolume: string;
  trades: string;
}

export interface Depth {
  asks: [string, string][];
  bids: [string, string][];
  lastUpdateId: string;
  timestamp: number;
}

export interface KlineRequest {
  symbol: string;
  interval: KlineInterval;
  startTime: number;
  endTime?: number;
  priceType?: KlinePriceType;
}

export enum KlineInterval {
  OneMinute = '1m',
  ThreeMinutes = '3m',
  FiveMinutes = '5m',
  FifteenMinutes = '15m',
  ThirtyMinutes = '30m',
  OneHour = '1h',
  TwoHours = '2h',
  FourHours = '4h',
  SixHours = '6h',
  EightHours = '8h',
  TwelveHours = '12h',
  OneDay = '1d',
  ThreeDays = '3d',
  OneWeek = '1w',
  OneMonth = '1month'
}

export enum KlinePriceType {
  Last = "Last",
  Index = "Index",
  Mark = "Mark"
}

export interface Kline {
  start: string;
  end: string;
  open: string | null;
  high: string | null;
  low: string | null;
  close: string | null;
  volume: string;
  quoteVolume: string;
  trades: string;
}

export interface MarkPrice {
  fundingRate: string;
  indexPrice: string;
  markPrice: string;
  nextFundingTimestamp: number;
  symbol: string;
}

export interface OpenInterest {
  symbol: string;
  openInterest: string | null;
  timestamp: number;
}

export interface FundingIntervalRatesRequest {
  symbol: string;
  limit?: number;
  offset?: number;
}

export interface FundingIntervalRates {
  symbol: string;
  intervalEndTimestamp: string;
  fundingRate: string;
}
