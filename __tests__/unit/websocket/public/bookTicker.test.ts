import { createClient, waitForStreamMessage, WS_TEST_TIMEOUT_MS } from '../../setup';
import { SubscriptionType } from '../../../../src/websocket/streams.api';

const SYMBOL = 'SOL_USDC';

describe('Book Ticker Stream Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Subscribe to book ticker', () => {
    it('Sends the documented stream name and receives best bid/ask updates', async () => {
      const { sent, message, errors } = await waitForStreamMessage(
        bpxClient,
        `bookTicker.${SYMBOL}`,
        () => bpxClient.streams.bookTicker(SubscriptionType.SUBSCRIBE, SYMBOL)
      );

      expect(sent).toContainEqual({
        method: SubscriptionType.SUBSCRIBE,
        params: [`bookTicker.${SYMBOL}`]
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
          e: 'bookTicker',
          E: expect.any(Number),
          s: SYMBOL,
          a: expect.any(String),
          A: expect.any(String),
          b: expect.any(String),
          B: expect.any(String),
          u: expect.any(Number),
          T: expect.any(Number)
        });
      }
    }, WS_TEST_TIMEOUT_MS);
  });
});
