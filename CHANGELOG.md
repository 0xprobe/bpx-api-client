# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.1] - 2026-09-05

Catches the client up with the Backpack API documentation as of 2026-09-05
(exchange changelog entries from 2026-07-11 through 2026-08-03), and fills in
fields that were already documented but missing from the 0.2.0 types.

### Added
- **Streams:** `balanceUpdate` (`account.balanceUpdate`), `externalTicker`
  (`externalTicker.<symbol>`), and `stockPrice` (`stockPrice.<ticker>`, which
  takes a bare stock ticker such as `AAPL` or `BRK.B`).
- **Stocks / RWA:** `Market.rwaMarketType` (`RwaMarketType`), `AssetClass`
  filter on `getFillHistory`, `KlineSource` (`source`) on `getKlines`,
  `getTicker` and `getTickers`, and `PriceFilter.discoveryBoundBand`
  (`PriceBandDiscoveryBound`).
- **Fields previously missing from the types:** `Market.positionLimitWeight`,
  `Market.visible`, `PriceFilter.maxPriceUpdateMultiplier` /
  `minPriceUpdateMultiplier`, `Order` / `OrderExecutePayload` / `MarketOrder`
  `slippageTolerance` + `slippageToleranceType`, `Strategy.quoteAsset` /
  `slippageTolerance` / `slippageToleranceType`, `RequestForQuote.executedQuantity` /
  `executedQuoteQuantity` / `systemOrderType`, `RequestForQuotePayload` and
  `QuotePayload` `autoBorrow` / `autoBorrowRepay` / `autoLend` / `autoLendRedeem`,
  `RequestForQuoteHistorical.deferredSettlementQuoteId`,
  `QuoteHistorical.deferredSettlement`, `RfqFillHistoryRequest.rfqId`,
  `Deposit.institutionName`, `Settlement.engineSequence` / `positionId`,
  `AccountWithdrawalPayload.recipientInformation`
  (`WithdrawalRecipientInformation`), `BorrowLendPositionWithMargin.estLiquidationPrice`,
  and `Token.nativeDecimals`.
- **Enum values:** `KlineInterval.OneSecond` (`1s`), `ResolutionSource.Backpack`,
  `StrategyCrankCancelReason.PositionLimit`, `SettlementSource.SystemLiabilityTransfer`,
  `BorrowLendSource.DustConversion` / `Rfq`, and 8 `OrderExpiryReason` values
  (`BorrowRequiresLendRedeem`, `MaxStopOrdersPerPosition`, `NegativeEquity`,
  `PositionLimit`, `PostOnlyMode`, `PriceOutOfBounds`, `SlippageToleranceExceeded`,
  `StopWithoutPosition`).
- **Tests:** websocket stream test suites under `__tests__/unit/websocket/`
  (`public/` and `private/`, one file per documented stream), with the live-wait
  window configurable via `BPX_WS_WAIT_MS`. Each test asserts the subscribe
  payload carries the documented stream name and that the server returned no
  error frame — which is what proves a private stream authenticated, since an
  accepted subscription is not acknowledged and a rejected one replies
  `4003 Invalid signature`. Payload assertions are tiered: continuously
  published streams (`depth`, `bookTicker`, `ticker`, `markPrice`,
  `externalTicker`) fail if no message arrives, since that means the
  subscription silently broke; sporadic ones (trades, k-lines, open interest,
  liquidations, stock quotes and the private account streams) skip the payload
  checks and log which stream was quiet, so a green run never hides them.

### Fixed
- `streams.liquidation` now sends the documented `liquidation.<symbol>` stream
  name and takes a `symbol` argument; it previously subscribed to a bare
  `liquidation` stream and silently received nothing.

### Removed
- `SettlementSourceFilter.CulledBorrowInterest`, `CulledRealizePnl` and
  `CulledRealizePnlBookUtilization`, and `SettlementSource.CulledBorrowInterest`,
  `CulledRealizePnlAuto`, `CulledRealizePnlBookUtilisation`,
  `CulledRealizePnlAccountThreshold` and `CulledRealizePnlSystemThreshold` —
  removed from the exchange API on 2026-07-17. Culled realize PnL settlements are
  now reported as `RealizePnl`, culled borrow interest as `TradingFees`.
- `StrategyCreatePayload.brokerId`, which is no longer part of the API.

### Notes
- `SlippageToleranceType` moved to `common.types` (it is shared by orders and
  strategies). It is still exported from the package root, so imports are
  unaffected.
- Vault (`/api/v1/vaults`, `/api/v1/vault/*`) and withdrawal-delay
  (`/wapi/v1/capital/withdrawals/delay`) endpoints exist in the OpenAPI file but
  are not rendered on docs.backpack.exchange, so they are intentionally not
  implemented.

## [0.2.0] - 2026-06-20

### Added
- **Markets:** `getPredictionEvents`, `getPredictionTags`, `getMarketSessions`, `getMarketHolidays`, `getSecurities`.
- **Borrow Lend Markets:** `getApyRates`.
- **System:** `getWallets`.
- **Position:** `getFundingPayments`, `getPositionHistory`.
- **Order:** `getFillHistory`, `getOrderHistory`.
- **Borrow Lend:** `getBorrowLendHistory`, `getInterestHistory`, `getBorrowLendPositionHistory`.
- **Capital:** `getDustConversionHistory`, `getSettlementHistory`.
- **RFQ:** `getOpenRfqs`, `getRfqHistory`, `getQuoteHistory`, `getRfqFillHistory`, `getQuoteFillHistory`.
- **Strategy:** `getStrategy`, `getOpenStrategies`, `createStrategy`, `cancelStrategy`, `cancelOpenStrategies`, `getStrategyHistory`.
- `getOpenPositions` now accepts optional `symbol` / `marketType` filters.
- `.env`-based credential injection for the test suite (via `dotenv`).

### Changed
- **Breaking:** Modules reorganized to match the official Backpack API categories. See [MIGRATION.md](docs/MIGRATION.md).
  - `client.futures` → `client.position`
  - `client.history.*` → distributed into `client.order`, `client.position`, `client.capital`, `client.borrowLend`, `client.rfq`, `client.strategy`
  - `client.account.convertDustBalance` → `client.capital.convertDustBalance`
  - Type import paths changed (`futures.types` / `history.types` → their respective modules; `requestForQuote.types` → `rfq.types`).

### Fixed
- GET query strings no longer serialize `undefined` / `null` params as the literal strings `"undefined"` / `"null"`, and now stay in sync with the request signature.
- Array query params (e.g. `marketType`) are now serialized as repeated keys (`marketType=SPOT&marketType=PERP`) instead of a comma-joined value that the server rejected with a 400.

### Removed
- `/wapi/v1/history/pnl` (`getProfitAndLossHistory`) — removed from the exchange API (2025-08-07).

### Known issues
- `getEstimatedLiquidationPrice` (`GET /borrowLend/position/liquidationPrice`) is temporarily disabled: the endpoint requires a signed request but its signing instruction is not documented in the OpenAPI spec.

## [0.1.2] - 2025-07-15
- Supports new API endpoints
- Enhanced test code and added additional test cases for new endpoints
- Updated bpxSigner to support array type body for executing multiple orders
- Minor bug fixes and code refactoring

## [0.1.1] - 2025-04-09
- Added export for common.types

## [0.1.0] - 2025-04-08
- First official release of the project
