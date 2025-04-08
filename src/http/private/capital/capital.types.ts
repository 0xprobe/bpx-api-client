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
  confirmationBlockNumber: number | null;
  source: string;
  status: string;
  transactionHash: string | null;
  symbol: string;
  quantity: string;
  createdAt: string;
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
  symbol: string;
  status: string;
  subaccountId: number | null;
  toAddress: string;
  transactionHash: string | null;
  createdAt: string;
  isInternal: boolean;
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
