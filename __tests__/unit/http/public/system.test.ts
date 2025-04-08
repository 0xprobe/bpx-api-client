import { isSuccess } from '../../../../src/http/bpxHttpHandler';
import { createClient } from '../../setup';
import { Status } from '../../../../src/http/public/system/system.types';

describe('Public System API Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('getSystemStatus', () => {
    it('should return system status information', async () => {
      const response = await bpxClient.system.status();
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data).toMatchObject({
        status: expect.stringMatching(/^(Ok|Maintenance)$/)
      });
      expect(response.data.message === null || typeof response.data.message === 'string').toBe(true);
    });
  });

  describe('ping', () => {
    it('should return pong', async () => {
      const response = await bpxClient.system.ping();
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBe('pong');
    });
  });   

  describe('getSystemTime', () => {
    it('should return current system time', async () => {
      const response = await bpxClient.system.getSystemTime();
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(typeof response.data).toBe('string');
      
      // Verify server time is reasonable
      // difference should be less than 5 seconds
      const serverTime = parseInt(response.data as string);
      const currentTime = Date.now();
      expect(Math.abs(serverTime - currentTime)).toBeLessThan(5000);
    });
  });
}); 