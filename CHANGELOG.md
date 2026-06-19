# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
