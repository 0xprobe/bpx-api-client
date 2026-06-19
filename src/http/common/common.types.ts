export interface PositionImfFunction {
    type: string;
    base: string;
    factor: string;
}

export enum MarketType {
    SPOT = 'SPOT',
    PERP = 'PERP',
    IPERP = 'IPERP',
    DATED = 'DATED',
    PREDICTION = 'PREDICTION',
    RFQ = 'RFQ'
}

export enum Side {
    Bid = 'Bid',
    Ask = 'Ask'
}

export enum SelfTradePrevention {
    RejectTaker = 'RejectTaker',
    RejectMaker = 'RejectMaker',
    RejectBoth = 'RejectBoth'
}

export enum TimeInForce {
    GTC = 'GTC',
    IOC = 'IOC',
    FOK = 'FOK'
}

export enum BorrowLendSide {
    Borrow = 'Borrow',
    Lend = 'Lend'
}

export enum SortDirection {
    Asc = 'Asc',
    Desc = 'Desc'
}

// CustodyAsset is a 7000+ value enum in the OpenAPI spec; represented as a
// string here to match how asset symbols are handled elsewhere in this client.
export type CustodyAsset = string;