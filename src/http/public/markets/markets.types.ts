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
  openInterestLimit: string | null;
  orderBookState: "Open" | "Closed" | "CancelOnly" | "LimitOnly" | "PostOnly";
  createdAt: string;
}

export interface OrderBookFilters {
  price: PriceFilter;
  quantity: QuantityFilter;
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
  bids: [string, string][];
  asks: [string, string][];
  lastUpdateId: string;
  timestamp: number;
}

export interface KlineRequest {
  symbol: string;
  interval: KlineInterval;
  startTime: number;
  endTime?: number;
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
