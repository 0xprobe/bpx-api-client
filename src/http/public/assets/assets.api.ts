import { HttpMethod } from '../../common/api.types';
import { CollateralSummary, MarketAsset } from './assets.types';
import { BpxHttpHandler } from '../../bpxHttpHandler';

export class AssetsApi {

  constructor(private httpHandler: BpxHttpHandler) {}
  
  // https://docs.backpack.exchange/#tag/Markets/operation/get_market
  async getAssets() {
    return this.httpHandler.execute<MarketAsset[]>(HttpMethod.GET, '/api/v1/assets');
  }

  // https://docs.backpack.exchange/#tag/Assets/operation/get_collateral_parameters
  async getCollateral() {
    return this.httpHandler.execute<CollateralSummary[]>(HttpMethod.GET, '/api/v1/collateral');
  }

}