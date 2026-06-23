import { BpxHttpHandler } from './http/bpxHttpHandler';

// Public APIs
import { AssetsApi } from './http/public/assets/assets.api';
import { BorrowLendMarketsApi } from './http/public/borrowLendMarkets/borrowLendMarkets.api';
import { MarketsApi } from './http/public/markets/markets.api';
import { SystemApi } from './http/public/system/system.api';
import { TradesApi } from './http/public/trades/trades.api';

// Authenticated APIs
import { AccountApi } from './http/private/account/account.api';
import { BorrowLendApi } from './http/private/borrowLend/borrowLend.api';
import { CapitalApi } from './http/private/capital/capital.api';
import { PositionApi } from './http/private/position/position.api';
import { OrderApi } from './http/private/order/order.api';
import { StrategyApi } from './http/private/strategy/strategy.api';
import { RfqApi } from './http/private/rfq/rfq.api';

// WebSocket APIs
import { StreamsApi } from './websocket/streams.api';

// Authentication
import { BpxCredentials } from './authentication/bpxCredentials';

export class BpxApiClient {

  private readonly auth: BpxCredentials;

  public readonly assets: AssetsApi;
  public readonly borrowLendMarkets: BorrowLendMarketsApi;
  public readonly markets: MarketsApi;
  public readonly system: SystemApi;
  public readonly trades: TradesApi;

  public readonly account: AccountApi;
  public readonly borrowLend: BorrowLendApi;
  public readonly capital: CapitalApi;
  public readonly position: PositionApi;
  public readonly order: OrderApi;
  public readonly rfq: RfqApi;
  public readonly strategy: StrategyApi;

  public readonly streams: StreamsApi;

  constructor(config: BpxConfig) {
    
    this.auth = new BpxCredentials(config.apiKey, config.apiSecret);
    const httpHandler = new BpxHttpHandler(this.auth, { debug: config.debug, httpUrl: config.httpUrl });
    
    // Public APIs
    this.assets = new AssetsApi(httpHandler);
    this.borrowLendMarkets = new BorrowLendMarketsApi(httpHandler);
    this.markets = new MarketsApi(httpHandler);
    this.system = new SystemApi(httpHandler);
    this.trades = new TradesApi(httpHandler);

    // Private APIs
    this.account = new AccountApi(httpHandler);
    this.borrowLend = new BorrowLendApi(httpHandler);
    this.capital = new CapitalApi(httpHandler);
    this.position = new PositionApi(httpHandler);
    this.order = new OrderApi(httpHandler);
    this.rfq = new RfqApi(httpHandler);
    this.strategy = new StrategyApi(httpHandler);

    // WebSocket APIs
    this.streams = new StreamsApi(this.auth, { wsUrl: config.wsUrl, debug: config.debug });
  }
  
}

export interface BpxConfig {
  apiKey: string;
  apiSecret: string;
  httpUrl?: string;
  wsUrl?: string;
  debug?: boolean;
}