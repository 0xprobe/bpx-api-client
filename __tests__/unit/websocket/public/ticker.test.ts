import { createClient, waitForStreamMessage, WS_TEST_TIMEOUT_MS } from '../../setup';
import { SubscriptionType } from '../../../../src/websocket/streams.api';

const SYMBOL = 'SOL_USDC';

describe('Ticker Stream Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Subscribe to ticker', () => {
    it('Sends the documented stream name and receives venue 24hr statistics', async () => {
      const { sent, message, errors } = await waitForStreamMessage(
        bpxClient,
        `ticker.${SYMBOL}`,
        () => bpxClient.streams.ticker(SubscriptionType.SUBSCRIBE, SYMBOL)
      );

      expect(sent).toContainEqual({
        method: SubscriptionType.SUBSCRIBE,
        params: [`ticker.${SYMBOL}`]
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
          e: 'ticker',
          E: expect.any(Number),
          s: SYMBOL,
          o: expect.any(String),
          c: expect.any(String),
          h: expect.any(String),
          l: expect.any(String),
          v: expect.any(String),
          V: expect.any(String),
          n: expect.any(Number)
        });
      }
    }, WS_TEST_TIMEOUT_MS);
  });
});
