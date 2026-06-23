# Migration Guide

## Upgrading from 0.1.x

The client modules were reorganized to match the categories used in the official
[Backpack Exchange API](https://docs.backpack.exchange/) documentation. This changes
some accessor paths (a breaking change), but **type names are unchanged** — if you
import types from the package root (`import { ... } from 'bpx-api-client'`), you only
need to update the method calls below.

### Renamed accessors

| Before (0.1.x) | After |
|----------------|-------|
| `client.futures.getOpenPositions(...)` | `client.position.getOpenPositions(...)` |
| `client.rfq.*` (folder `requestForQuote`) | `client.rfq.*` (unchanged accessor; folder renamed to `rfq`) |

`client.futures` no longer exists — use `client.position`.

### `client.history.*` was dissolved

The `history` category was removed; its methods now live on the category they belong to:

| Before (0.1.x) | After |
|----------------|-------|
| `client.history.getBorrowLendHistory(...)` | `client.borrowLend.getBorrowLendHistory(...)` |
| `client.history.getInterestHistory(...)` | `client.borrowLend.getInterestHistory(...)` |
| `client.history.getBorrowLendPositionHistory(...)` | `client.borrowLend.getBorrowLendPositionHistory(...)` |
| `client.history.getDustConversionHistory(...)` | `client.capital.getDustConversionHistory(...)` |
| `client.history.getSettlementHistory(...)` | `client.capital.getSettlementHistory(...)` |
| `client.history.getFillHistory(...)` | `client.order.getFillHistory(...)` |
| `client.history.getOrderHistory(...)` | `client.order.getOrderHistory(...)` |
| `client.history.getFundingPayments(...)` | `client.position.getFundingPayments(...)` |
| `client.history.getRfqHistory(...)` | `client.rfq.getRfqHistory(...)` |
| `client.history.getQuoteHistory(...)` | `client.rfq.getQuoteHistory(...)` |
| `client.history.getStrategyHistory(...)` | `client.strategy.getStrategyHistory(...)` |

### `convertDustBalance` moved to Capital

| Before (0.1.x) | After |
|----------------|-------|
| `client.account.convertDustBalance(...)` | `client.capital.convertDustBalance(...)` |

### Removed

| Removed | Reason |
|---------|--------|
| `client.history.getProfitAndLossHistory(...)` | `/wapi/v1/history/pnl` was removed from the exchange API (2025-08-07). |

### Deep type imports

If you imported types from deep module paths (not the package root), update the paths:

| Before | After |
|--------|-------|
| `bpx-api-client/dist/http/private/futures/futures.types` | `.../private/position/position.types` |
| `bpx-api-client/dist/http/private/requestForQuote/requestForQuote.types` | `.../private/rfq/rfq.types` |
| `bpx-api-client/dist/http/private/history/history.types` | split across `order`, `position`, `capital`, `borrowLend`, `rfq`, `strategy` |

> Importing from the package root (`import { FuturePositionWithMargin } from 'bpx-api-client'`) is recommended and is not affected — all type names are still exported.

### Example

```typescript
// 0.1.x
const positions = await client.futures.getOpenPositions();
const fills = await client.history.getFillHistory({ limit: 10 });
await client.account.convertDustBalance('USDC');

// 0.2.x
const positions = await client.position.getOpenPositions();
const fills = await client.order.getFillHistory({ limit: 10 });
await client.capital.convertDustBalance('USDC');
```
