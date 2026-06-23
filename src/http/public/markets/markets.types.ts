import { CustodyAsset, MarketType, PositionImfFunction } from "../../common/common.types";

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

export interface PredictionRequest {
  symbol?: string;
  tagSlug?: string;
  eventSlug?: string;
  seriesSlug?: string;
  resolved?: boolean;
  limit?: number;
  offset?: number;
}

export interface Event {
  slug: string;
  title: string;
  predictionMarkets: PredictionMarket[];
  tags: Tag[];
  series: Series[];
  description: string;
  imgUrl?: string;
  quoteVolume: string;
  resolution: Resolution;
  resolved: boolean;
  resolutionDelaySecs: number;
}

export interface PredictionMarket {
  marketSymbol: string;
  question: string;
  groupLabel?: string;
  yesOutcomeLabel: string;
  noOutcomeLabel: string;
  rules: string;
  resolvedAt?: string;
  resolutionPrice?: string;
  activePrice: string;
  quoteVolume: string;
  quoteVolumeLifetime: string;
  imgUrl?: string;
  resolutionCondition?: ResolutionCondition;
  proposedResolution?: boolean;
  proposedResolutionAt?: string;
  resolutionDelaySecs: number;
}

export interface Tag {
  slug: string;
  title: string;
}

export interface Series {
  slug: string;
  title: string;
  recurrence?: SeriesRecurrence;
}

export enum SeriesRecurrence {
  Minutely = 'minutely',
  FiveMinutely = 'fiveMinutely',
  FifteenMinutely = 'fifteenMinutely',
  Hourly = 'hourly',
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly'
}

export interface Resolution {
  resolved: boolean;
  startDate: string;
  endDate?: string;
  strikePrice?: string;
  closePrice?: string;
  resolutionSourceEventIdentifier?: string;
  resolutionSource?: ResolutionSource;
  outcome?: string;
}

export enum ResolutionSource {
  Binance = 'binance'
}

// Opaque object in the OpenAPI spec (no defined properties).
export type ResolutionCondition = Record<string, unknown>;

export interface MarketSession {
  name: string;
  description?: string;
  startTime: string;
  endTime: string;
  timezone: string;
  startWeekday: number;
  endWeekday: number;
}

export interface MarketHoliday {
  market: string;
  name: string;
  date: string;
  startTime?: string;
  endTime?: string;
  timezone: string;
}

export interface Security {
  asset: CustodyAsset;
  name: string;
  cusip?: string;
  sessions: SecuritySession[];
}

export interface SecuritySession {
  name: string;
  minQuantity: string;
  maxQuantity?: string;
  stepSize: string;
}
