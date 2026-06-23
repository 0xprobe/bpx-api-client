import { Side, SortDirection } from "../../common/common.types";
import { OrderStatus, SystemOrderType } from "../order/order.types";

export interface RequestForQuotePayload {
    clientId?: number;
    quantity?: string;
    quoteQuantity?: string;
    price?: string;
    symbol: string;
    side: Side;
    executionMode?: RfqExecutionMode;
}

export interface RequestForQuote {
    rfqId: string;
    clientId: number | null;
    symbol: string;
    side: Side;
    price: string | null;
    quantity: string | null;
    quoteQuantity: string | null;
    submissionTime: number;
    expiryTime: number;
    status: OrderStatus;
    executionMode?: RfqExecutionMode;
    createdAt: number;
}

export enum RfqExecutionMode {
    AwaitAccept = 'AwaitAccept',
    Immediate = 'Immediate'
}

export interface QuoteAcceptPayload {
    rfqId?: string;
    clientId?: number;
    quoteId: string;
}

export interface RequestForQuoteRefreshPayload {
    rfqId: string;
}

export interface RequestForQuoteCancelPayload {
    rfqId?: string;
    clientId?: number;
}

export interface QuotePayload {
    rfqId: string;
    clientId?: number;
    bidPrice: string;
    askPrice: string;
}

export interface Quote {
    rfqId: string;
    quoteId: string;
    clientId: number | null;
    bidPrice: string;
    askPrice: string;
    status: OrderStatus;
    createdAt: number;
}

export interface RfqsRequest {
    symbol?: string;
    rfqId?: number;
    deferredSettlement?: boolean;
    subaccountId?: number;
}

export interface RfqWithQuotes {
    rfq: RequestForQuote;
    quotes: Quote[];
}

export interface RfqHistoryRequest {
  rfqId?: string;
  symbol?: string;
  status?: OrderStatus;
  side?: Side;
  limit?: number;
  offset?: number;
  sortDirection?: SortDirection;
}

export interface RequestForQuoteHistorical {
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
  sortDirection?: SortDirection;
}

export interface QuoteHistorical {
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

export interface RfqFillHistoryRequest {
  quoteId?: string;
  symbol?: string;
  side?: Side;
  fillType?: RfqFillType;
  deferredSettlement?: boolean;
  limit?: number;
  offset?: number;
  sortDirection?: SortDirection;
}

export enum RfqFillType {
  User = 'User',
  CollateralConversion = 'CollateralConversion'
}

export interface RequestForQuoteFillHistorical {
  rfqId: string;
  clientId?: number;
  quoteId: string;
  symbol: string;
  side: Side;
  quantity?: string;
  quoteQuantity?: string;
  fillQuantity?: string;
  fillQuoteQuantity?: string;
  fillPrice: string;
  createdAt: string;
  filledAt: string;
  systemOrderType?: SystemOrderType;
}

export interface QuoteFillHistoryRequest {
  quoteId?: string;
  symbol?: string;
  side?: Side;
  limit?: number;
  offset?: number;
  sortDirection?: SortDirection;
}

export interface QuoteFillHistorical {
  clientId?: number;
  quoteId: string;
  rfqId: string;
  symbol: string;
  side: Side;
  quantity: string;
  fillPrice: string;
  fee: string;
  feeSymbol: string;
  createdAt: string;
  filledAt: string;
}
