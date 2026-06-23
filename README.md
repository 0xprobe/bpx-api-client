# BPX API Client

A TypeScript client library for the Backpack Exchange API, written by 0xprobe.

All requests, responses, and parameters are strongly typed. Type definitions follow the official [Backpack Exchange API](https://docs.backpack.exchange/) specification, and the client modules mirror the categories used in the official documentation.

## Installation

```bash
npm install bpx-api-client
```

## Quick Start

### 1. Initialize the client

```typescript
import { BpxApiClient } from 'bpx-api-client';

const client = new BpxApiClient({
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
  debug: false // if true, prints debug information with console.log()
});
```

### 2. HTTP API

HTTP APIs are grouped by category and called in the form `client.<category>.<endpoint>(params)`.

```typescript
// Get market information (public)
const marketsResponse = await client.markets.getMarket('SOL_USDC');
console.log(marketsResponse.data);

// Execute an order (authenticated)
import { Side, OrderType, TimeInForce } from 'bpx-api-client';

const orderResponse = await client.order.executeOrder({
  symbol: 'SOL_USDC',
  side: Side.Bid,
  orderType: OrderType.Limit,
  quantity: '0.07',
  price: '85',
  timeInForce: TimeInForce.GTC
});
console.log(orderResponse.data);

// Get account information (authenticated)
const accountResponse = await client.account.getAccount();
console.log(accountResponse.data);
```

All request payloads and responses are typed, enabling strict type checking:

```typescript
import { ApiResponse, Market, OrderExecutePayload, OpenOrder } from 'bpx-api-client';

const response: ApiResponse<Market> = await client.markets.getMarket('SOL_USDC');

const payload: OrderExecutePayload = {
  symbol: 'SOL_USDC',
  side: Side.Bid,
  orderType: OrderType.Limit,
  quantity: '0.07',
  price: '85',
  timeInForce: TimeInForce.GTC
};
const orderResponse: ApiResponse<OpenOrder> = await client.order.executeOrder(payload);
```

> See [docs/USAGE.md](docs/USAGE.md) for the full per-category method reference and examples.

## HTTP API Response Format

All HTTP API responses follow the `ApiResponse` interface:

```typescript
export interface ApiResponse<T> {
  statusCode: number;                              // HTTP status code
  data: T | Record<string, never>;                 // Success: actual data, Failure: empty object
  error: ApiErrorResponse | Record<string, never>; // Success: empty object, Failure: error details
}

export interface ApiErrorResponse {
  code: string;
  message: string;
}
```

### Success Response Example

```typescript
{
  statusCode: 200,
  data: {
    baseSymbol: 'SOL',
    createdAt: '2025-01-21T06:34:54.691858',
    filters: { price: [Object], quantity: [Object] },
    fundingInterval: 28800000,
    marketType: 'SPOT',
    orderBookState: 'Open',
    quoteSymbol: 'USDC',
    symbol: 'SOL_USDC'
  },
  error: {}
}
```

### Error Response Example

```typescript
{
  statusCode: 400,
  data: {},
  error: { code: 'INVALID_CLIENT_REQUEST', message: 'Market not found' }
}
```

You can use the `isSuccess` helper as a type guard:

```typescript
import { isSuccess } from 'bpx-api-client';

const response = await client.markets.getMarket('SOL_USDC');
if (isSuccess(response)) {
  // response.data is narrowed to Market
  console.log(response.data.symbol);
}
```

## WebSocket API

```typescript
import { SubscriptionType } from 'bpx-api-client';

// Open WebSocket connection
await client.streams.open();

// Add message handler
client.streams.addMessageHandler((message) => {
  console.log(JSON.stringify(message, null, 2));
});

// Subscribe to public streams
client.streams.bookTicker(SubscriptionType.SUBSCRIBE, 'SOL_USDC');

// Subscribe to private streams (signed automatically)
client.streams.orderUpdate(SubscriptionType.SUBSCRIBE, 'BTC_USDC');

// Close WebSocket connection
await client.streams.close();
```

## Authentication

All authentication and signing for private endpoints is handled inside `BpxApiClient`. You only need to provide your `apiKey` and `apiSecret` when initializing the client. Signing uses an ED25519 keypair as required by the Backpack API.

## API Surface

The client mirrors the categories in the official API documentation.

### Public endpoints

| Category | Accessor | Examples |
|----------|----------|----------|
| Assets | `client.assets` | `getAssets`, `getCollateral` |
| Borrow Lend Markets | `client.borrowLendMarkets` | `getBorrowLendMarkets`, `getBorrowLendMarketsHistory`, `getApyRates` |
| Markets | `client.markets` | `getMarkets`, `getMarket`, `getTicker`, `getDepth`, `getKlines`, `getPredictionEvents`, `getMarketSessions`, `getSecurities`, … |
| System | `client.system` | `status`, `ping`, `getSystemTime`, `getWallets` |
| Trades | `client.trades` | `getRecentTrades`, `getHistoricalTrades` |

### Authenticated endpoints

| Category | Accessor | Examples |
|----------|----------|----------|
| Account | `client.account` | `getAccount`, `updateAccount`, `getMaxBorrowQuantity`, … |
| Borrow Lend | `client.borrowLend` | `getBorrowLendPositions`, `executeBorrowLend`, `getBorrowLendHistory`, `getInterestHistory`, … |
| Capital | `client.capital` | `getBalances`, `getCollateral`, `getDeposits`, `requestWithdrawal`, `convertDustBalance`, `getDustConversionHistory`, `getSettlementHistory`, … |
| Order | `client.order` | `executeOrder`, `getOpenOrder`, `cancelOpenOrder`, `getOpenOrders`, `getFillHistory`, `getOrderHistory`, … |
| Position | `client.position` | `getOpenPositions`, `getFundingPayments`, `getPositionHistory` |
| RFQ | `client.rfq` | `submitRequestForQuote`, `acceptQuote`, `getOpenRfqs`, `getRfqHistory`, `getQuoteFillHistory`, … |
| Strategy | `client.strategy` | `getStrategy`, `getOpenStrategies`, `createStrategy`, `cancelStrategy`, `getStrategyHistory`, … |

### WebSocket

`client.streams` — order/position/RFQ updates, book ticker, depth, k-line, liquidation, mark price, ticker, open interest, trade.

## Features

- **TypeScript support** — complete type definitions for all requests and responses
- **REST client** — public and private endpoints, grouped by official API category
- **WebSocket client** — real-time market data and account update streams
- **Authentication** — secure ED25519 API key/secret handling
- **Error handling** — consistent `ApiResponse` envelope with structured error details

## Documentation

- [Usage guide](docs/USAGE.md) — per-category method reference and examples
- [Migration guide](docs/MIGRATION.md) — upgrading from 0.1.x (breaking module changes)
- [Changelog](CHANGELOG.md)

## License

MIT
