import { MarketAsset, CollateralSummary } from '../../../../src/http/public/assets/assets.types';
import { isSuccess } from '../../../../src/http/bpxHttpHandler';
import { createClient } from '../../setup';

describe('Public Assets API Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('getAssets', () => {
    it('should return list of market assets', async () => {
      const response = await bpxClient.assets.getAssets();
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const assets = response.data as MarketAsset[];
      expect(assets.length).toBeGreaterThan(0);
      
      // Verify structure of the first asset
      const firstAsset = assets[0];
      expect(firstAsset).toMatchObject({
        symbol: expect.any(String),
        tokens: [{
          blockchain: expect.any(String),
          depositEnabled: expect.any(Boolean),
          minimumDeposit: expect.any(String),
          minimumWithdrawal: expect.any(String),
          withdrawEnabled: expect.any(Boolean),
          withdrawalFee: expect.any(String)
        }]
      });
      
      // Verify token structure
      const firstToken = firstAsset.tokens[0];
      expect(firstToken).toMatchObject({
        blockchain: expect.any(String),
        depositEnabled: expect.any(Boolean),
        withdrawEnabled: expect.any(Boolean),
        minimumDeposit: expect.any(String),
        minimumWithdrawal: expect.any(String),
        withdrawalFee: expect.any(String)
      });

      // Verify contractAddress field
      const contractAddress = firstAsset.tokens[0].contractAddress;
      expect(contractAddress === null || typeof contractAddress === 'string').toBeTruthy();

      // Verify maximumWithdrawal field
      const maximumWithdrawal = firstAsset.tokens[0].maximumWithdrawal;
      expect(maximumWithdrawal === null || typeof maximumWithdrawal === 'string').toBeTruthy();

    });
  });

  describe('getCollateral', () => {
    it('should return collateral parameters', async () => {
      const response = await bpxClient.assets.getCollateral();
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      
      const collateral = response.data as CollateralSummary[];
      expect(collateral.length).toBeGreaterThan(0);
      
      // Verify structure of the first collateral
      const firstCollateral = collateral[0];
      expect(firstCollateral).toMatchObject({
        symbol: expect.any(String),
        imfFunction: {
          type: expect.any(String),
          base: expect.any(String),
          factor: expect.any(String)
        },
        mmfFunction: expect.any(Object),
        haircutFunction: {
          weight: expect.any(String),
          kind: expect.objectContaining({
            type: expect.stringMatching(/^(identity|inverseSqrt)$/)
          })
        }
      });

      // additional field validation based on kind type
      if (firstCollateral.haircutFunction.kind.type === 'inverseSqrt') {
        expect(firstCollateral.haircutFunction.kind).toMatchObject({
          base: expect.any(String),
          positiveCurvePenalty: expect.any(String)
        });
      }
    });
  });
});
