import { SortDirection } from "../../common/common.types";

export interface Balance {
  [key: string]: {
    available: string;
    locked: string;
    staked: string;
  }
}

export interface MarginAccountSummary {
  assetsValue: string;
  borrowLiability: string;
  collateral: Collateral[];
  imf: string;
  unsettledEquity: string;
  liabilitiesValue: string;
  marginFraction: string | null;
  mmf: string;
  netEquity: string;
  netEquityAvailable: string;
  netEquityLocked: string;
  netExposureFutures: string;
  pnlUnrealized: string;
}

export interface Collateral {
  symbol: string;
  assetMarkPrice: string;
  totalQuantity: string;
  balanceNotional: string;
  collateralWeight: string;
  collateralValue: string;
  openOrderQuantity: string;
  lendQuantity: string;
  availableQuantity: string;
}

export interface TransfersRequest {
  from?: number;
  to?: number;
  limit?: number;
  offset?: number;
}

export interface Deposit {
  id: number;
  toAddress: string | null;
  fromAddress: string | null;
  source: string;
  status: string;
  transactionHash: string | null;
  symbol: string;
  quantity: string;
  createdAt: string;
  fiatAmount: number;
  fiatCurrency: string;
  institutionBic: string;
  platformMemo: string;
}

export interface DepositAddress {
  address: string;
}

export interface Withdrawal {
  id: number;
  blockchain: string;
  clientId: string | null;
  identifier: string | null;
  quantity: string;
  fee: string;
  fiatFee: string;
  fiatState: string;
  fiatSymbol: string;
  providerId: string;
  symbol: string;
  status: string;
  subaccountId: number | null;
  toAddress: string;
  transactionHash: string | null;
  createdAt: string;
  isInternal: boolean;
  bankName: string;
  bankIdentifier: string;
  accountIdentifier: string;
  triggerAt: string;
}

export interface AccountWithdrawalPayload {
  address: string;
  blockchain: string;
  clientId?: string;
  quantity: string;
  symbol: string;
  twoFactorToken?: string;
  autoBorrow?: boolean;
  autoLendRedeem?: boolean;
}

export interface DustConversionHistoryRequest {
  id?: number;
  symbol?: string;
  limit?: number;
  offset?: number;
  sortDirection?: SortDirection;
}

export interface DustConversion {
  id: number;
  quantity: string;
  symbol: string;
  usdcReceived: string;
  timestamp: string;
}

export interface SettlementHistoryRequest {
  limit?: number;
  offset?: number;
  source?: SettlementSourceFilter;
}

export enum SettlementSourceFilter {
  BackstopLiquidation = 'BackstopLiquidation',
  CulledBorrowInterest = 'CulledBorrowInterest',
  CulledRealizePnl = 'CulledRealizePnl',
  CulledRealizePnlBookUtilization = 'CulledRealizePnlBookUtilization',
  FundingPayment = 'FundingPayment',
  RealizePnl = 'RealizePnl',
  TradingFees = 'TradingFees',
  TradingFeesSystem = 'TradingFeesSystem'
}

export interface Settlement {
  quantity: string;
  source: SettlementSource;
  subaccountId: number | null;
  timestamp: string;
  userId: number;
}

export enum SettlementSource {
  TradingFees = 'TradingFees',
  TradingFeesSystem = 'TradingFeesSystem',
  FundingPayment = 'FundingPayment',
  CulledBorrowInterest = 'CulledBorrowInterest',
  CulledRealizePnlAuto = 'CulledRealizePnlAuto',
  CulledRealizePnlBookUtilisation = 'CulledRealizePnlBookUtilisation',
  CulledRealizePnlAccountThreshold = 'CulledRealizePnlAccountThreshold',
  CulledRealizePnlSystemThreshold = 'CulledRealizePnlSystemThreshold',
  RealizePnl = 'RealizePnl',
  BackstopProviderLiquidation = 'BackstopProviderLiquidation',
  BackstopAdlLiquidation = 'BackstopAdlLiquidation',
  BackstopLiquidityFundProceeds = 'BackstopLiquidityFundProceeds'
}
