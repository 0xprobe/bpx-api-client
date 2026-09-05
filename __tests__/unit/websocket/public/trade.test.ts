import { createClient, waitForStreamMessage, WS_TEST_TIMEOUT_MS } from '../../setup';
import { SubscriptionType } from '../../../../src/websocket/streams.api';

const SYMBOL = 'SOL_USDC';

describe('Trade Stream Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Subscribe to trade', () => {
    it('Sends the documented stream name and receives public trades', async () => {
      const { sent, message, errors } = await waitForStreamMessage(
        bpxClient,
        `trade.${SYMBOL}`,
        () => bpxClient.streams.trade(SubscriptionType.SUBSCRIBE, SYMBOL)
      );

      expect(sent).toContainEqual({
        method: SubscriptionType.SUBSCRIBE,
        params: [`trade.${SYMBOL}`]
      });

      // No error frame means the subscription was accepted — for private
      // streams this is what proves the request actually authenticated
      // (the server replies 4003 "Invalid signature" otherwise).
      expect(errors).toEqual([]);

      // Payload assertions below are skipped when nothing arrives:
      // public trades only print when someone crosses the book. The helper logs a warning so the skip stays visible.
      if (message) {
        expect(message).toMatchObject({
          e: 'trade',
          E: expect.any(Number),
          s: SYMBOL,
          p: expect.any(String),
          q: expect.any(String),
          t: expect.any(Number),
          T: expect.any(Number),
          m: expect.any(Boolean)
        });
      }
    }, WS_TEST_TIMEOUT_MS);
  });
});
