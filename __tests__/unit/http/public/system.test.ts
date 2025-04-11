import { isSuccess } from '../../../../src/http/bpxHttpHandler';
import { createClient } from '../../setup';
import { Status } from '../../../../src/http/public/system/system.types';

describe('Public System API Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Status', () => {
    it('Get the system status, and the status message, if any', async () => {
      const response = await bpxClient.system.status();
      
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data).toMatchObject({
        status: expect.stringMatching(/^(Ok|Maintenance)$/)
      });
      if (response.data.message !== null) {
        expect(typeof response.data.message).toBe('string');
      }
    });
  });

  describe('Ping', () => {
    it('Responds with pong', async () => {
      const response = await bpxClient.system.ping();
      expect(isSuccess(response)).toBe(true);
      expect(response.data).toBe('pong');
    });
  });   

  describe('Get system time', () => {
    it('Retrieves the current system time', async () => {
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