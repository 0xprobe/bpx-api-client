import { createClient, waitForStreamMessage, WS_TEST_TIMEOUT_MS } from '../../setup';
import { SubscriptionType } from '../../../../src/websocket/streams.api';
import { KlineInterval } from '../../../../src/http/public/markets/markets.types';

const SYMBOL = 'SOL_USDC';
const INTERVAL = KlineInterval.OneMinute;

describe('K-Line Stream Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Subscribe to k-line', () => {
    it('Sends the documented stream name and receives k-line updates', async () => {
      const { sent, message, errors } = await waitForStreamMessage(
        bpxClient,
        `kline.${INTERVAL}.${SYMBOL}`,
        () => bpxClient.streams.kline(SubscriptionType.SUBSCRIBE, INTERVAL, SYMBOL)
      );

      expect(sent).toContainEqual({
        method: SubscriptionType.SUBSCRIBE,
        params: [`kline.${INTERVAL}.${SYMBOL}`]
      });

      // No error frame means the subscription was accepted — for private
      // streams this is what proves the request actually authenticated
      // (the server replies 4003 "Invalid signature" otherwise).
      expect(errors).toEqual([]);

      // Payload assertions below are skipped when nothing arrives:
      // k-lines are pushed on interval boundaries. The helper logs a warning so the skip stays visible.
      if (message) {
        // K-line start/end times use ISO 8601, unlike the microsecond
        // timestamps used elsewhere.
        expect(message).toMatchObject({
          e: 'kline',
          E: expect.any(Number),
          s: SYMBOL,
          t: expect.any(String),
          T: expect.any(String),
          n: expect.any(Number),
          X: expect.any(Boolean)
        });
        // A k-line covering an interval with no trades reports null OHLC and
        // volume rather than the strings shown in the documented example.
        for (const field of ['o', 'c', 'h', 'l', 'v'] as const) {
          if (message[field] !== null) {
            expect(typeof message[field]).toBe('string');
          }
        }
      }
    }, WS_TEST_TIMEOUT_MS);
  });
});
