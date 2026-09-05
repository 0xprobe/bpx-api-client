import { createClient, waitForStreamMessage, WS_TEST_TIMEOUT_MS } from '../../setup';
import { SubscriptionType } from '../../../../src/websocket/streams.api';

const SYMBOL = 'SOL_USDC';

describe('Depth Stream Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Subscribe to depth', () => {
    it('Sends the documented stream name and receives depth updates', async () => {
      const { sent, message, errors } = await waitForStreamMessage(
        bpxClient,
        `depth.${SYMBOL}`,
        () => bpxClient.streams.depth(SubscriptionType.SUBSCRIBE, SYMBOL)
      );

      expect(sent).toContainEqual({
        method: SubscriptionType.SUBSCRIBE,
        params: [`depth.${SYMBOL}`]
      });

      // No error frame means the subscription was accepted — for private
      // streams this is what proves the request actually authenticated
      // (the server replies 4003 "Invalid signature" otherwise).
      expect(errors).toEqual([]);

      // This stream publishes continuously, so a missing message means the
      // subscription silently failed rather than the market being quiet.
      expect(message).not.toBeNull();

      // The payload is only asserted when a live message arrived within the
      // wait window (BPX_WS_WAIT_MS); quiet streams may receive nothing.
      if (message) {
        expect(message).toMatchObject({
          e: 'depth',
          E: expect.any(Number),
          s: SYMBOL,
          U: expect.any(Number),
          u: expect.any(Number),
          T: expect.any(Number)
        });
        expect(Array.isArray(message.a)).toBe(true);
        expect(Array.isArray(message.b)).toBe(true);
      }
    }, WS_TEST_TIMEOUT_MS);
  });
});
