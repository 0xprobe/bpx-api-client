import { PositionImfFunction } from "../../common/common.types";

export interface MarketAsset {
  symbol: string;
  tokens: Token[];
}

export interface Token {
    blockchain: string;
    contractAddress: string | null;
    depositEnabled: boolean;
    minimumDeposit: string;
    withdrawEnabled: boolean;
    minimumWithdrawal: string;
    maximumWithdrawal: string | null;
    withdrawalFee: string;
}

export interface CollateralSummary {
  symbol: string;
  imfFunction: PositionImfFunction;
  mmfFunction: PositionImfFunction;
  haircutFunction: CollateralFunction;
}

export interface CollateralFunction {
  weight: string;
  kind: CollateralFunctionKind;
}

export type CollateralFunctionKind = CollateralFunctionKind_IdentityFunction | CollateralFunctionKind_InverseSqrtFunction;

export interface CollateralFunctionKind_IdentityFunction {
    type: 'identity';
}
  
export interface CollateralFunctionKind_InverseSqrtFunction {
    type: 'inverseSqrt';
    base: string;
    positiveCurvePenalty: string;
}