# BPX API Client

A TypeScript client library for the Backpack Exchange API.

## Installation

```bash
npm install bpx-api-client
```

## Quick Start

```typescript
import { BpxApiClient } from 'bpx-api-client';

// Initialize the client
const client = new BpxApiClient({
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
  debug: false // if true, prints debug information with console.log()
});

// Get assets
await client.assets.getAssets();

// Execute order
const payload: OrderExecutePayload = {
  symbol: 'SOL_USDC',
  side: Side.Bid,
  orderType: OrderType.Limit,
  quantity: '0.07',
  price: '85',
  timeInForce: TimeInForce.GTC
};

await bpxClient.order.executeOrder(payload);

// Subscribe to WebSocket streams
await client.streams.open();
client.streams.addMessageHandler((message) => {
  console.log(message);
});

// Subscribe to book ticker
client.streams.bookTicker('subscribe', 'SOL_USDC');

// Close WebSocket connection
await client.streams.close();
```

## Features

- **TypeScript Support**: Complete type definitions for all API requests and responses
- **REST API Client**: Access to all Backpack Exchange endpoints (public and private)
- **WebSocket Client**: Real-time data streaming for market data and account updates
- **Authentication**: Secure API key and secret handling
- **Error Handling**: Comprehensive error handling with detailed error messages

## API Documentation

### REST API

The client provides access to all Backpack Exchange REST API endpoints:

- Public endpoints (assets, markets, trades etc.)
- Private endpoints (account, futures, order etc.)

### WebSocket API

Real-time data streaming for:

- Book ticker/Depth/Mark price etc
- Order/Position/RFQ updates

## License

MIT