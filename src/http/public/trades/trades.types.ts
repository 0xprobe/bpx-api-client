export interface TradesRequest {
  symbol: string;
  limit?: number;
  offset?: number; // only for Get historical trades API
}

export interface Trade {
  id: number | null;
  price: string;
  quantity: string;
  quoteQuantity: string;
  timestamp: number;
  isBuyerMaker: boolean;
}