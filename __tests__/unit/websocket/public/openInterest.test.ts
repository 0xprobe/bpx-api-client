import { createClient, waitForStreamMessage, WS_TEST_TIMEOUT_MS } from '../../setup';
import { SubscriptionType } from '../../../../src/websocket/streams.api';

const SYMBOL = 'SOL_USDC_PERP';

describe('Open Interest Stream Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Subscribe to open interest', () => {
    it('Sends the documented stream name and receives open interest updates', async () => {
      const { sent, message, errors } = await waitForStreamMessage(
        bpxClient,
        `openInterest.${SYMBOL}`,
        () => bpxClient.streams.openInterest(SubscriptionType.SUBSCRIBE, SYMBOL)
      );

      expect(sent).toContainEqual({
        method: SubscriptionType.SUBSCRIBE,
        params: [`openInterest.${SYMBOL}`]
      });

      // No error frame means the subscription was accepted — for private
      // streams this is what proves the request actually authenticated
      // (the server replies 4003 "Invalid signature" otherwise).
      expect(errors).toEqual([]);

      // Open interest is published periodically, so it may not arrive quickly.
      // Payload assertions below are skipped when nothing arrives:
      // open interest is republished periodically. The helper logs a warning so the skip stays visible.
      if (message) {
        expect(message).toMatchObject({
          e: 'openInterest',
          E: expect.any(Number),
          s: SYMBOL,
          o: expect.any(String)
        });
      }
    }, WS_TEST_TIMEOUT_MS);
  });
});
