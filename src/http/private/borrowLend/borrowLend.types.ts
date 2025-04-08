import { PositionImfFunction, BorrowLendSide } from "../../common/common.types";

export interface BorrowLendPositionWithMargin {
  cumulativeInterest: string;
  id: string;
  imf: string;
  imfFunction: PositionImfFunction;
  netQuantity: string;
  markPrice: string;
  mmf: string;
  mmfFunction: PositionImfFunction;
  netExposureQuantity: string;
  netExposureNotional: string;
  symbol: string;
}

export interface BorrowLendExecutePayload {
  quantity: string;
  side: BorrowLendSide;
  symbol: string;
}

