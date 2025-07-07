import { MarketAsset, CollateralSummary } from '../../../../src/http/public/assets/assets.types';
import { isSuccess } from '../../../../src/http/bpxHttpHandler';
import { createClient } from '../../setup';

describe('Public Assets API Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Get assets', () => {
    it('Get all supported assets', async () => {
      const response = await bpxClient.assets.getAssets();
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const assets = response.data as MarketAsset[];
      expect(assets.length).toBeGreaterThan(0);
      
      assets.forEach(asset => {
        expect(asset).toMatchObject({
          symbol: expect.any(String),
          displayName: expect.any(String),
          tokens: expect.arrayContaining([]),
        });
        if (asset.coingeckoId !== null) {
          expect(typeof asset.coingeckoId).toBe("string");
        }
        
        if (asset.tokens.length > 0) {
          asset.tokens.forEach(token => {
            expect(token).toMatchObject({
              blockchain: expect.any(String),
              depositEnabled: expect.any(Boolean),
              minimumDeposit: expect.any(String),
              minimumWithdrawal: expect.any(String),
              withdrawEnabled: expect.any(Boolean),
              withdrawalFee: expect.any(String)
            });
            if (token.contractAddress !== null) {
              expect(typeof token.contractAddress).toBe('string');
            }
            if (token.maximumWithdrawal !== null) {
              expect(typeof token.maximumWithdrawal).toBe('string');
            }
          });
        }
      });
    });
  });

  describe('Get collateral', () => {
    it('Get collateral parameters for assets', async () => {
      const response = await bpxClient.assets.getCollateral();
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const collateral = response.data as CollateralSummary[];
      expect(collateral.length).toBeGreaterThan(0);
      
      collateral.forEach(collateralItem => {
        expect(collateralItem).toMatchObject({
          symbol: expect.any(String),
          imfFunction: {
            type: expect.any(String),
            base: expect.any(String),
            factor: expect.any(String)
          },
          mmfFunction: {
            type: expect.any(String),
            base: expect.any(String),
            factor: expect.any(String)
          },
          haircutFunction: {
            weight: expect.any(String),
            kind: expect.objectContaining({
              type: expect.stringMatching(/^(identity|inverseSqrt)$/)
            })
          }
        });

        if (collateralItem.haircutFunction.kind.type === 'inverseSqrt') {
          expect(collateralItem.haircutFunction.kind).toMatchObject({
            base: expect.any(String),
            positiveCurvePenalty: expect.any(String)
          });
        }
      });
    });
  });

});
