import { Side } from "../../common/common.types";
import { OrderStatus } from "../order/order.types";

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
