import { createClient, waitForStreamMessage, WS_TEST_TIMEOUT_MS } from '../../setup';
import { SubscriptionType } from '../../../../src/websocket/streams.api';

const SYMBOL = 'SOL_USDC_PERP';

describe('Liquidation Stream Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Subscribe to liquidation', () => {
    // The documented stream name is `liquidation.<symbol>`; subscribing without
    // the symbol would silently receive nothing.
    it('Sends the documented per-symbol stream name and receives liquidations', async () => {
      const { sent, message, errors } = await waitForStreamMessage(
        bpxClient,
        `liquidation.${SYMBOL}`,
        () => bpxClient.streams.liquidation(SubscriptionType.SUBSCRIBE, SYMBOL)
      );

      expect(sent).toContainEqual({
        method: SubscriptionType.SUBSCRIBE,
        params: [`liquidation.${SYMBOL}`]
      });

      // No error frame means the subscription was accepted — for private
      // streams this is what proves the request actually authenticated
      // (the server replies 4003 "Invalid signature" otherwise).
      expect(errors).toEqual([]);

      // Liquidations are rare, so a message is not expected on every run.
      // Payload assertions below are skipped when nothing arrives:
      // liquidations are rare. The helper logs a warning so the skip stays visible.
      if (message) {
        expect(message).toMatchObject({
          e: 'liquidation',
          E: expect.any(Number),
          s: SYMBOL,
          q: expect.any(String),
          p: expect.any(String),
          S: expect.any(String),
          T: expect.any(Number)
        });
      }
    }, WS_TEST_TIMEOUT_MS);
  });
});
