import { PositionImfFunction } from "../../common/common.types";

export interface FuturePositionWithMargin {
  breakEvenPrice: string;
  entryPrice: string;
  estLiquidationPrice: string;
  imf: string;
  imfFunction: PositionImfFunction;
  markPrice: string;
  mmf: string;
  mmfFunction: PositionImfFunction;
  netCost: string;
  netQuantity: string;
  netExposureQuantity: string;
  netExposureNotional: string;
  pnlRealized: string;
  pnlUnrealized: string;
  cumulativeFundingPayment: string;
  subaccountId: number | null;
  symbol: string;
  userId: number;
  positionId: string;
  cumulativeInterest: string;
}
