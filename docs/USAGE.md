# Usage Guide

A per-category reference for the BPX API client. Methods are grouped exactly as in the
official [Backpack Exchange API](https://docs.backpack.exchange/) documentation.

- Every method returns a `Promise<ApiResponse<T>>` (see [Response format](#response-format)).
- Public endpoints need no credentials; authenticated endpoints are signed automatically.
- All request/response types are exported from the package root.

```typescript
import { BpxApiClient } from 'bpx-api-client';

const client = new BpxApiClient({
  apiKey: process.env.BPX_API_KEY!,
  apiSecret: process.env.BPX_API_SECRET!,
});
```

## Table of contents

- [Response format](#response-format)
- Public: [Assets](#assets) · [Borrow Lend Markets](#borrow-lend-markets) · [Markets](#markets) · [System](#system) · [Trades](#trades)
- Authenticated: [Account](#account) · [Borrow Lend](#borrow-lend) · [Capital](#capital) · [Order](#order) · [Position](#position) · [RFQ](#rfq) · [Strategy](#strategy)
- [WebSocket streams](#websocket-streams)

## Response format

```typescript
import { isSuccess } from 'bpx-api-client';

const res = await client.markets.getMarket('SOL_USDC');
if (isSuccess(res)) {
  console.log(res.data.symbol); // res.data is typed as Market
} else {
  console.error(res.statusCode, res.error.code, res.error.message);
}
```

`ApiResponse<T>` = `{ statusCode: number; data: T | {}; error: { code, message } | {} }`.

---

# Public endpoints

## Assets

| Method | Returns |
|--------|---------|
| `getAssets()` | `MarketAsset[]` |
| `getCollateral()` | `CollateralSummary[]` |

```typescript
const assets = await client.assets.getAssets();
const collateral = await client.assets.getCollateral();
```

## Borrow Lend Markets

| Method | Returns |
|--------|---------|
| `getBorrowLendMarkets()` | `BorrowLendMarket[]` |
| `getBorrowLendMarketsHistory(params: BorrowLendMarketsHistoryRequest)` | `BorrowLendHistory[]` |
| `getApyRates(params?: ApyRatesRequest)` | `ApyRates` |

```typescript
import { BorrowLendMarketHistoryInterval } from 'bpx-api-client';

await client.borrowLendMarkets.getBorrowLendMarkets();
await client.borrowLendMarkets.getBorrowLendMarketsHistory({ interval: BorrowLendMarketHistoryInterval.OneDay });
await client.borrowLendMarkets.getApyRates();
```

## Markets

| Method | Returns |
|--------|---------|
| `getMarkets()` | `Market[]` |
| `getMarket(symbol: string)` | `Market` |
| `getTicker(params: TickerRequest)` | `Ticker` |
| `getTickers(interval?: TickerInterval)` | `Ticker[]` |
| `getDepth(symbol: string)` | `Depth` |
| `getKlines(params: KlineRequest)` | `Kline[]` |
| `getMarkPrices(symbol?: string)` | `MarkPrice[]` |
| `getOpenInterest(symbol?: string)` | `OpenInterest[]` |
| `getFundingIntervalRates(params: FundingIntervalRatesRequest)` | `FundingIntervalRates[]` |
| `getPredictionEvents(params?: PredictionRequest)` | `Event[]` |
| `getPredictionTags()` | `Tag[]` |
| `getMarketSessions()` | `MarketSession[]` |
| `getMarketHolidays()` | `MarketHoliday[]` |
| `getSecurities()` | `Security[]` |

```typescript
import { KlineInterval } from 'bpx-api-client';

await client.markets.getMarket('SOL_USDC');
await client.markets.getDepth('SOL_USDC');
await client.markets.getKlines({ symbol: 'SOL_USDC', interval: KlineInterval.OneHour, startTime: 1700000000 });
await client.markets.getPredictionEvents({ limit: 10 });
await client.markets.getSecurities();
```

## System

| Method | Returns |
|--------|---------|
| `status()` | `StatusAndMessage` |
| `ping()` | `string` |
| `getSystemTime()` | `string` |
| `getWallets()` | `WalletResponse[]` |

```typescript
await client.system.status();
await client.system.getWallets();
```

## Trades

| Method | Returns |
|--------|---------|
| `getRecentTrades(params: TradesRequest)` | `Trade[]` |
| `getHistoricalTrades(params: TradesRequest)` | `Trade[]` |

```typescript
await client.trades.getRecentTrades({ symbol: 'SOL_USDC', limit: 100 });
```

---

# Authenticated endpoints

## Account

| Method | Returns |
|--------|---------|
| `getAccount()` | `AccountSummary` |
| `updateAccount(body: UpdateAccountRequest)` | `AccountSummary` |
| `getMaxBorrowQuantity(symbol: string)` | `MaxBorrowQuantity` |
| `getMaxOrderQuantity(params: MaxOrderQuantityRequest)` | `MaxOrderQuantity` |
| `getMaxWithdrawalQuantity(params: MaxWithdrawalQuantityRequest)` | `MaxWithdrawalQuantity` |

```typescript
import { Side } from 'bpx-api-client';

await client.account.getAccount();
await client.account.getMaxOrderQuantity({ symbol: 'SOL_USDC', side: Side.Bid });
```

## Borrow Lend

| Method | Returns |
|--------|---------|
| `getBorrowLendPositions()` | `BorrowLendPositionWithMargin[]` |
| `executeBorrowLend(body: BorrowLendExecutePayload)` | `BorrowLendPositionWithMargin` |
| `getBorrowLendHistory(params: BorrowHistoryRequest)` | `BorrowLendMovement[]` |
| `getInterestHistory(params: InterestHistoryRequest)` | `InterestPayment[]` |
| `getBorrowLendPositionHistory(params: BorrowPositionHistoryRequest)` | `BorrowLendPositionRow[]` |

```typescript
import { BorrowLendSide } from 'bpx-api-client';

await client.borrowLend.executeBorrowLend({ quantity: '0.1', side: BorrowLendSide.Lend, symbol: 'USDC' });
await client.borrowLend.getInterestHistory({ limit: 10 });
```

## Capital

| Method | Returns |
|--------|---------|
| `getBalances()` | `Balance` |
| `getCollateral()` | `MarginAccountSummary` |
| `getDeposits(params: TransfersRequest)` | `Deposit[]` |
| `getDepositAddress(blockchain: string)` | `DepositAddress` |
| `getWithdrawals(params: TransfersRequest)` | `Withdrawal[]` |
| `requestWithdrawal(body: AccountWithdrawalPayload)` | `Withdrawal` |
| `convertDustBalance(symbol?: string)` | `void` |
| `getDustConversionHistory(params: DustConversionHistoryRequest)` | `DustConversion[]` |
| `getSettlementHistory(params: SettlementHistoryRequest)` | `Settlement[]` |

```typescript
await client.capital.getBalances();
await client.capital.requestWithdrawal({ address: '...', blockchain: 'Solana', quantity: '0.01', symbol: 'SOL' });
await client.capital.getDustConversionHistory({ limit: 10 });
```

## Order

| Method | Returns |
|--------|---------|
| `executeOrder(body: OrderExecutePayload)` | `OpenOrder` |
| `executeOrders(body: OrderExecutePayload[])` | `OpenOrder[]` |
| `getOpenOrder(params: OrderRequest)` | `OpenOrder` |
| `getOpenOrders(params: OpenOrdersRequest)` | `OpenOrder[]` |
| `cancelOpenOrder(body: OrderRequest)` | `OpenOrder` |
| `cancelOpenOrders(body: OrderCancelAllPayload)` | `OpenOrder[]` |
| `getFillHistory(params: FillHistoryRequest)` | `OrderFill[]` |
| `getOrderHistory(params: OrderHistoryRequest)` | `Order[]` |

```typescript
import { Side, OrderType, TimeInForce } from 'bpx-api-client';

const order = await client.order.executeOrder({
  symbol: 'SOL_USDC',
  side: Side.Bid,
  orderType: OrderType.Limit,
  quantity: '0.05',
  price: '150',
  timeInForce: TimeInForce.GTC,
});

await client.order.getOpenOrders({ symbol: 'SOL_USDC' });
await client.order.cancelOpenOrders({ symbol: 'SOL_USDC' });
await client.order.getFillHistory({ symbol: 'SOL_USDC', limit: 50 });
```

## Position

| Method | Returns |
|--------|---------|
| `getOpenPositions(params?: PositionRequest)` | `FuturePositionWithMargin[]` |
| `getFundingPayments(params: FundingPaymentsRequest)` | `FundingPayment[]` |
| `getPositionHistory(params: PositionHistoryRequest)` | `PositionHistoryRow[]` |

```typescript
await client.position.getOpenPositions();
await client.position.getOpenPositions({ symbol: 'BTC_USDC_PERP' });
await client.position.getFundingPayments({ symbol: 'BTC_USDC_PERP', limit: 10 });
```

## RFQ

| Method | Returns |
|--------|---------|
| `submitRequestForQuote(body: RequestForQuotePayload)` | `RequestForQuote` |
| `acceptQuote(body: QuoteAcceptPayload)` | `RequestForQuote` |
| `refreshQuote(body: RequestForQuoteRefreshPayload)` | `RequestForQuote` |
| `cancelRequestForQuote(body: RequestForQuoteCancelPayload)` | `RequestForQuote` |
| `submitQuote(body: QuotePayload)` | `Quote` |
| `getOpenRfqs(params?: RfqsRequest)` | `RfqWithQuotes[]` |
| `getRfqHistory(params: RfqHistoryRequest)` | `RequestForQuoteHistorical[]` |
| `getQuoteHistory(params: QuoteHistoryRequest)` | `QuoteHistorical[]` |
| `getRfqFillHistory(params: RfqFillHistoryRequest)` | `RequestForQuoteFillHistorical[]` |
| `getQuoteFillHistory(params: QuoteFillHistoryRequest)` | `QuoteFillHistorical[]` |

```typescript
import { Side, RfqExecutionMode } from 'bpx-api-client';

await client.rfq.submitRequestForQuote({ symbol: 'SOL_USDC_RFQ', side: Side.Bid, quantity: '1', executionMode: RfqExecutionMode.AwaitAccept });
await client.rfq.getOpenRfqs();
await client.rfq.getRfqHistory({ limit: 10 });
```

## Strategy

| Method | Returns |
|--------|---------|
| `getStrategy(params: StrategyRequest)` | `StrategyType` |
| `getOpenStrategies(params?: StrategiesRequest)` | `StrategyType[]` |
| `createStrategy(body: StrategyCreatePayload)` | `StrategyType` |
| `cancelStrategy(body: StrategyCancelPayload)` | `StrategyType` |
| `cancelOpenStrategies(body: StrategyCancelAllPayload)` | `StrategyType[]` |
| `getStrategyHistory(params: StrategyHistoryRequest)` | `Strategy[]` |

```typescript
import { Side, StrategyTypeEnum } from 'bpx-api-client';

await client.strategy.createStrategy({
  strategyType: StrategyTypeEnum.Scheduled,
  side: Side.Bid,
  symbol: 'SOL_USDC',
  quantity: '1',
  duration: 3600,
  interval: 60,
});

await client.strategy.getOpenStrategies({ symbol: 'SOL_USDC' });
```

---

# WebSocket streams

`client.streams` manages a single WebSocket connection. Public streams are sent as-is;
private streams (`orderUpdate`, `positionUpdate`, `RFQUpdate`) are signed automatically.

```typescript
import { SubscriptionType, KlineInterval } from 'bpx-api-client';

await client.streams.open();

const unsubscribe = client.streams.addMessageHandler((message) => {
  console.log(message);
});

// Public streams
client.streams.bookTicker(SubscriptionType.SUBSCRIBE, 'SOL_USDC');
client.streams.depth(SubscriptionType.SUBSCRIBE, 'SOL_USDC');
client.streams.kline(SubscriptionType.SUBSCRIBE, KlineInterval.OneMinute, 'SOL_USDC');
client.streams.ticker(SubscriptionType.SUBSCRIBE, 'SOL_USDC');
client.streams.markPrice(SubscriptionType.SUBSCRIBE, 'SOL_USDC_PERP');
client.streams.openInterest(SubscriptionType.SUBSCRIBE, 'SOL_USDC_PERP');
client.streams.trade(SubscriptionType.SUBSCRIBE, 'SOL_USDC');
client.streams.liquidation(SubscriptionType.SUBSCRIBE);

// Private streams (require credentials)
client.streams.orderUpdate(SubscriptionType.SUBSCRIBE, 'BTC_USDC');
client.streams.positionUpdate(SubscriptionType.SUBSCRIBE);
client.streams.RFQUpdate(SubscriptionType.SUBSCRIBE);

// Stop a single handler, or close the whole connection
unsubscribe();
await client.streams.close();
```

| Method | Type |
|--------|------|
| `open()` / `close()` | connection |
| `addMessageHandler(cb)` → `() => void` | returns an unsubscribe function |
| `orderUpdate / positionUpdate / RFQUpdate(type, symbol?)` | private |
| `bookTicker / depth / ticker / markPrice / openInterest / trade(type, symbol)` | public |
| `kline(type, interval, symbol)` | public |
| `liquidation(type)` | public |

---

> **Note:** `client.borrowLend.getEstimatedLiquidationPrice` (`/borrowLend/position/liquidationPrice`)
> is currently disabled — see the [Changelog](../CHANGELOG.md) known issues.
