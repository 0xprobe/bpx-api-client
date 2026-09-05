import { createClient, waitForStreamMessage, WS_TEST_TIMEOUT_MS } from '../../setup';
import { SubscriptionType } from '../../../../src/websocket/streams.api';

const SYMBOL = 'SOL_USDC_PERP';

describe('Mark Price Stream Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Subscribe to mark price', () => {
    it('Sends the documented stream name and receives mark price updates', async () => {
      const { sent, message, errors } = await waitForStreamMessage(
        bpxClient,
        `markPrice.${SYMBOL}`,
        () => bpxClient.streams.markPrice(SubscriptionType.SUBSCRIBE, SYMBOL)
      );

      expect(sent).toContainEqual({
        method: SubscriptionType.SUBSCRIBE,
        params: [`markPrice.${SYMBOL}`]
      });

      // No error frame means the subscription was accepted — for private
      // streams this is what proves the request actually authenticated
      // (the server replies 4003 "Invalid signature" otherwise).
      expect(errors).toEqual([]);

      // This stream publishes continuously, so a missing message means the
      // subscription silently failed rather than the market being quiet.
      expect(message).not.toBeNull();

      if (message) {
        expect(message).toMatchObject({
          e: 'markPrice',
          E: expect.any(Number),
          s: SYMBOL,
          p: expect.any(String),
          f: expect.any(String),
          i: expect.any(String),
          n: expect.any(Number),
          T: expect.any(Number)
        });
      }
    }, WS_TEST_TIMEOUT_MS);
  });
});
