# BPX API Client

A TypeScript client library for the Backpack Exchange API, written by 0xprobe.

## Changelog

### [0.1.2] - 2025-07-15
- Supports new API endpoints
- Enhanced test code and added additional test cases for new endpoints
- Updated bpxSigner to support array type body for executing multiple orders
- Minor bug fixes and code refactoring

### [0.1.1] - 2025-04-09
- Added export for common.types

### [0.1.0] - 2025-04-08
- First official release of the project

## Installation

```bash
npm install bpx-api-client
```

## Quick Start

### 1. Initialize the client

```typescript
import { BpxApiClient } from 'bpx-api-client';

// Initialize the client
const client = new BpxApiClient({
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
  debug: false // if true, prints debug information with console.log()
});
```

### 2. HTTP API

HTTP APIs are categorized according to the API specification and are called in the below format.

```typescript
// Basic format
client.categoryName.endpointName(params);

// Example: executing an order
client.order.executeOrder(payload);
```

Here are some examples of HTTP API calls:

```typescript
// Get market information
const marketsResponse = await client.markets.getMarket('SOL_USDC');
console.log(marketsResponse.data);

// Execute an order
const payload = {
  symbol: 'SOL_USDC',
  side: Side.Bid,
  orderType: OrderType.Limit,
  quantity: '0.07',
  price: '85',
  timeInForce: TimeInForce.GTC
};
const orderResponse = await client.order.executeOrder(payload);
console.log(orderResponse.data);

// Get account information
const accountResponse = await client.account.getAccount();
console.log(accountResponse.data);
```

All HTTP requests, responses, and parameters are defined as types within the library, enabling strict type checking.
Type definitions strictly follow the official OpenAPI specification: `blob:https://docs.backpack.exchange/bc5f44ac-fc90-480b-877f-df1bdb15c3a2`

```typescript
// Example with type annotations
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

## HTTP API Response Format

All HTTP API responses follow the `ApiResponse` interface:

```typescript
export interface ApiResponse<T> {
  statusCode: number;                              // HTTP status code
  data: T | Record<string, never>;                 // Success : actual data, Failure : empty object
  error: ApiErrorResponse | Record<string, never>; // Success : empty object, Failure : error details
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
    imfFunction: null,
    marketType: 'SPOT',
    mmfFunction: null,
    openInterestLimit: '0',
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

### 3. WebSocket API

```typescript
// Open WebSocket connection
await client.streams.open();

// Add message handler (action when received message from server)
client.streams.addMessageHandler((message) => {
  console.log(JSON.stringify(message, null, 2));
});

// Subscribe to book ticker
client.streams.bookTicker(SubscriptionType.SUBSCRIBE, 'SOL_USDC');

// Subscribe to order updates
client.streams.orderUpdate(SubscriptionType.SUBSCRIBE, 'BTC_USDC');

// Close WebSocket connection
await client.streams.close();
```

### 4. Authentication

All authentication and signing processes are handled inside the BpxApiClient when using private endpoints. You only need to provide your apiKey and apiSecret when initializing the client.

## Features

- **TypeScript Support**: Complete type definitions for all API requests and responses
- **REST API Client**: Access to all Backpack Exchange endpoints (public and private)
- **WebSocket Client**: Real-time data streaming for market data and account updates
- **Authentication**: Secure API key and secret handling
- **Error Handling**: Comprehensive error handling with detailed error messages

## API Documentation

### HTTP API

The client provides access to all Backpack Exchange REST API endpoints:

1) Public endpoints
 - assets
 - borrow lend markets
 - markets
 - system
 - trades
 
2) Private endpoints
 - account
 - borrow lend
 - capital
 - futures
 - history
 - order
 - Request For Quote

### WebSocket API

Real-time data streaming for:

- Order update, Position update, RFQ update
- Book ticker, Depth, K-line, Liquidation, Mark price, Ticker, Open interest, Trade