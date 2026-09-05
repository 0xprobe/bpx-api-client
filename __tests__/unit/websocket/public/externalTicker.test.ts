import { createClient, waitForStreamMessage, WS_TEST_TIMEOUT_MS } from '../../setup';
import { SubscriptionType } from '../../../../src/websocket/streams.api';

// The external ticker carries provider-derived statistics, so an RWA (stock)
// market is used here; `ticker.<symbol>` remains the venue-only stream.
const SYMBOL = 'MU.US_USDC';

describe('External Ticker Stream Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Subscribe to external ticker', () => {
    it('Sends the documented stream name and receives provider 24hr statistics', async () => {
      const { sent, message, errors } = await waitForStreamMessage(
        bpxClient,
        `externalTicker.${SYMBOL}`,
        () => bpxClient.streams.externalTicker(SubscriptionType.SUBSCRIBE, SYMBOL)
      );

      expect(sent).toContainEqual({
        method: SubscriptionType.SUBSCRIBE,
        params: [`externalTicker.${SYMBOL}`]
      });

      // No error frame means the subscription was accepted — for private
      // streams this is what proves the request actually authenticated
      // (the server replies 4003 "Invalid signature" otherwise).
      expect(errors).toEqual([]);

      // This stream publishes continuously, so a missing message means the
      // subscription silently failed rather than the market being quiet.
      expect(message).not.toBeNull();

      // Stock markets are quiet outside market hours, so a message is optional.
      if (message) {
        expect(message).toMatchObject({
          e: 'externalTicker',
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
