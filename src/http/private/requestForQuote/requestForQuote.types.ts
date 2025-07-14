export interface SubmitRFQRequest {
    clientId?: number;
    quantity?: string;
    quoteQuantity?: string;
    price?: string;
    symbol: string;
    side: 'Bid' | 'Ask';
    executionMode?: 'AwaitAccept' | 'Immediate';
}

export interface RFQResponse {
    rfqId: string;
    clientId: number;
    symbol: string;
    side: 'Bid' | 'Ask';
    price: string;
    quantity: string;
    quoteQuantity?: string;
    submissionTime: number;
    expiryTime: number;
    status: 'Pending' | 'Accepted' | 'Rejected' | 'Cancelled';
    executionMode?: 'AwaitAccept' | 'Immediate';
    createdAt: number;
}

export interface AcceptQuoteRequest {
    rfqId?: string;
    clientId?: number;
    quoteId: string;
}

export interface RefreshQuoteRequest {
    rfqId: string;
}

export interface CancelQuoteRequest {
    rfqId?: string;
    clientId?: number;
}

export interface SubmitQuoteRequest {
    rfqId: string;
    clientId?: number;
    bidPrice: string;
    askPrice: string;
}

export interface SubmitQuoteResponse {
    rfqId: string;
    quoteId: string;
    clientId: number;
    bidPrice: string;
    askPrice: string;
    status: 'Pending' | 'Accepted' | 'Rejected' | 'Cancelled';
    createdAt: number;
}
