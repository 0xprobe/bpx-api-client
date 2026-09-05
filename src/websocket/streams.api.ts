import { BpxWebSocketHandler } from "./bpxWebSocketHandler";
import { KlineInterval } from "../http/public/markets/markets.types";
import { BpxCredentials } from "../authentication/bpxCredentials";

export class StreamsApi {

  private wsHandler: BpxWebSocketHandler;
  
  constructor(auth: BpxCredentials, opts: { wsUrl?: string, debug?: boolean } = {}) {
    this.wsHandler = new BpxWebSocketHandler(auth, opts);
  }

  async open() {
    await this.wsHandler.connect();
  }

  async close() {
    await this.wsHandler.disconnect();
  }

  addMessageHandler(callback: (message: any) => void): () => void {
    return this.wsHandler.onMessage(callback);
  }

  removeMessageHandler(unregister: () => void): void {
    unregister();
  }

  // 1.private
  // Pushes the new absolute available/locked/staked quantities whenever an asset
  // balance changes. Cannot be scoped to a single asset.
  balanceUpdate(type: SubscriptionType) {
    this.wsHandler.sendWithSignature({
      method: type,
      params: ['account.balanceUpdate']
    });
  }

  orderUpdate(type: SubscriptionType, symbol?: string) {
    this.wsHandler.sendWithSignature({
      method: type,
      params: [symbol ? `account.orderUpdate.${symbol}` : 'account.orderUpdate']
    });
  }

  positionUpdate(type: SubscriptionType, symbol?: string) {
    this.wsHandler.sendWithSignature({
      method: type,
      params: [symbol ? `account.positionUpdate.${symbol}` : 'account.positionUpdate']
    });
  }

  RFQUpdate(type: SubscriptionType, symbol?: string) {
    this.wsHandler.sendWithSignature({
      method: type,
      params: [symbol ? `account.rfqUpdate.${symbol}` : 'account.rfqUpdate']
    });
  }
  
  // 2. public
  bookTicker(type: SubscriptionType, symbol: string) {
    this.wsHandler.send({
      method: type,
      params: ['bookTicker.' + symbol]
    });
  }

  depth(type: SubscriptionType, symbol: string) {
      this.wsHandler.send({
          method: type,
          params: ['depth.' + symbol]
      });
  }

  kline(type: SubscriptionType, interval: KlineInterval, symbol: string) {
      this.wsHandler.send({
          method: type,
          params: ['kline.' + interval + '.' + symbol]
      });
  }

  liquidation(type: SubscriptionType, symbol: string) {
      this.wsHandler.send({
          method: type,
          params: ['liquidation.' + symbol]
      });
  }

  markPrice(type: SubscriptionType, symbol: string) {
      this.wsHandler.send({
          method: type,
          params: ['markPrice.' + symbol]
      });
  }

  ticker(type: SubscriptionType, symbol: string) {
      this.wsHandler.send({
          method: type,
          params: ['ticker.' + symbol]
      });
  }

  // Provider-derived 24hr statistics, separate from `ticker` (venue activity).
  externalTicker(type: SubscriptionType, symbol: string) {
      this.wsHandler.send({
          method: type,
          params: ['externalTicker.' + symbol]
      });
  }

  // Provider-derived stock quote. Takes a bare stock ticker (e.g. 'BRK.B'),
  // not an exchange asset ('AAPL.US') or market symbol ('AAPL.US_USDC').
  stockPrice(type: SubscriptionType, ticker: string) {
      this.wsHandler.send({
          method: type,
          params: ['stockPrice.' + ticker]
      });
  }

  openInterest(type: SubscriptionType, symbol: string) {
      this.wsHandler.send({
          method: type,
          params: ['openInterest.' + symbol]
      });
  }

  trade(type: SubscriptionType, symbol: string) {
      this.wsHandler.send({
          method: type,
          params: ['trade.' + symbol]
      });
  }
 
}

export enum SubscriptionType {
  SUBSCRIBE = 'SUBSCRIBE',
  UNSUBSCRIBE = 'UNSUBSCRIBE'
}